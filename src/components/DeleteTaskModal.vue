<template>
    <v-dialog v-model="modal" style="width:40%">
        <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on" color="red"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
        <v-card class="justify-center">
            <v-container v-if="!response">
                        <v-card-title>
                                Do you want to delete the task?
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="onCancel">No</v-btn>
                            <v-btn class="primary" @click="deleteTask">Yes</v-btn>
                        </v-card-actions>
            </v-container>
            <v-container v-else>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                                {{response}}
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import {$delete} from '../utils/requests'

export default {
    props: ['task'],
    data(){
        return{
            modal: false,
            response: ''
        }
    },
    methods:{
        deleteTask(){
            const header = {
                'Authorization': 'Bearer ' + this.getToken
                }
                $delete('http://testapi.doitserver.in.ua/api/tasks/' + this.task.id, header)
                .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    this.response = 'The task is successfully deleted';
                    return res;
                } 
                else if (res.status === 404) {
                    this.response = 'The task does not exist';
                    let error = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }
                else {
                    let error = new Error(res.statusText);
                    this.response = 'Some error happened';
                    error.response = res;
                    throw error;
                }
            })
            .then(() => { 
                setTimeout(() => {
                this.$router.push('/')
                }, 2000);
            })
            .catch((e) => {
                console.log('Error: ' + e.message);
                console.log(e.response);
            });
        },
        onCancel(){
            this.modal = false
        }
    },
    computed: {
        getToken (){
            return this.$store.getters.getToken
        }
    }
}
</script>