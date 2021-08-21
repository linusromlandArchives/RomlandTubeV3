<template>
  <main class="d-flex align-items-center justify-content-center flex-column">
    <a href="/" class="w-25 mx-auto">
      <img src="assets/logo-white_transparent.png" alt="RomlandTube Logo" />
    </a>
    <div class="container col-md-4 col-sm-8 p-3">
      <b-form class="element w-75 m-auto text-center">
        <h1 class="mb-3 text-light">Login</h1>
        <b-form-input
          id="username"
          class="my-2 text-center x-rounded"
          placeholder="Username"
        ></b-form-input>

        <b-form-input
          id="password"
          class="my-2 text-center x-rounded"
          placeholder="Password"
          type="password"
        ></b-form-input>
        <p class="mb-0 text-light">
          Don't have an account?
          <a class="text-light" href="/"><u>Register</u></a>
        </p>
        <p>
          <a class="text-light" href="/"><u>Forgot password?</u></a>
        </p>
        <b-button class="m-2 w-50 x-rounded" id="loginBtn">Login</b-button>
      </b-form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  components: {},
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
