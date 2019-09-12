<template>
 <div>
 <v-container  fluid>
    <v-row alignment="center" justify="center">
        <v-col cols="12" sm="8" class="mb-1">
            <Container @drop="onDrop">            
                <Draggable v-for="task in $store.state.tasks" :key="task.id">
                        <v-card class="mx-auto ma-1">
                              <v-row class="pl-2 pr-2">
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
                                >Open</v-btn>
                                    </p>
                                </v-col>
                                
                              </v-row>
                        <!-- <v-card
                        >
                            <v-row>
                            <v-card-text>
                            <div>{{getDate(task)}}</div>
                            <div>{{task.priority}}</div>
                            
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                text
                                color="primary"
                                :to="'/task/' + task.id"
                                >Open</v-btn>
                            </v-card-actions>
                            </v-row> -->
                        </v-card>
                        
                    </Draggable>
                </Container>
</v-col>
                </v-row>


                    <!-- <v-col cols="12" sm="10" class="mb-1">
                        <v-card class="mx-auto">
                              <v-row>
                                <v-col lg="4">
                                
                                </v-col>
                              </v-row>
                            </v-card>
                    </v-col>
                </v-row> -->
            </v-container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, convertUnixTimestampToTime } from "../utils/helpers";
import Task from './Task';
import store from '../store';

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
            Task
    },

    methods: {
        onDrop(dropResult) {
            store.state.tasks = applyDrag(store.state.tasks, dropResult);
        },
        getDate(task){
            return convertUnixTimestampToTime(task.dueBy)
        }
    }
}
</script>
<style scoped>

</style>