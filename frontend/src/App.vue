<template>
  <Navbar />
  <TrangChu />
  <Footer />
</template>

<script>
import TrangChu from './components/TrangChu.vue';
import Navbar from './components/Nav.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    TrangChu,
    Navbar,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
