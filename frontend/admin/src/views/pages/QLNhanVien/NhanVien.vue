<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerNVs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <button class="btn btn-outline-secondary w-100" style="float: right; right: 0;" @click="GetNV()"><font-awesome-icon
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
            Mã Nhân viên
          </th>
          <th>
            Tên Nhân viên
          </th>
          <th>
            Ngày sinh
          </th>
          <th>
            Giới tính
          </th>
          <th>
            CCCD
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

        <tr v-for="(item, i) in filteredNVs" :key="NV_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.NV_MaNV }}</td>
          <td>{{ item.NV_HoTen }}</td>
          <td>{{ item.NV_NgaySinh }}</td>
          <td>{{ GetGT(item.NV_GioiTinh) }}</td>
          <td>{{ item.NV_CCCD }}</td>
          <td>{{ item.NV_Email }}</td>
          <td>{{ item.NV_SDT }}</td>
          <td>{{ item.NV_NgayTao }}</td>
          <td>{{ item.NV_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="GetOneNV(item.NV_MaNV)">
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
                          <h4>Thông tin nhân viên: {{ NV.NV_HoTen }}</h4>
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
                            <VTextField v-model="NV.NV_MaNV" label="Mã Nhân viên" readonly placeholder="John" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NV.NV_HoTen" label="Tên Nhân viên" readonly
                              placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NV.NV_NgaySinh" label="Ngày Sinh" readonly
                              placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="GT" label="Giới tính" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="NV.NV_CCCD" label="Căn cước công dân" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="NV.NV_Email" label="Email" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="4 ">
                            <VTextField v-model="NV.NV_SoDienThoai" label="Số diện thaoij" readonly
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
                            <VTextField v-model="NV.NV_NgayTao" label="Ngày tạo" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="NV.NV_NgayCapNhat" label="Ngày cập nhật" readonly
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
                          <h4> Cập nhật thông tin nhân viên: {{ NV.NV_HoTen }}</h4>
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
                            <VTextField v-model="NV.NV_HoTen" label="Tên Nhân viên" placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NV.NV_NgaySinh" label="Ngày Sinh" placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="GT" label="Giới tính" placeholder="············" />
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="NV.NV_CCCD" label="Căn cước công dân" placeholder="············" />
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="NV.NV_Email" label="Email" placeholder="············" />
                          </VCol>
                          <VCol cols="4 ">
                            <VTextField v-model="NV.NV_SoDienThoai" label="Số diện thoại" placeholder="············" />
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
                            <VTextField v-model="NV.NV_NgayTao" label="Ngày tạo" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="NV.NV_NgayCapNhat" label="Ngày cập nhật" readonly
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
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.NV_MaNV)">
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
      NVs: [],
      NV: "",
      FitlerNVs: "",
      DC: "",
      GT: "",
      dialog3: false,
      dialog4: false

    }

  },
  computed: {
    filteredNVs() {
      return this.NVs.filter((item) => {
        return item.NV_MaNV.toLowerCase().includes(this.FitlerNVs.toLowerCase()) ||
          item.NV_HoTen.toLowerCase().includes(this.FitlerNVs.toLowerCase()) ||
          item.NV_Email.toLowerCase().includes(this.FitlerNVs.toLowerCase()) ||
          item.NV_SDT.toLowerCase().includes(this.FitlerNVs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetNV()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },

  methods: {
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
      this.dialog4 = false
      this.GetNV()
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
    GetOneNV(id) {
      axios.get('http://localhost:3000/api/thongtinnhanvien/' + id)
        .then((response) => {
          this.NV = response.data;
          console.log(response);
          console.log(this.NV);
          this.GT = this.GetGT(this.NV.NV_GioiTinh)

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.GetDiaChi(id)


    },
    GetNV() {
      axios.get('http://localhost:3000/api/thongtinnhanvien')
        .then((response) => {
          this.NVs = response.data;
          console.log(response);
          console.log(this.NVs);
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
    XoaSach(NV_Ma) {
      axios.delete("http://localhost:3000/api/nhanvien/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        alert(error);
      });
      axios.delete("http://localhost:3000/api/diachi/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        alert(error);
      });
      axios.delete("http://localhost:3000/api/thongtinnhanvien/" + NV_Ma).then(response => {
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
