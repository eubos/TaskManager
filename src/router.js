import Vue from 'vue'
import Router from 'vue-router'
import Task from './components/Task'
import TaskList from './components/TaskList'
import CreateNewTask from './components/CreateNewTask'
import Login from './components/Login'
import EditTask from './components/EditTask'
import Registration from './components/Registration'
import Settings from './components/Settings'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/task/:id',
      props: true,
      name: 'task',
      component: Task,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'taskList',
      component: TaskList,
      beforeEnter: AuthGuard
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: AuthGuard
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/createNewTask',
      name: 'createNewTask',
      component: CreateNewTask,
      beforeEnter: AuthGuard
    },
    {
      path: '/editTask/:id',
      props: true,
      name: 'editTask',
      component: EditTask,
      beforeEnter: AuthGuard
    }
  ]
})
