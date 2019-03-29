const SHOW_LOADING = 'SHOW_LOADING';
const HIDE_LOADING = 'HIDE_LOADING';

let state = {
  isLoading: false
}

const mutations = {
  [SHOW_LOADING] (state) {
    state.isLoading = true
  },

  [HIDE_LOADING] (state) {
    state.isLoading = false
  }
};

const getters = {};

const actions = {
  show_loading: ({
                   commit
                 }) => {
    return new Promise((resolve, reject) => {
      commit(SHOW_LOADING)
      resolve()
    })
  },

  hide_loading: ({
                   commit
                 }) => {
    return new Promise((resolve, reject) => {
      commit(HIDE_LOADING)
      resolve()
    })
  }
}


export default {
  state,
  mutations,
  getters,
  actions
}
