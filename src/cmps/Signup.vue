<template>
  <section @click="hideSignup" class="backdrop">
    <section @click.stop class="login-modal p30 lh24">
      <form class="flex column align-center m0-32-24" @submit.prevent="signup">
        <h1>Sign Up to Wiserr</h1>
        
      <section class="img-sign-uploader">
        <div class="img-container">
          <img src="../assets/img/profile-default-img.png" />
        </div>
      <label for="imgUpload"></label>
      <input class="upload-file" type="file" accpet="img/" id="imgUpload" />
    </section>
    
        <input
          type="text"
          placeholder="Your Full Name"
          v-model="userCred.fullName"
        />
        <input type="text" placeholder="username" v-model="userCred.userName" />
        <input type="text" placeholder="password" v-model="userCred.password" />
        <button class="btn-signup-form">Sign up</button>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      userCred: {
        fullName: '',
        userName: '',
        password: '',
      },
    }
  },
  methods: {
    hideSignup() {
      this.$emit('hideSignup')
    },
    signup() {
      let userCred = this.userCred
      this.$store.dispatch({ type: 'signup', userCred })
    },
  },
}
</script>
