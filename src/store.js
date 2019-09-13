import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    authToken: '',
    isLogged: false,
    user: '',
    tasks: '',
    meta: '',
    loading: false,
    sortBy: 'title',
    sortOrder: 'asc',
  },
  mutations: {
    setAuthToken (state, payload){
      state.authToken = payload;
    },
    setLogin (state, payload){
      state.isLogged = payload;
    },
    setUser (state, payload){
      state.user = payload;
    },
    setTasks (state, payload){
      state.tasks = payload;
    },
    setMeta (state, payload){
      state.meta = payload;
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setSortBy (state, payload) {
      state.sortBy = payload
    },
    setSortOrder (state, payload) {
      state.sortOrder = payload
    }
  },
  actions: {
    setAuthToken ({commit}, payload) {
      commit('setAuthToken', payload);
    },
    setLogin({commit}, payload){
      commit('setLogin', payload);
    },
    setUser({commit}, payload){
      commit('setUser', payload);
    },
    setTasks({commit}, payload){
      commit('setTasks', payload);
    },
    setMeta({commit}, payload){
      commit('setMeta', payload);
    },
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setSortBy ({commit}, payload) {
      commit('setSortBy', payload)
    },
    setSortOrder ({commit}, payload) {
      commit('setSortOrder', payload)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks;
    },
    taskById (state) {
      return taskId => {
        for (var i = 0; i < state.tasks.length; i++) {
          if(state.tasks[i].id == taskId){
            return state.tasks[i];
          }
      }
      }
    },
    isLogged (state) {
      return state.isLogged
    },
    getToken(state) {
      return state.authToken
    },
    getUser(state){
      return state.user
    },
    loading(state){
      return state.loading
    },
    getSortBy(state){
      return state.sortBy
    },
    getSortOrder(state){
      return state.sortOrder
    }
  }
})
