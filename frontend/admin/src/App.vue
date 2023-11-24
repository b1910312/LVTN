<script setup>
import { useTheme } from 'vuetify'
import UpgradeToPro from '@/components/UpgradeToPro.vue'
import { hexToRgb } from '@layouts/utils'

const { global } = useTheme()

</script>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      NV: [],
    }
  },
  created() {
    this.interval = setInterval(() => {
      const nhanvien = localStorage.getItem('nhanvien')
      const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"))
      axios.get('http://localhost:3000/api/nhanvien/' + nhanvienchitiet.TKNV_MaNV).then((response) => {
        // Update the value of the variable
        this.NV = response.data
        nhanvienchitiet.TKNV_TrangThai = this.NV.TKNV_TrangThai
        localStorage.setItem('nhanvien', JSON.stringify(nhanvienchitiet));
        if (nhanvien == null || nhanvienchitiet.TKNV_VaiTro == "KBVT002" || nhanvienchitiet.TKNV_TrangThai == 2) {
          this.$router.push("/login");
        }
      })

    }, 1000)
  },
}
</script>
<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <!-- <UpgradeToPro /> -->
  </VApp>
</template>
