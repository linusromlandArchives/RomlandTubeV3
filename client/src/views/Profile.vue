<template>
  <main>
    <Navbar />
    <h1>Profile</h1>
    <Footer />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Profile",
  components: {
    Navbar,
    Footer,
  },
  created() {
    fetch("/api/getUser")
      .then((response) => response.json())
      .then((json) => {
        if (!json) window.location = "/#/login";
        if(!json.verfied) window.location = "/#/verifyAccount";
      });
  },
};
</script>

<style></style>
