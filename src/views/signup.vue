<template>
  <section class="sign">
    <header class="sign-header">
      <router-link to="/boards">
        <img class="account-logo" src="https://cdn.monday.com/images/logos/monday_logo_short.png" />
      </router-link>
    </header>
    <div class="sign-wrapper">
      <sign-form :type="'signup'" @sign="signup" />
    </div>
  </section>
</template>

<script>
import signForm from '../components/signin/sign-form';
export default {
  name: 'signup',
  methods: {
    async signup(user) {
      try {
        await this.$store.dispatch({ type: 'signup', user });
        this.$router.push('/boards');
      } catch (error) {
        console.log('error', error);
      }
    },
  },
  components: {
    signForm,
  },
};
</script>
