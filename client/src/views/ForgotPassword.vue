<template>
  <main class="d-flex align-items-center justify-content-center flex-column">
    <a href="/" class="col-12 col-sm-6 col-md-3 mx-auto">
      <img
        src="assets/logo-white_transparent.png"
        width="100%"
        alt="RomlandTube Logo"
      />
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
        <p class="text-warning" id="infoText"></p>
        <b-button type="submit" class="m-2 w-50 x-rounded" id="loginBtn"
          >Submit</b-button
        >
      </b-form>
    </div>
  </main>
</template>

<script>
import checkAuth from "../checkAuth.js";

export default {
  name: "ForgotPassword",
  components: {},
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let request = new XMLHttpRequest();
      request.open("POST", "/api/login/forgotPassword", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      //sends request to to server
      request.send(`email=${this.email}`);
      //on return recives status codes
      request.onreadystatechange = function() {
        if (request.status == 200) {
          document.getElementById("infoText").innerText =
            "Check your email to reset password!\nLink is valid for 30 minutes";
        }
      };
    },
  },
  created() {
    checkAuth.notLoggedIn(this.$router);
  },
  metaInfo() {
    return {
      title: "Forgot Password - RomlandTube",
    };
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
.col-12,
.col-sm-6,
.col-md-3 {
  flex: 0 0 0 !important;
}
</style>
