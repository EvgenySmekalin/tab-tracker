<template>
    <div class="register-form">
        <h1>Register</h1>
        <input
                type="email"
                name="email"
                placeholder="email"
                v-model="email"
        ><br>
        <input
                type="password"
                name="password"
                placeholder="password"
                v-model="password"
        ><br>
        <button @click="registerUser">Register</button>
    </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    name: 'Register',
    data () {
      return {
        email: '1234',
        password: ''
      }
    },
    methods: {
      async registerUser () {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      }
    }
  }
</script>

<style scoped>
    .register-form input,
    register-form button {
        margin-bottom: 10px;
    }
</style>
