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
      <div
        class="element w-75 h-100 m-auto text-center d-flex align-items-center justify-content-center flex-column"
      >
        <h1 class="mb-3 text-light">Welcome {{ data.name }}!</h1>
        <p class="mb-3 text-light">
          You need to activate your account before you can use your account!<br />An
          email have been sent to <i>{{ data.email }}</i
          >.<br />Please click the link in the email to verify!
        </p>
        <p class="mb-3 text-light">
          Click <a class="mb-3 text-light" href="/"><u>me</u></a> to go home!
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "VerifyEmail",
  components: {},
  data() {
    return {
      data: "",
    };
  },
  created() {
    fetch("/api/getUser").then(async (response) => {
      console.log(response);
      if (response.redirected) window.location = "/login";
      this.data = await response.json();
      console.log(this.data.email);
      if (this.data.verfied) window.location = "/";
    });
  },
  metaInfo() {
    return {
      title: "Verify Account - RomlandTube",
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
