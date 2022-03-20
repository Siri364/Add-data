<template>
  <v-app id="app">
    <div id="nav">
      <v-toolbar
        dark
        prominent
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link to="/About" class="nav-item nav-link"
          >Add Data</router-link
        >
        <router-link to="/edit" class="nav-item nav-link"
          >Edit Data</router-link
        >
        <router-link to="/Login" class="nav-item nav-link">Login</router-link>
        <router-link to="/Register" class="nav-item nav-link"
          >Register</router-link
        >

        <v-spacer></v-spacer>

      </v-toolbar>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000102;
}
#nav {
  padding: 0px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #000000;
  padding: auto;
  margin: auto;
}

#nav a.router-link-exact-active {
  color: #0087f5;
  background: rgb(3, 1, 146);
  border-radius: 0.5rem;
}
</style>
