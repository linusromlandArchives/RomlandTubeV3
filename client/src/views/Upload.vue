<template>
  <main>
    <Navbar />
    <h1>Upload a video</h1>
    <div class="custom-file">
      <input
        type="file"
        class="custom-file-input"
        id="inputGroupFile01"
        aria-describedby="inputGroupFileAddon01"
      />
      <label class="custom-file-label" for="inputGroupFile01"
        >Choose file</label
      >
    </div>
    <Footer />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import checkAuth from "../checkAuth.js";

export default {
  name: "Upload",
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
