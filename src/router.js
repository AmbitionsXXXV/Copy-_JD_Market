import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'imooc',
      component: Main
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import(/* webpackChunkName: "goodsList" */ './views/GoodsList.vue')
    },
    {
      path: '/goodsDetails',
      name: 'goodsDetails',
      component: () => import(/* webpackChunkName: "goodsDetails" */ './views/GoodsDetails.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import(/* webpackChunkName: "buy" */ './views/Buy.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    }
  ]
});

export default router;
