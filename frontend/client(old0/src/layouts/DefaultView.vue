<script setup>
import NavBar from '../layouts/NavBar.vue'
import FooterPage from '../layouts/FooterPage.vue'

</script>
<template>
  <NavBar />
  <RouterView />
  <FooterPage />
</template>
<!-- <style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout"; -->
<!-- </style> -->
