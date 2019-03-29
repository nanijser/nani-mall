import auth from '@/utils/auth';
import * as types from './mutations_types';

let userinfo = auth.getUser() || {};
let state = { userinfo: userinfo };

const mutations = {
  [types.UPDATE_USERINFO](state, payload) {
    state.userinfo = payload.userinfo;
    auth.setUser(state.userinfo);
  },
  [types.REMOVE_USERINFO](state) {
    auth.setUser('');
    state.userinfo = {};
  }
};

const actions = {
  updateUserinfo ({ state, commit }, userinfo) {
    commit(types.UPDATE_USERINFO, {
      userinfo
    })
  },
  removeUserinfo({ state, commit }, userinfo) {
    commit(types.REMOVE_USERINFO)
  }
};

const getters = {
  getUserinfo(state) {
    return state.userinfo;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
