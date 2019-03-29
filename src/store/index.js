import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import loading from './loading';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    loading
  }
});

export default store;
