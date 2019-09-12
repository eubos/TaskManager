import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    shared
  },
  state: {
    authToken: '',
    isLogged: false,
    user: '',
    tasks: '',
    meta: ''
  },
  mutations: {
    setAuthToken (state, payload){
      state.authToken = payload;
      console.log('state.authToken', state.authToken);
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
    }
  }
})
