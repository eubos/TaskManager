<template>
    <div>
        <v-form>
            <v-container  v-if="!loading" fluid>
                <v-btn text :to="'/login'"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
                <v-row
                alignment="center"
                justify="center">
                
                    <v-col cols="12" sm="4">
                        <h1 class="font-weight-light">Registration</h1> 
                        <v-card class="mx-auto">
                            <v-card-text>
                            <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="E-mail"
                                required
                                @blur="$v.email.$touch()"
                                @keydown.enter="submit"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                :error-messages="passwordErrors"
                                label="Password"
                                type="Password"
                                required
                                @blur="$v.password.$touch()"
                                @keydown.enter="submit"
                            ></v-text-field>
                            <v-text-field
                                v-model="confirmPassword"
                                :error-messages="confirmPasswordErrors"
                                label="Confirm password"
                                type="Password"
                                required
                                @blur="$v.confirmPassword.$touch()"
                                @keydown.enter="submit"
                            ></v-text-field>                            
                            <v-btn class="mr-4 primary" @click="submit">registration</v-btn>
                            <span  v-if="response" class="font-weight-light">{{response}}</span> 
                            </v-card-text>
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
        </v-form>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'
import { $post } from '../utils/requests'

export default {
    mixins: [validationMixin],
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            response: ''
        }
    },
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: { sameAsPassword: sameAs('password') }
    },
     methods:{
        submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
        this.response = 'All fields are required'
        } else {
        this.$store.dispatch('setLoading', true);
        const header = {
            'Content-Type': 'application/json'
            }
        const body = {
            "email": this.email,
            "password": this.password
        }
        $post('http://testapi.doitserver.in.ua/api/users', header, body)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } 
            else if (res.status === 422) {
                this.$store.dispatch('setLoading', false);
                this.response = 'The email has already been taken';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
            else if (res.status === 403) {
                this.$store.dispatch('setLoading', false);
                this.response = 'Something went wrong. Check your Email or Password';
                let error = new Error(res.statusText);
                error.response = res;
                throw error;
            }
            else {
                this.$store.dispatch('setLoading', false);
                let error = new Error(res.statusText);
                this.response = 'Something went wrong. Check console';
                error.response = res;
                throw error;
            }
        })
        .then(res => res.json())
        .then(data => { 
            if (data.token) {
                this.$store.dispatch('setAuthToken', data.token);
                this.$store.dispatch('setLogin', true);
                this.$store.dispatch('setUser', this.email)
                .then(() => {
                this.$store.dispatch('setLoading', false);                
                this.$router.push('/')
                })
                this.response = 'New user created';
            }
        })
        .catch((e) => {
            console.log('Error: ' + e.message);
            console.log(e.response);
            this.response = 'Error: ' + e.message;
            this.$store.dispatch('setLoading', false);
        });
      }
      },    
     },
     computed:{
        emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
        },
        passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at most 6 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
        confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.sameAsPassword && errors.push('Password should match')
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