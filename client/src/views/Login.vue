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
        <h1 class="mb-3 text-light">Login</h1>
        <b-form-input
          id="username"
          class="my-2 text-center x-rounded"
          placeholder="Username"
          v-model="username"
        ></b-form-input>

        <b-form-input
          id="password"
          v-model="password"
          class="my-2 text-center x-rounded"
          placeholder="Password"
          type="password"
        ></b-form-input>
        <p id="errorArea" class="text-danger"><br /></p>
        <p class="mb-0 text-light">
          Don't have an account?
          <a class="text-light" href="/register"><u>Register</u></a>
        </p>
        <p>
          <a class="text-light" href="/forgotpassword"
            ><u>Forgot password?</u></a
          >
        </p>
        <b-button type="submit" class="m-2 w-50 x-rounded" id="loginBtn"
          >Login</b-button
        >
      </b-form>
    </div>
  </main>
</template>

<script>
import checkAuth from "../checkAuth.js";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(event) {
      console.log(this.username, this.password);
      event.preventDefault();
      let request = new XMLHttpRequest();
      //hash the password with salting
      let pass = this.CryptoJS.MD5(this.password + this.username);
      request.open("POST", "/login", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      //sends request to to server
      request.send(`name=${this.username}&password=${pass}`);
      console.log(pass);
      request.onreadystatechange = function() {
        // This is ugly and I want to change it
        let urlToLogin =
          window.location.protocol + "//" + window.location.host + "/login";
        if (request.responseURL == urlToLogin) {
          console.log("error");
          document.getElementById("errorArea").innerText =
            "Username or Password is incorrect";
        } else {
          console.log("success");
          window.location = "/api/login/auth";
        }
      };
    },
  },
  created() {
    checkAuth.notLoggedIn(this.$router);
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
