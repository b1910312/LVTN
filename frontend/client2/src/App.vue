<script setup>
import { useTheme } from 'vuetify'
import UpgradeToPro from '@/components/UpgradeToPro.vue'
import { hexToRgb } from '@layouts/utils'

const { global } = useTheme()
global.dark = false
</script>
<script>

import { mapGetters, mapMutations } from "vuex";
export default {

  // created() {
  //   const nhanvien = localStorage.getItem('nhanvien')
  //   const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"))
  //   if (nhanvien == null || nhanvienchitiet.TKNV_VaiTro == "KBVT002" || nhanvienchitiet.TKNV_TrangThai == 2) {
  //     this.$router.push("/login");
  //   }
  // },
}
</script>
<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <!-- <UpgradeToPro /> -->
  </VApp>
</template>
