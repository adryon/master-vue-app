import Vue from 'vue';
import Router from 'vue-router';
// import Authenticator from './utils/authenticator';

Vue.use(Router);
// const auth = new Authenticator();
const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes: [/*{
      path: '/',
      name: 'home',
      component: () => import('./views/Dashboard.vue'),
    },*/
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'callback') {
    // check if "to"-route is "callback" and allow access
    router.app.returnUrl = to.path;
    next();
    return;
  }

  // let isAuthenticated = false;

  if (to.name !== 'callback') {
    if (from.name === 'callback') {
      sessionStorage.setItem('returnUrl', to.name);
      // isAuthenticated = true;
    } else {
      sessionStorage.setItem('returnUrl', to.path);
    }
  }

  if (
    sessionStorage.getItem('expires_at') &&
    new Date() > new Date(sessionStorage.getItem('expires_at'))
  ) {
    // if authenticated allow access
    next();
  } else {
    next();
  }
});

export default router;
