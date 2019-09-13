<template>
<div>
<v-container v-if="!loading && $store.state.tasks.length" fluid>
    <v-row alignment="center" justify="center">
        <v-col cols="12" sm="8">
             <v-row class="pl-2 pr-2" align="center">
                                <v-col class="sort caption" lg="4" @click="sort('title')">
                                    <v-icon>mdi-arrow-up-down</v-icon> Sort by title 
                                </v-col>
                                <v-col class="sort caption" lg="3" @click="sort('priority')">
                                    <v-icon>mdi-arrow-up-down</v-icon> Sort by priority
                                </v-col>
                                <v-col class="sort caption" lg="3" @click="sort('dueBy')">
                                    <v-icon>mdi-arrow-up-down</v-icon> Sort by date
                                </v-col>
            </v-row>
            <Container @drop="onDrop">            
                <Draggable v-for="task in $store.state.tasks" :key="task.id">
                        <v-card class="mx-auto ma-1">
                              <v-row class="pl-2 pr-2" align="center">
                                <v-col lg="4">
                                    Title
                                    <p class="headline font-weight-light"> 
                                    {{task.title}}
                                    </p>
                                </v-col>
                                <v-col lg="3">
                                    Priority
                                    <p class="headline font-weight-light">
                                        <v-icon v-if="task.priority == 'High'" color="red">mdi-arrow-top-left-thick</v-icon>
                                        <v-icon v-if="task.priority == 'Normal'" color="yellow">mdi-arrow-top-left-thick</v-icon>
                                        <v-icon v-if="task.priority == 'Low'" color="green">mdi-arrow-top-left-thick</v-icon>
                                    {{task.priority}}
                                    </p>
                                </v-col>
                                <v-col lg="3">
                                    Date
                                    <p class="headline font-weight-light">
                                    {{getDate(task)}}
                                    </p>
                                </v-col>
                                <v-col lg="2">
                                    <p class="headline font-weight-light">
                                     <v-btn
                                text
                                color="primary"
                                :to="'/task/' + task.id"
                                class="mt-3"
                                >Open</v-btn>
                                    </p>
                                </v-col>
                              </v-row>
                        </v-card>
                </Draggable>
            </Container>
        </v-col>
    </v-row>
    <div class="text-center">
    <v-pagination v-if="totalPages > 1"
      v-model="currentPage"
      :length="totalPages"
      @input="changePage"
    ></v-pagination>
    </div>
</v-container>
<v-container v-else-if="!loading && !$store.state.tasks.length" fluid>
     <v-row alignment="center" justify="center" align="center">
        <v-col cols="12" sm="7" class="display-3">
            You don't have any tasks yet...
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
import { Container, Draggable } from "vue-smooth-dnd"
import { applyDrag, convertUnixTimestampToTime } from "../utils/helpers"
import { $get, $post } from '../utils/requests'

export default {
    data(){
        return{
            sortBy: 'title',
            sortOrder: 'asc',
            currentPage: 1,
            totalPages: 1
        }
    },
    components: {
            Container,
            Draggable,
    },

    methods: {
        init(){
            this.$store.dispatch('setLoading', true);
            const header = {
            'Authorization': 'Bearer ' + this.getToken
            }
            $get(`http://testapi.doitserver.in.ua/api/tasks?page=${this.currentPage}&sort=${this.sortBy}%20${this.sortOrder}`, header).then(response => {
                let resp = JSON.parse(response);
                this.$store.dispatch('setTasks', resp.tasks);
                this.$store.dispatch('setMeta', resp.meta)
                .then(()=>{
                    let totalPages = Math.ceil(resp.meta.count / resp.meta.limit);
                    this.totalPages = +totalPages;
                    this.$store.dispatch('setLoading', false);
                })
            })
            .catch(e => console.log(e))

        },
        onDrop(dropResult) {
            this.$store.state.tasks = applyDrag(this.$store.state.tasks, dropResult)
        },
        getDate(task){
            return convertUnixTimestampToTime(task.dueBy)
        },
        sort(sortBy){
            this.sortBy = sortBy;
            this.sortOrder === 'asc' ? this.sortOrder = 'desc' : this.sortOrder = 'asc';
            this.init();
        },
        changePage(){
            this.init();
        }
    },
    computed: {
      getToken (){
        return this.$store.getters.getToken
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created(){
        this.init()
    }
}
</script>
<style scoped>
.sort{
    cursor: pointer;
}
</style>