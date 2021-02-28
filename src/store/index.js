import Vue from 'vue'
import Vuex from 'vuex'
import feeds from '@/store/modules/feeds/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: []
  },
  getters: {
    loading (state) {
      return state.length !== 0
    }
  },
  mutations: {
    ADD_LOADING (state, payload) {
      state.loading.push(payload)
    },
    REMOVE_LOADING (state, payload) {
      state.loading.splice(state.loading.indexOf(payload), 1)
    }
  },
  actions: {
    addLoading ({ commit }, payload) {
      commit('ADD_LOADING', payload)
    },
    removeLoading ({ commit }, payload) {
      commit('REMOVE_LOADING', payload)
    }
  },
  modules: {
    feeds: feeds
  }
})
