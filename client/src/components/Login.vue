<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
            label="Email"
            v-model="email"
        ></v-text-field>
        <v-text-field
            label="Password"
            type="password"
            v-model="password"
        ></v-text-field>
        <v-alert
            outline
            color="error"
            :value="error"
            transition="slide-y-reverse-transition">
          {{ error }}
        </v-alert>
        <v-btn class="cyan" dark @click="loginUser">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async loginUser () {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'songs'
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
</script>

<style scoped>
    .error {
        color: red;
        font-size: 12px;
        margin-bottom: 10px;
    }
</style>
