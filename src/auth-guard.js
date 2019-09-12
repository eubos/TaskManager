import store from './store'

export default function (to, from, next) {
  if (store.getters.isLogged) {
    next()
  } else {
    next('/login')
  }
}
