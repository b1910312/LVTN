<script setup>
import { useTheme } from 'vuetify'
import UpgradeToPro from '@/components/UpgradeToPro.vue'
import { hexToRgb } from '@layouts/utils'

const { global } = useTheme()
</script>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  created() {
    if (!this.loggedInNhanVien) {
      this.$router.push("/login");
    }
  },
}
</script>
<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <!-- <UpgradeToPro /> -->
  </VApp>
</template>
