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
                <div class="error" v-html="error"></div>
                <v-btn class="cyan" dark @click="loginUser">Login</v-btn>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  import Panel from '@/components/Panel'
  export default {
    name: 'Login',
    components: {
      Panel
    },
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
