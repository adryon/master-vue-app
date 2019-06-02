import Vue from 'vue'
import App from './App.vue';
import Axios from 'axios';
import router from './router';
import store from './store';

import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyDCk5ieuOM8utCxZ-uJ7gXGQ0STLUXYazk",
	authDomain: "master-app-b42ec.firebaseapp.com",
	databaseURL: "https://master-app-b42ec.firebaseio.com",
	projectId: "master-app-b42ec",
	storageBucket: "master-app-b42ec.appspot.com",
	messagingSenderId: "786912433403",
	appId: "1:786912433403:web:613faa298e70cf00"
};
firebase.initializeApp(firebaseConfig);

Vue.$http = Axios;
Vue.router = router;
function renderVue() {
  Object.defineProperty(Vue.prototype, '$http', {
    get() {
      return Axios;
    },
  });
  new Vue({
    render: h => h(App),
    store,
    router,
  }).$mount('#app');
}

renderVue();
