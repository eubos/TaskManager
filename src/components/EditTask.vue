<template>
   <div>
        <v-form>
            <v-container fluid>
                <v-row
                alignment="center"
                justify="center">
                    <v-col cols="12" sm="7" class="mb-1">
                       <v-btn text :to="'/task/' + id"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
                            <h1 class="font-weight-light">Edit task</h1> 
                            <v-card class="mx-auto">
                            <v-card-text>
                            <v-text-field
                                v-model="title"
                                value= title
                                label="Title"
                                :error-messages="titleErrors"
                                required
                                @blur="$v.title.$touch()"
                            ></v-text-field>
                            <v-row>
                                <v-col lg="6">
                                    <h3>Priority</h3>
                                    <v-radio-group 
                                    v-model="priority" 
                                    row 
                                    :error-messages="priorityErrors"
                                    required
                                    @blur="$v.priority.$touch()">
                                    <v-radio
                                        label="High"
                                        color="red"
                                        value="High"
                                    ></v-radio>
                                    <v-radio
                                        label="Normal"
                                        color="orange"
                                        value="Normal"
                                    ></v-radio>
                                    <v-radio
                                        label="Low"
                                        color="green"
                                        value="Low"
                                    ></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col lg="6">
                                    <h3 class="mb-3">Date</h3>
                                    <date-picker v-model="dateTime"
                                    lang="ru"
                                    type="datetime"
                                    format="DD.MM.YYYY HH:mm:ss"
                                    :first-day-of-week="1"
                                    placeholder="Set Date"
                                    :minute-step="5"
                                    confirm
                                    req
                                    :error-messages="dateTimeErrors"
                                    required
                                    @blur="$v.dateTime.$touch()"
                                    >
                                    </date-picker>
                                </v-col>
                            </v-row>
                            <v-btn class="mr-4 primary" @click="submit">save</v-btn>
                            {{response}}
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
import { convertUnixTimestampToTime, convertTimeToUnixTimestamp } from "../utils/helpers"
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { $put, $get } from '../utils/requests'
import Moment from 'moment'

export default {
    props: ['id'],
    components: { DatePicker },
    data(){
        return{
            title: '',
            priority: '',
            dateTime: '',
            response: ''
        }
    },
     validations: {
      title: { required, minLength: minLength(3) },
      priority: { required },
      dateTime: { required }
    },
    computed :{
      getToken (){
        return this.$store.getters.getToken
        },
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.minLength && errors.push('Title must be at most 3 characters long')
        !this.$v.title.required && errors.push('Title is required')
        return errors
        },
      priorityErrors () {
        const errors = []
        if (!this.$v.priority.$dirty) return errors
        !this.$v.priority.required && errors.push('Priority is required')
        return errors
        },
      dateTimeErrors () {
        const errors = []
        if (!this.$v.dateTime.$dirty) return errors
        !this.$v.dateTime.required && errors.push('Date is required')
        return errors
        }
    },
    methods: {
      submit(){
        this.$v.$touch();
        if (this.$v.$invalid) {
        this.response = 'All fields are required'
        } else {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken
            }
        const body = {
            "title": this.title,
            "dueBy": convertTimeToUnixTimestamp(this.dateTime),
            "priority": this.priority
        }
        $put('http://testapi.doitserver.in.ua/api/tasks/' + this.id, header, body)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                this.response = 'Task updated';
                return res;
            } 
            else if (res.status === 422) {
                this.response = 'Something went wrong';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
            else if (res.status === 403) {
                this.response = 'Something went wrong';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
            else {
                this.response = 'Something went wrong';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
        })
        .then(() => {
            setTimeout(() => {
                this.$router.push('/task/' + this.id)
            }, 2000)
        })
        .catch((e) => {
            console.log('Error: ' + e.message);
            console.log(e.response);
        });
      }
        }
    },
    mounted(){
      const header = {
            'Authorization': 'Bearer ' + this.getToken
            }
            $get('http://testapi.doitserver.in.ua/api/tasks/' + this.id, header).then(response => {
                let resp = JSON.parse(response);
                this.title = resp.task.title;
                this.priority = resp.task.priority;
                this.dateTime = new Moment.unix(resp.task.dueBy).format();
            })
            .catch(e => console.log(e))
    }
}
</script>