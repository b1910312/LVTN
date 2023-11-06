<!-- <script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('12345678')
const newPassword = ref('87654321')
const confirmPassword = ref('87654321')

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

const serverKeys = [
  {
    name: 'Server Key 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Full Access',
  },
  {
    name: 'Server Key 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Read Only',
  },
  {
    name: 'Server Key 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Full Access',
  },
]

const recentDevicesHeaders = [
  {
    title: 'BROWSER',
    key: 'browser',
  },
  {
    title: 'DEVICE',
    key: 'device',
  },
  {
    title: 'LOCATION',
    key: 'location',
  },
  {
    title: 'RECENT ACTIVITY',
    key: 'recentActivity',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bx-mobile',
      color: 'error',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
]
</script> -->
<script>
import moment from 'moment'
export default {
  name: "adsada",
  data() {
    return {
      password1: "",
      password2: "",
      NV: [],
      nvv: [],
      CapNhatMatKhau: ""
    }
  },
  created() {
    this.getNV()
    this.GetOneNV(this.nvv.TKNV_MaNV)
  },
  methods: {
    getNV() {
      this.nvv = JSON.parse(localStorage.getItem("nhanvien"))
      console.log(this.nvv);
    },
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
    updatePassword(id) {
      const now = moment()
      const data = {
        TKNV_MatKhau: this.password2,
        TKNV_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/nhanvien/ResetPassword/' + id, data)
        .then((response) => {
          this.CapNhatMatKhau = "Cập nhật mật khẩu thành công"

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.password1 = ""
      this.password2 = ""
    },
    checkPasswordMatch() {
      if (this.password1 == "") {
        return false;
      }
      if (this.password2 == "") {
        return false;
      }
      return this.password1 === this.password2;
    },
  }
}
</script>
<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Đổi mật khẩu">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->

            <!-- 👉 New Password -->
            <VRow>
              <div class="col-12">
                <p class="text-center text-success">{{ CapNhatMatKhau }}</p>
              </div>
              <VCol cols="12">
                <VTextField v-model="password1" label="Nhập mật khẩu mới" placeholder="Nhập mật khẩu mới"
                  type="password" />

              </VCol>
              <VCol cols="12">
                <VTextField v-model="password2" label="Nhập lại mật khẩu mới" placeholder="Nhập lại mật khẩu mới"
                  type="password" />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <!-- <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Password Requirements:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li v-for="item in passwordRequirements" :key="item" class="d-flex">
                <div>
                  <VIcon size="7" icon="bxs-circle" class="me-3" />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText> -->

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <div class="row w-100 mb-3">
              <div class="col-9">

              </div>
              <div class=col-3>
                <VBtn class="bg bg-primary" @click="updatePassword(NV.NV_MaNV)" :disabled="!checkPasswordMatch()">
                  Tạo mật khẩu
                </VBtn>
              </div>
            </div>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

  </VRow>
</template>
