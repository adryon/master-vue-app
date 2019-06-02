/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import config from './lib/config';
import lockr from 'lockr';
import _ from  'lodash';

lockr.prefix = config.LOCKR_PREFIX;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      data: {
        noProgressTasks: {}
      },
      authenticated: false,
      searchInput: null,
      showSearch: false,
    },
    users: {
      data: null,
    },
  },
  mutations: {
    LOGIN_SUCCESS(state, payload) {
      lockr.set('Authorization', payload.uid);
      state.user.data = payload;
      state.user.noProgressTasks = payload.noProgressTasks;
      state.user.authenticated = true;
    },
    SET_CURRENT_USER(state, payload) {
      state.user.data = payload,
      state.noProgressTasks = payload.noProgressTasks;
      state.user.authenticated= true;
    },
    LOAD_USERS_LIST(state, payload) {
      state.users.data = payload;
    },
    LOGOUT_SUCCESS(state) {
      lockr.rm('Authorization');
      state.user.data = {id: '', email: '', firstName: '', lastName: '', uid: ''};
      state.user.authenticated = false;
    },
    UPDATE_SEARCH_INPUT(state, payload) {
      state.user.searchInput = payload;
      state.user.showSearch = true;
    },
    DISMISS_SEARCH_INPUT(state) {
      state.user.searchInput = null;
      state.user.showSearch = false;
    }
  },
  actions: {
    register(context, payload) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(result => {
          firebase.database().ref(`users/${result.user.uid}`).set({
            name: payload.name,
            email: payload.email,
          });
          alert('Account created!');
          resolve(true);
        })
        .catch(error => {
          alert('Register failed!');
          reject(false);
        });
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(result => {
          context.commit('LOGIN_SUCCESS', result.user)
          resolve(true);
        })
        .catch(error => {
          alert('Login failed!');
          reject(false);
        });
      })
    },
    logOut(context) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
          dispatch(logOutSuccess());
          context.commit('LOGOUT_SUCCESS');
          resolve(true);
        })
        .catch(error => {
          resolve(false);
        });
      })
    },
    initAuth(context) {

      function turnToArray(items, userData) {
        let results = [];

        const {searchInput, showSearch} = userData;
        _.keys(items).map(item => {
          items[item].uid = item;
          if (showSearch === true) {
            if (items[item].title.toLowerCase().includes(searchInput)) {
              results.push(items[item])
            }
          } else {
            results.push(items[item])
          }
        });
        return results;
      };

      if(lockr.get('Authorization')) {
        firebase.auth().onAuthStateChanged(user => {
          firebase.database().ref('/users/' + user.uid).on('value', snapshot => {
            const userData = Object.assign({}, snapshot.val(), {uid: user.uid})

            userData.noProgressTasks = turnToArray(userData.noProgressTasks, userData);
            userData.inProgressTasks = turnToArray(userData.inProgressTasks, userData);
            userData.completedTasks = turnToArray(userData.completedTasks, userData);

            context.commit('SET_CURRENT_USER', userData);
          });

          firebase.database().ref(`/users`).on('value', snapshot => {
            let result = snapshot.val();
            _.keys(result).map(item => {
              result[item].uid = item;
            });
            context.commit('LOAD_USERS_LIST', _.toArray(result))
          })
        });
        return Promise.resolve(true);
      } else {
        return Promise.reject();
      }
    },
    newTask(context, payload, uid) {
      return new Promise((resolve, reject) => {
        firebase.database().ref(`users/${payload.uid}/noProgressTasks`).push(payload.task);
        alert('Task created!');
        resolve(true);
      })
    },
    editTask(context, payload) {
      return new Promise((resolve, reject) => {
        firebase.database().ref(`users/${payload.userUID}/${payload.category}/${payload.taskUID}`).update(payload.task);
        alert('Task edited!');
        resolve(true);
      })
    },
    moveTask(context, payload) {
      firebase.database().ref(`users/${payload.userUID}/${payload.from}/${payload.task.uid}`).remove();
      delete payload.task.uid;
      firebase.database().ref(`users/${payload.userUID}/${payload.where}`).push(payload.task);
    },

    deleteTask(context, payload) {
      firebase.database().ref(`users/${payload.userUID}/${payload.category}/${payload.taskUID}`).remove();
      alert('Task deleted!');
    },
    updateSearchInput(context, searchInput) {
      context.commit('UPDATE_SEARCH_INPUT', searchInput);
    },
    dismissSearchInput(context) {
      context.commit('DISMISS_SEARCH_INPUT');
    }
  },
});
