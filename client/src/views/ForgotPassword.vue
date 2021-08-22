<template>
  <main class="d-flex align-items-center justify-content-center flex-column">
    <a href="/" class="w-25 mx-auto">
      <img src="assets/logo-white_transparent.png" alt="RomlandTube Logo" />
    </a>
    <div class="container col-md-4 col-sm-8 p-3">
      <b-form @submit="onSubmit" class="element w-75 m-auto text-center">
        <h1 class="mb-3 text-light">Forgot Password</h1>
        <p class="text-light">
          Enter the email linked to your account and we will send you a link to
          reset your password.
        </p>
        <b-form-input
          id="email"
          class="my-2 text-center x-rounded"
          placeholder="Email"
          type="email"
          v-model="email"
        ></b-form-input>
        <b-button type="submit" class="m-2 w-50 x-rounded" id="loginBtn"
          >Submit</b-button
        >
      </b-form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onSubmit(event) {
      console.log(this.email);
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
img {
  margin-bottom: 6vh;
  margin-top: -6vh;
}
.x-rounded {
  border-radius: 25px;
}
#loginBtn {
  background-color: rgba(255, 255, 255, 0.1);
}
main {
  height: 100vh;
  background: rgb(196, 26, 70);
  background: linear-gradient(
    336deg,
    rgba(196, 26, 70, 1) 0%,
    rgba(184, 73, 168, 1) 50%,
    rgba(7, 175, 164, 1) 100%
  );
}
.container {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
}
</style>
