<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
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
        <v-btn class="cyan" dark @click="registerUser">Register</v-btn>
      </panel>
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
      font-size: 12px;
      margin-bottom: 10px;
  }
</style>
