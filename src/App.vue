<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title
      class="headline text-uppercase"
      >
      <v-btn text :to="'/'">TASK<span class="font-weight-light">MANAGER</span></v-btn>
      </v-toolbar-title>
      <span class="pl-5" id="helloUser" v-if="getUser"><span class="font-weight-light">Hello </span>{{getUser}}</span>
      <v-spacer></v-spacer>
      <router-link to="settings" tag="span" class="pointer">
      <v-btn text icon v-if="isLogged" :to="'/settings'" class="mr-1"><v-icon>mdi-settings</v-icon></v-btn>
       </router-link>
      <v-btn text icon v-if="isLogged" :to="'/createNewTask'" id="forD" class="mr-1 ml-1" color="primary"><v-icon>mdi-plus-circle</v-icon></v-btn>
      <v-btn v-if="isLogged" :to="'/createNewTask'" id="forT" class="mr-1 ml-1" color="primary">Add Task</v-btn>
       <router-link to="/" tag="span" class="pointer">
      <v-btn text icon v-if="isLogged" class="ml-1" @click="logOut"><v-icon>mdi-logout</v-icon></v-btn>
       </router-link>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TaskList from './components/TaskList'
import CreateNewTask from './components/CreateNewTask'
import store from './store'

export default {
  name: 'App',
  components: {
    TaskList,
    CreateNewTask
  },
  methods :{
            
        logOut(){
          this.$store.dispatch('setAuthToken', '');
          this.$store.dispatch('setLogin', false);
          this.$store.dispatch('setUser', '')
          .then(() => {
                this.$router.push('/login')
                })
                .catch(() => {});
        }
  },
  computed: {
      isLogged () {
        return this.$store.getters.isLogged
      },
      getUser(){
        return this.$store.getters.getUser
      }
  }
};
</script>
<style scoped>
@media screen and (min-width: 600px) {
    #helloUser {
      display: inline;
    }
    #forD {
      display: none;
    }
    #forT {
      display: inline-flex;
    }
}
@media screen and (max-width: 992px) {
    #helloUser {
      display: none;
    }
    #forD {
      display: inline-flex;
    }
    #forT {
      display: none;
    }
}
</style>