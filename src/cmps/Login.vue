<template>
  <section @click="hideLogin" class="backdrop">
    <section @click.stop class="login-modal p30 lh24">
      <form class="flex column align-center m0-32-24" @submit.prevent="login">
        <h1>Sign In to Wiserr</h1>
        <input type="text" placeholder="username" v-model="userCred.username" />
        <input type="text" placeholder="password" v-model="userCred.password" />
        <button class="btn-login-form">Login</button>
        <span>Don't have an account yet?</span>
        <span @click="openSignupModal" class="signup-link">Open an account</span>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userCred: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    openSignupModal() {
        this.hideLogin()
        this.$emit('openSignup')
    },
    hideLogin() {
      this.$emit('hideLogin')
    },
    login() {
      let userCred = this.userCred
      this.$emit('login', userCred)
    },
  },
}
</script>
