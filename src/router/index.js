import Vue from 'vue';
import Router from 'vue-router';
import GoodsRouter from './goods';
import AccountRouter from './account';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '小码王',
      component: () => import(/* webpackChunkName: 'Index' */'@/views/Index')
    },
    {
      path: '/login',
      name: '登陆',
      component: () => import(/* webpackChunkName: 'Login' */'@/views/Login')
    },
    ...GoodsRouter,
    ...AccountRouter
  ]
});
