<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
}

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'HKD',
  'HUF',
  'INR',
]
</script>

<script>
import moment from 'moment';
export default {
  name: "helloss",
  data() {
    return {
      nvv: [],
      NV: [],
      VT: [],
      DC: [],
      dialog5: false, 
      GioiTinh: [
        {
          name: "Nữ",
          value: "1"
        },
        {
          name: "Nam",
          value: "2"
        },
      ],
    }
  },
  mounted() {
    this.getNV()
    this.GetOneNV(this.nvv.TKNV_MaNV)
    this.GetOneDC(this.nvv.TKNV_MaNV)

    this.GetOneVT(this.nvv.TKNV_VaiTro)


  },
  methods: {
    GetLogo(NV_MaNV) {
      const logo = "http://localhost:3000/api/thumbnail/image/NV/" + NV_MaNV
      return logo;
    },
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
    GetOneDC(id) {
      axios.get('http://localhost:3000/api/diachi/' + id)
        .then((response) => {
          this.DC = response.data;
          console.log(response);
          console.log(this.DC);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })

    },
    GetGT(id) {
      switch (id) {
        case "1":
          return "Nữ";
        case "2":
          return "Nam";
        default:
          return null;
      }
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
    cancel() {
      this.dialog4 = false
    },
    async UpdateLogo() {
      const formData = new FormData();
      formData.append("image", this.imageFile);

      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/NV/" + this.NV.NV_MaNV, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        // this.$router.push("/quanlynxb");
        window.location.reload()
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }

    },

    setImageFile(event) {
      this.imageFile = event.target.files[0];
    },
    CapNhatThongTin() {
      const now = moment();

      this.NV.NV_NgayCapNhat = now.format("DD-MM-YYYY");
      this.DC.DC_NgayCapNhat = now.format("DD-MM-YYYY");

      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/thongtinnhanvien/" + this.NV.NV_MaNV, this.NV).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        alert(error);
      });

      axios.put("http://localhost:3000/api/diachi/" + this.NV.NV_MaNV, this.DC).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        alert(error);
      });
      window.location.reload()
    },
  }
}
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Chi tiết nhân viên">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="GetLogo(nvv.TKNV_MaNV)" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="dialog5 = true">
                <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Cập nhật ảnh đại diện</span>
              </VBtn>
              <v-dialog v-model="dialog5">
                <div class="card w-75 mx-auto text-start bg bg-white p-5">
                  <div class="col-11">
                    <h4>Cập nhật Ảnh đại diện</h4>
                  </div>

                  <VCol cols="12">
                    <VForm @submit.prevent="UpdateLogo">
                      <VFileInput label="Avatar" type="file" ref="imageInput" @change="setImageFile" />
                      <div class="row w-100 mt-2">
                        <div class="col-8"></div>
                        <div class="d-flex gap-4 col-2">
                          <VBtn class="ms-5" type="Thêm">
                            Cập nhật
                          </VBtn>
                        </div>
                        <div class="d-flex gap-4 col-1">
                          <VBtn class="ms-5 bg bg-secondary" @click="cancel()">
                            Hủy
                          </VBtn>
                        </div>
                      </div>
                    </VForm>
                  </VCol>
                </div>

              </v-dialog>

              <!-- <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                  <span class="d-none d-sm-block">Reset</span>
                  <VIcon icon="bx-refresh" class="d-sm-none" />
                </VBtn> -->
            </div>

            <!-- <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p> -->
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField v-model="NV.NV_MaNV" readonly label="Mã Nhân viên"
                  placeholder="123 Main St, New York, NY 10001" />
              </VCol>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="NV.NV_HoTen" placeholder="John" label="Họ tên" />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <select class="form-control" v-model="NV.NV_GioiTinh">
                  <option v-for="gt in GioiTinh" :value="gt.value">{{ gt.name }}</option>
                </select>
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField v-model="NV.NV_Email" label="E-mail" placeholder="johndoe@gmail.com" type="email" />
              </VCol>

              <!-- 👉 Organization -->
              <VCol cols="12" md="6">
                <VTextField v-model="NV.NV_NgaySinh" label="Ngày sinh" placeholder="ThemeSelection" />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField v-model="NV.NV_SoDienThoai" label="Số điện thoại" placeholder="+1 (917) 543-9876" />
              </VCol>



              <!-- 👉 State -->
              <VCol cols="12" md="6">
                <VTextField v-model="DC.DC_DiaChi" label="Địa chỉ" placeholder="New York" />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol cols="12" md="6">
                <VTextField v-model="DC.DC_PhuongXa" label="Phường Xã" placeholder="10001" />
              </VCol>

              <!-- 👉 Country -->
              <VCol cols="12" md="6">
                <VTextField v-model="DC.DC_QuanHuyen" label="Quận Huyện" placeholder="Select Country" />
              </VCol>

              <!-- 👉 Language -->
              <VCol cols="12" md="6">
                <VTextField v-model="DC.DC_TinhTP" label="Tỉnh Thành phố" placeholder="Select Language" />
              </VCol>

              <!-- 👉 Timezone -->
              <!-- <VCol cols="12" md="6">
                <VSelect v-model="NV.NV_NgayTao" label="Timezone" placeholder="Select Timezone"
                  :items="timezones" :menu-props="{ maxHeight: 200 }" />
              </VCol> -->

              <!-- 👉 Currency -->
              <!-- <VCol cols="12" md="6">
                <VSelect v-model="NV.NV_NgayCapNhat" label="Currency" placeholder="Select Currency"
                  :items="currencies" :menu-props="{ maxHeight: 200 }" />
              </VCol> -->

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn @click="CapNhatThongTin()">Cập nhật</VBtn>
                <!-- 
                <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                  Reset
                </VBtn> -->
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

  </VRow>
</template>
