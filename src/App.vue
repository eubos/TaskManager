<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title
      class="headline text-uppercase"
      >
      <router-link to="/" tag="span" class="pointer">
      <span>TASK</span>
      <span class="font-weight-light">MANAGER</span>
      </router-link>        
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.authToken" :to="'/createNewTask'" color="primary">Add Task</v-btn>
    </v-app-bar>

    <v-content>
          <v-content>
      <router-view></router-view>
    </v-content>

    </v-content>
  </v-app>
</template>

<script>
import Login from './components/Login'
import TaskList from './components/TaskList'
import CreateNewTask from './components/CreateNewTask'
import { $get, $post } from './utils/requests'
import store from './store';
export default {
  name: 'App',
  components: {
    Login,
    TaskList,
    CreateNewTask
  },

  methods :{
            init(){
            const header = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOm51bGwsImF1ZCI6bnVsbCwiaWF0IjoxNTY4MjExNzE4LCJuYmYiOjE1NjgyMTE3MTgsImV4cCI6MTU2ODI5ODExOCwic3ViIjoyfQ.rAjl4Axt-coUZQITwYVrIq8EhkknjsZavXHOHigEkFw'
            }
            $get('http://testapi.doitserver.in.ua/api/tasks?page=1&sort=title%20asc', header).then(response => {
                let resp = JSON.parse(response);
                this.$store.state.tasks = resp.tasks;
                this.$store.state.meta = resp.meta;
        })
        }
  },
  created(){
      this.init();
  }
};
</script>
