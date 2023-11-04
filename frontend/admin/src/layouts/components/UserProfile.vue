<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

</script>
<script>
export default {
  data() {
    return {
      nvv: {},
      NV: {},
      VT: "",
    }
  },
  created(){
    this.getNV()
    this.GetOneNV(this.nvv.TKNV_MaNV)
    this.GetOneVT(this.nvv.TKNV_VaiTro)
  },
  methods: {
    GetOneNV(id) {
      axios.get('http://localhost:3000/api/thongtinnhanvien/' + id)
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
      axios.get('http://localhost:3000/api/vaitro/' + id)
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
      this.nvv = JSON.parse(localStorage.getItem("nhanvien"))
      console.log(this.nvv);
    },
    logout() {
      this.$store.commit("logoutEmployee");
      window.location.reload()
      this.$router.push("/login");
    },
  },
}
</script>
<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ NV.NV_HoTen }}
            </VListItemTitle>
            <VListItemSubtitle>{{ VT.VT_TenVaiTro }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-user" size="22" />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-cog" size="22" />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-dollar" size="22" />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="bx-help-circle" size="22" />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logout()">
            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
