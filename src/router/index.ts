import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Callback from '../views/Callback.vue';
import SilentRenew from '../views/SilentRenew.vue';
import store from '../store';
import AuthServices from "@/services/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "bundle-home" */ '../views/Home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "bundle-home" */ '../views/Home.vue')
  },
  {
    path: '/users',
    name: 'Users',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "bundle-users" */ '../views/Users.vue')
  },
  {
    path: '/users/:userId',
    name: 'User Details',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "bundle-users" */ '../views/UserDetails.vue'),
    props: true
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '/silentrenew',
    name: 'silentrenew',
    component: SilentRenew
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (store) {
    const isAuthenticated = store.state.isAuthenticated || false
    if (isAuthenticated) {
      next();
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      AuthServices.authenticate(to.path).then((user) => {
        console.log(`authenticating a protected url:${to.path}`);
        next();
      })
    } else {
      next()
    }
  }
})

export default router

