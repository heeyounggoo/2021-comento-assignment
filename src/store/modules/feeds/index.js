export default {
  namespaced: true,
  state: {
    params: {
      page: 1,
      ord: 'asc',
      category: [1, 2, 3],
      limit: 10
    },
    category: []
  },
  getters: {},
  mutations: {
    UPDATE_PARAMS (state, payload) {
      state.params = Object.assign({}, state.params, payload)
    },
    UPDATE_CATEGORY (state, payload) {
      state.category = payload
    }
  },
  actions: {
    updateParams: {
      root: true,
      handler ({ commit }, payload) {
        commit('UPDATE_PARAMS', payload)
      }
    },
    updateCategory: {
      root: true,
      handler ({ commit }, payload) {
        commit('UPDATE_CATEGORY', payload)
      }
    }
  }
}
