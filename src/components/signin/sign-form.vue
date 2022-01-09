<template>
  <section class="sign-cmp">
    <h1 class="sign-title">{{ signTitle }}</h1>
    <section v-if="type === 'login' && wrongInputs" class="wrong-inputs-wrapper flex">
      <div class="wrong-inputs-icon">
        <ion-icon name="ban-outline"></ion-icon>
      </div>
      <div class="wrong-inputs-text flex">
        Wrong username or password, would you like to
        <router-link to="/signup" class="wrong-inputs-signup-link"> sign up ? </router-link>
      </div>
    </section>

    <form @submit.prevent="sign" class="sign-form">
      <div v-if="type === 'signup'" class="sign-item-wrapper flex column">
        <label>Enter your full name</label>
        <input type="fullname" v-model="user.fullname" />
      </div>
      <div class="sign-item-wrapper flex column">
        <label>Username : </label>
        <input type="text" v-model="user.username" />
      </div>
      <div class="sign-item-wrapper flex column">
        <label for="">Password : </label>
        <input type="password" v-model="user.password" />
      </div>
      <button class="btn btn-blue">{{ btnTxt }}</button>
    </form>

    <section class="another-sign-options">
      <div>
        <span class="sign-option">Try as a</span>
        <router-link to="/boards" class="another-options-links btn btn-underline">guest</router-link>
      </div>
      <div v-if="type === 'login'">
        <span class="sign-option">Don't have an account yet?</span>
        <router-link to="signup" class="another-options-links btn btn-underline">Sign up</router-link>
      </div>
      <div v-else>
        <span class="sign-option">Already have an account?</span>
        <router-link to="login" class="another-options-links btn btn-underline"> <span class="another-options-links">Log in</span></router-link>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'signForm',
  props: {
    type: {
      type: String,
    },
    wrongInputs: {
      type: Boolean,
    },
  },
  created() {
    console.log('type', this.type);
  },
  data() {
    return {
      user: { username: '', password: '', fullname: '' },
    };
  },
  computed: {
    signTitle() {
      return this.type === 'login' ? 'Log in to your account' : 'Sign up new account';
    },
    btnTxt() {
      return this.type === 'login' ? 'Login' : 'Sign up';
    },
  },
  methods: {
    sign() {
      if (this.type === 'signup') {
        this.$emit('sign', this.user);
        return;
      }
      this.$emit('login', this.user);
    },
  },
};
</script>
