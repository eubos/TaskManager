<template>
   <div>
        <v-form>
            <v-container  fluid>
                <v-row
                alignment="center"
                justify="center">
                    <v-col cols="12" sm="7" class="mb-1">
                            <h1 class="font-weight-light">Create new task</h1> 
                            <v-card class="mx-auto">
                            <v-card-text>
                            <v-text-field
                                v-model="title"
                                label="Title"
                                required
                            ></v-text-field>
                            <v-row>
                                <v-col lg="6">
                                    <h3>Priority</h3>
                                    <v-radio-group v-model="priority" row required>
                                    <v-radio
                                        label="High"
                                        color="red"
                                        value="High"
                                    ></v-radio>
                                    <v-radio
                                        label="Medium"
                                        color="orange"
                                        value="Medium"
                                    ></v-radio>
                                    <v-radio
                                        label="Low"
                                        color="green"
                                        value="Low"
                                    ></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col lg="6">
                                    <h3 class="mb-3" >Date</h3>
                                    <date-picker v-model="dateTime"
                                    lang="ru"
                                    type="datetime"
                                    format="DD.MM.YYYY HH:mm:ss"
                                    :first-day-of-week="1"
                                    placeholder="Set Date"
                                    :minute-step="5"
                                    confirm
                                    req
                                    required
                                    >
                                    </date-picker>
                                </v-col>
                            </v-row>
                            <v-btn class="mr-4 primary" @click="submit">save</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
    components: { DatePicker },
    data(){
        return{
            title: '',
            description: '',
            priority: '',
            dateTime: ''
        }
    },
    methods: {
        submit(){

        }
    }
}
</script>

<style scoped>
    
</style>