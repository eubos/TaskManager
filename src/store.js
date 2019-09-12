import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared
  },
  state: {
    user: null,
    authToken: '',
    tasks: '',
    meta: ''
  },
  mutations: {


  },
  actions: {

  },
  getters: {
    tasks (state) {
      return state.tasks;
    },
    taskById (state) {
      return taskId => {
        for (var i = 0; i < state.tasks.length; i++) {
          if(state.tasks[i].id == taskId){
            return state.tasks[i]
          }
      }
      }
    },
    user (state) {
      return state.user
    },
  }
})
