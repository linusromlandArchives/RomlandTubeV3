<template>
  <main>
    <Navbar />
    <h1>Home</h1>
    <Footer />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style></style>
