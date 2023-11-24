<script setup>
import { useTheme } from 'vuetify'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()

// const upgradeBanner = computed(() => {
//   return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
// })
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
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

        <VSpacer />

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

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Trang chủ',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <!-- <VerticalNavLink
        :item="{
          title: 'Account Settings',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      /> -->
      <VerticalNavLink
        :item="{
          title: 'QL Banner',
          icon: 'bx-book-open',
          to: '/quanlybanner',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Sách',
          icon: 'bx-book-open',
          to: '/quanlysach',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Đơn hàng',
          icon: 'bx-money-withdraw',
          to: '/quanlydonhang',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Nhà xuất bản',
          icon: 'bx-buildings',
          to: '/quanlynxb',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Thể Loại',
          icon: 'bx-category',
          to: '/quanlytheloai',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Binh Luận',
          icon: 'bx-comment',
          to: '/quanlybinhluan',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Nhân viên',
          icon: 'bxs-universal-access',
          to: '/quanlynhanvien',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Người dùng',
          icon: 'bxs-user',
          to: '/quanlynguoidung',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Đánh giá',
          icon: 'bx-star',
          to: '/quanlydanhgia',
        }"
      />
      <!-- <VerticalNavLink
        :item="{
          title: 'QL Trò chuyện',
          icon: 'bx-chat',
          to: '/quanlycuoctrochuyen',
        }"
      /> -->
      <VerticalNavLink
        :item="{
          title: 'QL Vai Trò',
          icon: 'bx-sitemap',
          to: '/quanlyvaitro',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Hạng mức',
          icon: 'bx-diamond',
          to: '/quanlyhangmuc',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'QL Liên hệ',
          icon: 'bxs-contact',
          to: '/quanlylienhe',
        }"
      />
      <!-- 👉 Pages -->
      <!-- <VerticalNavSectionTitle
        :item="{
          heading: 'Pages',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Error',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      /> -->

      <!-- 👉 User Interface -->
      <!-- <VerticalNavSectionTitle
        :item="{
          heading: 'User Interface',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Typography',
          icon: 'mdi-alpha-t-box-outline',
          to: '/typography',
        }"
      /> -->
      <!-- <VerticalNavLink
        :item="{
          title: 'Icons',
          icon: 'bx-show',
          to: '/icons',
        }"
      /> -->
       <!--
      <VerticalNavLink
        :item="{
          title: 'Cards',
          icon: 'bx-credit-card',
          to: '/cards',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Tables',
          icon: 'bx-table',
          to: '/tables',
        }"
      />
-->
      <!-- <VerticalNavLink
        :item="{
          title: 'Form Layouts',
          icon: 'mdi-form-select',
          to: '/form-layouts',
        }"
      />  -->
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
    <template #footer>
      <Footer />
    </template>
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
