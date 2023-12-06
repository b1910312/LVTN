
<script setup >
import { useTheme } from 'vuetify'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'

// Components
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavBar from './NavBar.vue'
import axios from 'axios'

</script>

<script>
export default {
  name: "hello",

  created() {
    this.getNV()
    this.CountGH()
    // Create the interval

    this.interval = setInterval(() => {
      // Call the API
      if (this.nvv.TKKH_TrangThai == 1) {
        axios.get(`http://localhost:3000/api/giohang/GetByKH/` + this.nvv.TKKH_MaKH).then(res => {
          this.MaGH = res.data.GH_MaGH
        
        })
        axios.get('http://localhost:3000/api/chitietgiohang/getbyMaGH/' + this.MaGH).then((response) => {
          // Update the value of the variable
          this.count = response.data
          // console.log(this.count)
        })


      }
      else {
        this.count = 0
      }
      axios.get('http://localhost:3000/api/khachhang/' + this.nvv.TKKH_MaKH).then((response) => {
        // Update the value of the variable
        this.KH = response.data
        var khachHang = JSON.parse(localStorage.getItem('khachhang'));
        khachHang.TKKH_TrangThai = this.KH.TKKH_TrangThai
        localStorage.setItem('khachhang', JSON.stringify(khachHang));
        this.getNV()
      })

    }, 1000)



  },

  // beforeRouteLeave(to, from, next) {
  //   // Clear the interval before leaving the page
  //   clearInterval(this.interval)
  //   next()
  // },

  methods: {
    getNV() {
      if (JSON.parse(localStorage.getItem("khachhang")) != null) {
        this.nvv = JSON.parse(localStorage.getItem("khachhang"))
      }
      console.log(this.nvv);
    },
    CountGH() {
      axios.get(`http://localhost:3000/api/giohang/GetByKH/` + this.nvv.TKKH_MaKH).then(res => {
        this.MaGH = res.data.GH_MaGH
        console.log("Mã giỏ hàng")
        console.log(this.MaGH)
      })
      axios.get(`http://localhost:3000/api/chitietgiohang/getbyMaKH/` + this.MaGH).then(res => {
        this.count = res.data
        console.log("newid")
        console.log(this.count.length)
      })
    },
  },
  data() {
    return {
      nvv: "",
      count: 0,
      KH: [],
      MaGH: ""
    }
  }
}
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!--         
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        >
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span>
        </div> -->



        <!-- <IconBtn
          class="me-2"
          href="https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="bxl-github" />
        </IconBtn>

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn> -->
        <NavBar class=""></NavBar>
        <!-- <NavbarThemeSwitcher class="me-2" /> -->
        <v-button v-if="nvv.TKKH_TrangThai !== '' && nvv.TKKH_TrangThai == 1" class="p-2"
          @click="this.$router.push(`/giohang`)">

          <v-badge ref="badgeRef" color="error" class="mb-5" :content="count.length" inline>
            <h5 class="mt-5">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
            </h5>
          </v-badge>
        </v-button>
        <UserProfile />
      </div>
    </template>


    <!-- <template #after-vertical-nav-items> -->
    <!-- 👉 illustration -->
    <!-- <a
        href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template"
        target="_blank"
        rel="noopener noreferrer"
        style="margin-left: 7px;"
      >
        <img
          :src="upgradeBanner"
          alt="upgrade-banner"
          transition="scale-transition"
          class="upgrade-banner mx-auto"
          style="max-width: 230px;"
        >
      </a>
    </template> -->

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->

  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
