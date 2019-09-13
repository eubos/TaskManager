<template>
    <div>
       <v-container v-if="!loading" fluid>
            <v-btn text :to="'/'"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
                <v-row
                alignment="center"
                justify="center">
                    <v-col cols="12" sm="10" class="mb-1">
                        <h1 class="font-weight-light">Task details</h1> 
                            <v-card class="mx-auto">
                              <v-row>
                                <v-col lg="4">
                                  <v-card-title>Title</v-card-title>
                                  <v-card-text>
                                    <h3>{{title}}</h3>
                                  </v-card-text>
                                </v-col>
                                <v-col lg="3">
                                  <v-card-title>Priority</v-card-title>
                                  <v-card-text>
                                    <h3>
                                      <v-icon v-if="priority == 'High'" color="red">mdi-arrow-top-left-thick</v-icon>
                                      <v-icon v-if="priority == 'Normal'" color="yellow">mdi-arrow-top-left-thick</v-icon>
                                      <v-icon v-if="priority == 'Low'" color="green">mdi-arrow-top-left-thick</v-icon>
                                      {{priority}}
                                    </h3>
                                  </v-card-text>
                                </v-col>
                                <v-col lg="3">
                                  <v-card-title>Date</v-card-title>
                                  <v-card-text>
                                    <h3>{{getDate(dateTime)}}</h3>
                                  </v-card-text>
                                </v-col>
                                <v-col lg="2">
                                  <v-card-title>Actions</v-card-title>
                                  <v-card-text>
                                    <v-btn text icon :to="'/editTask/' + task.id"><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                    <delete-task :task = 'task'></delete-task>
                                  </v-card-text>
                                  {{response}}
                              </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
              </v-row>
        </v-container>
        <v-container v-else>
                <v-layout row>
                    <v-flex xs12 class="text-xs-center pt-5">
                    <v-progress-linear :indeterminate="true"></v-progress-linear>
                    </v-flex>
                </v-layout>
            </v-container>
    </div>
</template>

<script>
import Moment from 'moment'
import { convertUnixTimestampToTime } from "../utils/helpers"
import { setTimeout } from 'timers'
import deleteTask from './DeleteTaskModal'
import { $get } from '../utils/requests'


export default {
    props: ['id'],
    components: {
        deleteTask
    },
    data(){
      return{
        title: '',
        priority: '',
        dateTime: '',
        response: ''
      }
    },
    computed :{
      task () {
        return this.$store.getters.taskById(this.id)
      },
      getToken (){
        return this.$store.getters.getToken
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods:{
      getDate(time){
          return convertUnixTimestampToTime(time)
        }
    },
    created(){
      this.$store.dispatch('setLoading', true);
      const header = {
            'Authorization': 'Bearer ' + this.getToken
            }
            $get('http://testapi.doitserver.in.ua/api/tasks/' + this.id, header).then(response => {
                let resp = JSON.parse(response);
                this.title = resp.task.title;
                this.priority = resp.task.priority;
                this.dateTime = resp.task.dueBy;
                this.$store.dispatch('setLoading', false);
            })
            .catch(e => console.log(e))
    },
    mounted(){
       this.$store.dispatch('setLoading', false);
    }
}
</script>
