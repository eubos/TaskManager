<template>
   <div>
        <v-form>
            <v-container v-if="!loading" fluid>
                <v-btn text :to="'/'"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
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
                                    @blur="$v.dateTime.$touch()">
                                    </date-picker>
                                </v-col>
                            </v-row>
                            <v-btn class="mr-4 primary" @click="submit">save</v-btn>
                            <strong class="red--text text--lighten-1">{{response}}</strong>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-container v-else>
                <v-layout row>
                    <v-flex xs12 class="text-xs-center pt-5">
                        <v-row
                        alignment="center"
                        justify="center">
                            <v-col cols="12" sm="2" class="mb-1">
                            <h1 class="font-weight-light">{{response}}</h1> 
                            </v-col>
                        </v-row>
                    <v-progress-linear :indeterminate="true"></v-progress-linear>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { $post } from '../utils/requests'
import { convertTimeToUnixTimestamp } from '../utils/helpers'
export default {
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
    methods: {
        submit(){
        this.$v.$touch();
        if (this.$v.$invalid) {
        this.response = 'All fields are required'
        } else {
       this.$store.dispatch('setLoading', true);
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken
            }
        const body = {
            "title": this.title,
            "dueBy": convertTimeToUnixTimestamp(this.dateTime),
            "priority": this.priority
        }
        $post('http://testapi.doitserver.in.ua/api/tasks', header, body)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                this.response = 'Task created';
                return res;
            } 
            else if (res.status === 422) {
                this.$store.dispatch('setLoading', false);
                this.response = 'Something went wrong';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
            else if (res.status === 403) {
                this.$store.dispatch('setLoading', false);
                this.response = 'Something went wrong';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
            else {
                this.$store.dispatch('setLoading', false);
                this.response = 'Something went wrong';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
        })
        .then(() => {
            setTimeout(() => {
                this.$store.dispatch('setLoading', false);
                this.$router.push('/');
            }, 2000)
        })
        .catch((e) => {
            console.log('Error: ' + e.message);
            console.log(e.response);
            this.response = 'Error: ' + e.message;
            this.$store.dispatch('setLoading', false);
        });
      }
    }
    },
    computed: {
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
        },
        loading () {
        return this.$store.getters.loading
        }
    },
    beforeCreate(){
       this.$store.dispatch('setLoading', true);
    },
     mounted(){
       this.$store.dispatch('setLoading', false);
    }
}
</script>
