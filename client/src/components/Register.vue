<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
            <div class="white elevation-2">
                <v-toolbar flat dense class="cyan" dark>
                    <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <div class="pl-4 pr-4 pt-2 pb-2">
                    <v-text-field
                            label="Email"
                            v-model="email"
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            type="password"
                            v-model="password"
                    ></v-text-field>
                    <div class="error" v-html="error"></div>
                    <v-btn class="cyan" dark @click="registerUser">Register</v-btn>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    name: 'Register',
    data () {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async registerUser () {
        try {
          const response = await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.token)
          this.$store.dispatch('setUser', response.user)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
</script>

<style scoped>
    .error {
        font-size: 12px;
        margin-bottom: 10px;
    }
</style>
