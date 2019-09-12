<template>
    <div>
        <v-form>
            <v-container  fluid>
                <v-row
                alignment="center"
                justify="center">
                    <v-col cols="12" sm="4">
                        <v-card class="mx-auto">
                            <v-card-text>
                            <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                label="E-mail"
                                required
                                @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                :error-messages="passwordErrors"
                                label="Password"
                                type="Password"
                                required
                                @blur="$v.password.$touch()"
                            ></v-text-field>
                            <v-btn class="mr-4 primary" @click="submit">login</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
      password: { required, minLength: minLength(8) },
      email: { required, email }
    },
    data () {
        return {
            email: '',
            password: ''        
        }
    },
     methods:{
        submit () {
        this.$v.$touch()
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
        !this.$v.password.minLength && errors.push('Password must be at most 8 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
     },
      created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page.')
      }
    }
}
</script>
<style scoped>
    
</style>