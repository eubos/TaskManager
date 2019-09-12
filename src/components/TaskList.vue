<template>
<div>
<v-container  fluid>
    <v-row alignment="center" justify="center">
        <v-col cols="12" sm="8" class="mb-1">
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
            cardsColors:{
                High: "Red",
                Normal: "Yellow",
                Low: "Green"
            }
        }
    },
    components: {
            Container,
            Draggable,
    },

    methods: {
        init(){
            const header = {
            'Authorization': 'Bearer ' + this.getToken
            }
            $get('http://testapi.doitserver.in.ua/api/tasks?page=1&sort=title%20asc', header).then(response => {
                let resp = JSON.parse(response);
                this.$store.dispatch('setTasks', resp.tasks);
                this.$store.dispatch('setMeta', resp.meta);
            })
            .catch(e => console.log(e))

        },
        onDrop(dropResult) {
            this.$store.state.tasks = applyDrag(this.$store.state.tasks, dropResult)
        },
        getDate(task){
            return convertUnixTimestampToTime(task.dueBy)
        }
    },
    computed: {
      getToken (){
        return this.$store.getters.getToken
      }
    },
    created(){
        this.init()
    }
}
</script>
