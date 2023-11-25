<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
</script>
<script>
export default {
  name: "userProfile",
  data() {
    return {
      nvv: {
      },
      NV: {},
      VT: "",
    }
  },
  created(){
    this.interval = setInterval(() => {
      axios.get('http://localhost:3000/api/khachhang/' + this.nvv.TKKH_MaKH).then((response) => {
          // Update the value of the variable
          this.KH = response.data
          var khachHang = JSON.parse(localStorage.getItem('khachhang'));
          khachHang.TKKH_TrangThai = this.KH.TKKH_TrangThai
          localStorage.setItem('khachhang', JSON.stringify(khachHang));
          this.getNV()
        })
    }, 5000)
  },
  mounted() {
    this.getNV()
    this.GetOneNV(this.nvv.TKKH_MaKH)
    this.GetOneVT(this.nvv.TKKH_HangMuc)
  },
  methods: {

    profile() {
      this.$router.push("/profile/" + this.NV.KH_MaKH)
    },
    GetLogo(KH_MaKH) {
      const logo = "http://localhost:3000/api/thumbnail/image/KH/" + KH_MaKH
      return logo;
    },
    GetOneNV(id) {
      axios.get('http://localhost:3000/api/thongtinkhachhang/' + id)
        .then((response) => {
          this.NV = response.data;
          console.log(response);
          console.log(this.NV);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })

    },
    GetOneVT(id) {
      axios.get('http://localhost:3000/api/hangmuc/' + id)
        .then((response) => {
          this.VT = response.data;
          console.log(response);
          console.log(this.VT);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })

    },
    getNV() {
      if (JSON.parse(localStorage.getItem("khachhang")) != null) {
        this.nvv = JSON.parse(localStorage.getItem("khachhang"))
      }
      console.log(this.nvv);
    },
    logout() {
      this.$store.commit("logoutEmployee");
      window.location.reload()
      this.$router.push("/dangnhap");
    },

  },
}
</script>
<template>
  <VBadge v-if="nvv.TKKH_TrangThai !== '' && nvv.TKKH_TrangThai == 1" dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="GetLogo(NV.KH_MaKH)" />
      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem class="my-2 h-100">
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="GetLogo(NV.KH_MaKH)" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ NV.KH_HoTen }}
            </VListItemTitle>
            <VListItemSubtitle>Hạnh mức: {{ VT.HM_TenHangMuc }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem @click="profile()">
            <template #prepend>
              <VIcon class="me-2" icon="bx-user" size="22" />
            </template>

            <VListItemTitle>Hồ sơ</VListItemTitle>
          </VListItem>

          <!--           
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-cog" size="22" />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-dollar" size="22" />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-help-circle" size="22" />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem> -->

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <!-- <VListItem @click="logout()"> -->
          <VListItem @click="logout()">

            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>
            <VListItemTitle>Đăng xuất</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
  <v-button v-if="nvv.TKKH_MaKH == '' || nvv.TKKH_TrangThai !== 1" class="btn btn-success" @click="this.$router.push('/dangnhap')">Đăng nhập</v-button>
</template>
