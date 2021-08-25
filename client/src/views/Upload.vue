<template>
  <main>
    <Navbar />
    <h1>Upload a video</h1>
    <Footer />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import checkAuth from "../checkAuth.js";

export default {
  name: "Profile",
  components: {
    Navbar,
    Footer,
  },
  created() {
    checkAuth.loggedIn(this.$router);
  },
};
</script>

<style></style>
