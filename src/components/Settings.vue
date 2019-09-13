<template>
   <div>
        <v-form>
            <v-container v-if="!loading" fluid>
                <v-btn text :to="'/'"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
                <v-row alignment="center" justify="center">
                <v-col cols="12" sm="6" class="mb-1">
                <h1 class="font-weight-light">Settings</h1> 
                <v-card class="mx-auto">
                            <v-card-text>
                                <v-card-title>Choose the default sorting option</v-card-title>
                                <v-row alignment="center" justify="center">
                                    <v-col class="d-flex" cols="12" sm="12">
                                    <v-select
                                    v-model="sortValue"
                                    :items="sort"
                                    label="Sort by"
                                    ></v-select>
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="12">
                                    <v-select
                                    v-model="orderValue"
                                    :items="order"
                                    label="Order by"
                                    ></v-select>
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="3">
                                    <v-btn class="ml-4 primary" @click="save">save settings</v-btn>
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="9">
                                    {{response}}
                                    </v-col>
                                </v-row>
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
export default {
    data(){
        return {
           sort: ['Title', 'Priority', 'Date'],
           order: ['asc', 'desc'],
           sortValue: '',
           orderValue: '',
           response: ''
        }
    },
    computed: {
        loading () {
        return this.$store.getters.loading
      },
        getSortBy(){
        return this.$store.getters.getSortBy
      },
        getSortOrder(){
        return this.$store.getters.getSortOrder
      }
    },
    methods: {
        save(){
            if (this.sortValue && this.orderValue) {
            this.$store.dispatch('setSortBy', this.sortValue);
            this.$store.dispatch('setSortOrder', this.orderValue);
            this.response = 'Settings successfully saved'
            } else this.response = 'All fields are required'
        }
    },
    mounted(){
        this.orderValue = this.getSortOrder;
        this.sortValue = this.getSortBy;
    }
}
</script>