<template>
  <main class="d-flex align-items-center justify-content-center flex-column">
    <a href="/" class="col-12 col-sm-6 col-md-3 mx-auto">
      <img src="assets/logo-white_transparent.png" width="100%" alt="RomlandTube Logo" />
    </a>
    <div class="container col-md-4 col-sm-8 p-3">
      <b-form @submit="onSubmit" class="element w-75 m-auto text-center">
        <h1 class="mb-3 text-light">Register</h1>
        <b-form-input
          id="username"
          class="my-2 text-center x-rounded"
          placeholder="Username"
          v-model="username"
        ></b-form-input>

        <b-form-input
          id="email"
          class="my-2 text-center x-rounded"
          placeholder="Email"
          v-model="email"
          type="email"
        ></b-form-input>
        <b-form-input
          id="emailConfirm"
          class="my-2 text-center x-rounded"
          placeholder="Confirm Email"
          v-model="emailConfirm"
          type="email"
        ></b-form-input>

        <b-form-input
          id="password"
          v-model="password"
          class="my-2 text-center x-rounded"
          placeholder="Password"
          type="password"
        ></b-form-input>
        <b-form-input
          id="passwordConfirm"
          v-model="passwordConfirm"
          class="my-2 text-center x-rounded"
          placeholder="Confirm Password"
          type="password"
        ></b-form-input>
        <p id="errorArea" class="text-danger"><br /></p>
        <p class="mb-0 text-light">
          Already have an account?
          <a class="text-light" href="/login"><u>Login</u></a>
        </p>

        <b-button type="submit" class="m-2 w-50 x-rounded" id="loginBtn"
          >Register</b-button
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
      username: "",
      email: "",
      emailConfirm: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let errorBox = document.getElementById("errorArea");
      if (
        this.password == this.passwordConfirm &&
        this.username.length > 0 &&
        this.password.length > 0 &&
        this.email.length > 0 &&
        this.email == this.emailConfirm
      ) {
        this.registerUser(this.username, this.email, this.password);
      } else if (this.username.length == 0) {
        errorBox.innerText = "Please pick a name";
      } else if (this.email.length == 0) {
        errorBox.innerText = "Please pick a email!";
      } else if (this.email != this.emailConfirm) {
        errorBox.innerText = "Email does not match";
      } else if (this.password.length == 0) {
        errorBox.innerText = "Please pick a password";
      } else if (this.password != this.passwordConfirm) {
        errorBox.innerText = "Password does not match";
      } else {
        errorBox.innerText = "Unknown client error";
      }
    },
    registerUser(username, email, password) {
      let errorBox = document.getElementById("errorArea");
      let request = new XMLHttpRequest();
      let name = username;
      //hash the password with salting
      let pass = this.CryptoJS.MD5(password + name);
      request.open("POST", "/api/login/register", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      //sends request to to server
      request.send(`name=${name}&email=${email}&password=${pass}`);
      //on return recives status codes
      request.onreadystatechange = function() {
        console.log(request)
        if (request.status == 409) {
          errorBox.innerText = "Username taken!";
        } else if (request.status == 410) {
          errorBox.innerText = "Email taken!";
        } else if (request.status == 500) {
          errorBox.innerText = "Error occured!";
        } else if (request.status == 201) {
          window.location = "/login";
          return;
        } else {
          errorBox.innerText = "Unknown error";
        }
      };
    },
  },
  created() {
    fetch("/api/getUser")
      .then((response) => response.json())
      .then((json) => {
        if (json.verfied) window.location = "/";
        if(!json.verfied) window.location = "/verifyemail";
      });
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
.col-12, .col-sm-6, .col-md-3 {
  flex: 0 0 0 !important;
}
</style>
