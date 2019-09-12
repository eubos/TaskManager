import Vue from 'vue'
import Router from 'vue-router'
import Task from './components/Task'
import TaskList from './components/TaskList'
import CreateNewTask from './components/CreateNewTask'
import Login from './components/Login'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/task/:id',
      props: true,
      name: 'task',
      component: Task
    },
    {
      path: '/',
      name: 'taskList',
      component: TaskList
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/createNewTask',
      name: 'createNewTask',
      component: CreateNewTask
    }
  ]
})
