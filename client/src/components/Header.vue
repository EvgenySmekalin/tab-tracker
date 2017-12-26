<template>
    <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4">
            TabTracker
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn
                flat
                dark
                :to="{name: 'songs'}">
                Browse
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                flat
                dark
                :to="{name: 'login'}"
                v-if="!$store.state.isUserLoggedIn">
                Login
            </v-btn>
            <v-btn
                flat
                dark
                :to="{name: 'register'}"
                v-if="!$store.state.isUserLoggedIn">
                Sign up
            </v-btn>
            <v-btn
                flat
                dark
                v-if="$store.state.isUserLoggedIn"
                @click="logout">
                Log Out
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>

</style>