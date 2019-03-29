import Vue from 'vue';
import Vuex from 'vuex';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import auth from '@/utils/auth';
import storage from '@/utils/storage';
import { Row, Col, Button, Cell, CellGroup, Icon, Field } from 'vant';

import {XMButton , XMLabel} from 'xiaomaui'

import VueScroller from 'vue-scroller';
import '../static/vant-css/base.css';//重置样式


Vue.use(VueScroller);
Vue.use(Row).use(Col).use(Button).use(Cell).use(CellGroup).use(Icon).use(Field);

Vue.use(XMButton).use(XMLabel);

Vue.config.productionTip = false;
Vue.config.devtools = true;

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  store.dispatch('show_loading');//页面切换 loading
  if (to.meta.requiresAuth) {
    storage.set("lastpath", from.fullPath);
    if(auth.getUser()){
      next()
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
});

router.afterEach(function (to) {
  store.dispatch('hide_loading');
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
