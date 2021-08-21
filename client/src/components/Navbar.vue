<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">RomlandTube</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="data">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ data.name }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="/signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/login" v-else>Log In</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data: () => {
    return {
      data: "",
    };
  },
  created() {
    fetch("/api/getUser")
      .then((response) => response.json())
      .then((json) => {
        this.data = json;
        console.log(this.data);
      });
  },
};
</script>
