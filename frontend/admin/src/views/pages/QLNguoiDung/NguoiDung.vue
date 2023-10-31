<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerKHs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <button class="btn btn-outline-primary w-100" @click="GetKH()" style="float: right; right: 0;"><font-awesome-icon
            :icon="['fas', 'arrows-rotate']" /></button>
      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã khách hàng
          </th>
          <th>
            Tên khách hàng
          </th>
          <th>
            Ngày sinh
          </th>
          <th>
            Giới tính
          </th>
          <th>
            Email
          </th>
          <th>
            SDT
          </th>
          <th>
            Ngày tạo
          </th>
          <th>
            Ngày cập nhật
          </th>
          <th>
            Thao Tác
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, i) in filteredKHs" :key="KH_MaKH">
          <td>{{ i + 1 }}</td>
          <td>{{ item.KH_MaKH }}</td>
          <td>{{ item.KH_HoTen }}</td>
          <td>{{ item.KH_NgaySinh }}</td>
          <td>{{ GetGT(item.KH_GioiTinh) }}</td>
          <td>{{ getEmail(item.KH_MaKH) }}</td>
          <td>{{ item.KH_SoDienThoai }}</td>
          <td>{{ item.KH_NgayTao }}</td>
          <td>{{ item.KH_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="GetOneKH(item.KH_MaKH)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <button class="dropdown-item btn bg bg-primary text-white mb-1" @click="dialog3 = true">
                  <font-awesome-icon :icon="['fas', 'eye']" /> Chi tiết</button>
                <v-dialog v-model="dialog3" class="w-75">
                  <div class="card text-start bg bg-white p-5" style="overflow-y: scroll;
height: 800px;">
                    <Vrow>
                      <div class="row w-100 mb-3">
                        <div class="col-11">
                          <h4>Thông tin khách hàng: {{ KH.KH_HoTen }}</h4>
                        </div>
                        <div class=col-1>
                          <VBtn class="bg bg-danger" @click="dialog3 = false">Đóng</VBtn>
                        </div>
                      </div>
                      <div class="card p-3">

                        <h6> Ảnh đại diện&nbsp;&nbsp; <button class="btn btn-outline-success h-50">Cập nhật</button>
                        </h6>
                        <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" class="img-fluid w-50 mt-2 mb-4"
                          alt="" srcset="">


                        <VRow>
                          <VCol cols="12">
                            <VTextField v-model="KH.KH_MaKH" label="Mã Nhân viên" readonly placeholder="John" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="KH.KH_HoTen" label="Tên Nhân viên" readonly
                              placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="KH.KH_NgaySinh" label="Ngày Sinh" readonly
                              placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="GT" label="Giới tính" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="Email" label="Email" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6 ">
                            <VTextField v-model="KH.KH_SoDienThoai" label="Số diện thoại" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_DiaChi" label="Địa chỉ" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_PhuongXa" label="Phường/Xã" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_QuanHuyen" label="Quận/Huyện" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_TinhTP" label="Tỉnh/Thành phố" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="KH.KH_NgayTao" label="Ngày tạo" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="KH.KH_NgayCapNhat" label="Ngày cập nhật" readonly
                              placeholder="············" />
                          </VCol>
                        </VRow>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-success text-white mb-1" @click="dialog4 = true"><font-awesome-icon
                    :icon="['fas', 'pen']" /> Chỉnh sửa</button>

                <v-dialog v-model="dialog4" class="w-75">
                  <div class="card text-start bg bg-white p-5" style="overflow-y: scroll;
height: 800px;">
                    <Vrow>
                      <div class="row w-100 mb-3">
                        <div class="col-11">
                          <h4> Cập nhật thông tin khách hàng: {{ KH.KH_HoTen }}</h4>
                        </div>
                        <div class=col-1>
                          <VBtn class="bg bg-danger" @click="dialog4 = false">Đóng</VBtn>
                        </div>
                      </div>
                      <div class="card p-3">

                        <h6> Ảnh đại diện&nbsp;&nbsp; <button class="btn btn-outline-success h-50">Cập nhật</button>
                        </h6>
                        <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" class="img-fluid w-50 mt-2 mb-4"
                          alt="" srcset="">


                        <VRow>

                          <VCol cols="12">
                            <VTextField v-model="KH.KH_HoTen" label="Tên Nhân viên" placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="KH.KH_NgaySinh" label="Ngày Sinh" placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="4">
                            <VTextField v-model="GT" label="Giới tính" placeholder="············" />
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="Email" label="Email" placeholder="············" />
                          </VCol>
                          <VCol cols="4 ">
                            <VTextField v-model="KH.KH_SoDienThoai" label="Số diện thoại" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_DiaChi" label="Địa chỉ" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_PhuongXa" label="Phường/Xã" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_QuanHuyen" label="Quận/Huyện" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_TinhTP" label="Tỉnh/Thành phố" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="KH.KH_NgayTao" label="Ngày tạo" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="KH.KH_NgayCapNhat" label="Ngày cập nhật" readonly
                              placeholder="············" />
                          </VCol>
                          <div class="row w-100 mb-2">
                            <div class="col-10"></div>
                            <div class="col-2">
                              <VBtn class="bg bg-primary" @click="CapNhatThongTin()">Cập nhật</VBtn>
                            </div>
                          </div>
                        </VRow>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.KH_MaKH)">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { defineAsyncComponent, ref } from 'vue';
import moment from "moment";

// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  data() {
    return {
      KHs: [],
      TKKHs: [],
      KH: "",
      FitlerKHs: "",
      Email: "",
      DC: "",
      GT: "",
      dialog3: false,
      dialog4: false
    }

  },
  computed: {
    filteredKHs() {
      return this.KHs.filter((item) => {
        return item.KH_MaKH.toLowerCase().includes(this.FitlerKHs.toLowerCase()) ||
          item.KH_HoTen.toLowerCase().includes(this.FitlerKHs.toLowerCase()) ||
          item.KH_Email.toLowerCase().includes(this.FitlerKHs.toLowerCase()) ||
          item.KH_SDT.toLowerCase().includes(this.FitlerKHs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetKH()
    this.GetTKKH()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    CapNhatThongTin() {
      const now = moment();

      this.KH.KH_NgayCapNhat = now.format("DD-MM-YYYY");
      this.DC.DC_NgayCapNhat = now.format("DD-MM-YYYY");

      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/thongtinkhachhang/" + this.KH.KH_MaKH, this.KH).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        alert(error);
      });

      axios.put("http://localhost:3000/api/diachi/" + this.KH.KH_MaKH, this.DC).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        alert(error);
      });
      this.dialog4 = false
      this.GetKH()
    },
    GetDiaChi(id) {
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
    GetOneKH(id) {
      axios.get('http://localhost:3000/api/thongtinkhachhang/' + id)
        .then((response) => {
          this.KH = response.data;
          console.log(response);
          console.log(this.KH);
          this.GT = this.GetGT(this.KH.KH_GioiTinh)
          this.Email = this.getEmail(this.KH.KH_MaKH)

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.GetDiaChi(id)


    },
    GetKH() {
      axios.get('http://localhost:3000/api/thongtinkhachhang')
        .then((response) => {
          this.KHs = response.data;
          console.log(response);
          console.log(this.KHs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    GetTKKH() {
      axios.get('http://localhost:3000/api/khachhang')
        .then((response) => {
          this.TKKHs = response.data;
          console.log(response);
          console.log(this.TKKHs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    getEmail(KH_MaKH) {
      return this.TKKHs.find(item => item.TKKH_MaKH === KH_MaKH).TKKH_Email;
    },
    GetGT(id) {
      switch (id) {
        case 1:
          return "Nữ";
        case 2:
          return "Nam";
        default:
          return null;
      }
    },
    XoaSach(KH_MaKH) {
      axios.delete("http://localhost:3000/api/khachhang/" + KH_MaKH).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        alert(error);
      });
      axios.delete("http://localhost:3000/api/diachi/" + KH_MaKH).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        alert(error);
      });
      axios.delete("http://localhost:3000/api/thongtinkhachhang/" + KH_MaKH).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        alert(error);
      });
      window.location.reload();
    }
  }
});
</script>
