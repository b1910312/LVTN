<script>
import axios from 'axios';
import { defineComponent, vModelRadio } from 'vue';
import { mapGetters } from "vuex";
import { handle } from "../common/promise"
export default defineComponent({
  name: "LoginPage",
  data() {

    return {
      NhanVien: ref({
        TKNV_MaNV: '',
        TKNV_MatKhau: '',
      }),
      isTKNV_MatKhauVisible: ref(false),
      loading: false,
      message: "",
    }
  },
  computed: {
    ...mapGetters({
      loggedInEmployee: "nhanvien/loggedInEmployee",
    }),
  },
  created() {
    if (!this.loggedInNhanVien) {
      this.$router.push("/login");
    }
  },
  mounted() { },
  methods: {
    async handleLogin(NhanVien) {
      this.loading = true;
      console.log(NhanVien)
      const [error, data] = await handle(
        this.$store.dispatch("loginEmloyee", NhanVien)
      );
      if (error) {
        console.log(error);
        this.loading = false;
        this.message = "Số điện thoại hoặc mật khẩu đăng nhập sai";
      } else {
        this.$router.push("/");
        console.log(data)
      }
    },

  }
})

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <img src="@/assets/images/KingBookLogo(Big).png" class="img-fluid ">
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-center text-h5 mb-1">
          ĐĂNG NHẬP
        </h5>
        <p class="mb-0">
          Hãy đăng nhập để thực hiện công việc của mình
        </p>
      </VCardText>

      <VCardText>
        <VRow>
          <!-- TKNV_MaNV -->
          <VCol cols="12">
            <VTextField v-model="NhanVien.TKNV_MaNV" autofocus placeholder="Nhập mã nhân viên của bạn tại đây"
              label="Mã nhân viên" />
          </VCol>

          <!-- TKNV_MatKhau -->
          <VCol cols="12">
            <VTextField v-model="NhanVien.TKNV_MatKhau" label="Mật khẩu" placeholder="**********"
              :type="isTKNV_MatKhauVisible ? 'text' : 'password'"
              :append-inner-icon="isTKNV_MatKhauVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isTKNV_MatKhauVisible = !isTKNV_MatKhauVisible" />

            <!-- remember me checkbox -->
            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">

            </div>

            <!-- login button -->
            <VBtn class="w-100" @click="handleLogin(NhanVien)">
              Đăng nhập
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
