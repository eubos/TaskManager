<template>
    <div>
       <v-container  fluid>
                <v-row v-if="task.title != undefined"
                alignment="center"
                justify="center">
                    <v-col cols="12" sm="10" class="mb-1">
                       <v-btn text :to="'/'"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
                      <h2 :to="'/'" class="font-weight-light mb-5"></h2>
                      

                        <h1 class="font-weight-light">Task details</h1> 
                            <v-card class="mx-auto">
                              <v-row>
                                <v-col lg="4">
                                  <v-card-title>Title</v-card-title>
                                  <v-card-text>
                                    <h3>{{task.title}}</h3>
                                  </v-card-text>
                                </v-col>
                                <v-col lg="3">
                                  <v-card-title>Priority</v-card-title>
                                  <v-card-text>
                                    <h3>
                                      <v-icon v-if="task.priority == 'High'" color="red">mdi-arrow-top-left-thick</v-icon>
                                      <v-icon v-if="task.priority == 'Normal'" color="yellow">mdi-arrow-top-left-thick</v-icon>
                                      <v-icon v-if="task.priority == 'Low'" color="green">mdi-arrow-top-left-thick</v-icon>
                                      {{task.priority}}
                                    </h3>
                                  </v-card-text>
                                </v-col>
                                <v-col lg="3">
                                  <v-card-title>Date</v-card-title>
                                  <v-card-text>
                                    <h3>{{getDate(task.dueBy)}}</h3>
                                  </v-card-text>
                                </v-col>
                                <v-col lg="2">
                                  <v-card-title>Actions</v-card-title>
                                  <v-card-text>
                                    <v-btn text icon :to="'/createNewTask'"><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                    <v-btn text icon @click="deleteTask" color="red"><v-icon>mdi-delete</v-icon></v-btn>
                                  
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-card>
                    </v-col>
                </v-row>
            </v-container>
</div>
</template>

<script>
import Moment from 'moment'
import { convertUnixTimestampToTime } from "../utils/helpers"
export default {
    props: ['id'],
    computed :{
        task () {
        const id = this.id
        return this.$store.getters.taskById(id)
      },
    },
    methods:{
      getDate(task){
          return convertUnixTimestampToTime(task)
        },
      deleteTask(){
        
      }
    }
}
</script>

<style scoped>
    
</style>