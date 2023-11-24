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
          <!-- <th>
            Mật khẩu
          </th> -->
          <th>
            Vai Trò
          </th>
          <th>
            Trạng thái
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

        <tr v-for="(item, i) in filteredNVs" :key="NV_MaNV">
          <td>{{ i + 1 }}</td>
          <td>{{ item.TKNV_MaNV }}</td>
          <!-- <td>{{ item.TKNV_MatKhau }}</td> -->
          <td>{{ getVaiTroName(item.TKNV_VaiTro) }}</td>
          <td :class="GetColor(item.TKNV_TrangThai)">{{ GetTrangThai(item.TKNV_TrangThai) }}</td>
          <td>{{ item.TKNV_NgayTao }}</td>
          <td>{{ item.TKNV_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="GetOneNV(item.TKNV_MaNV)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <button class="dropdown-item btn bg bg-primary text-white mb-1" @click="dialog3 = true">
                  <font-awesome-icon :icon="['fas', 'arrows-rotate']" /> Đặt lại mật khẩu</button>
                <v-dialog v-model="dialog3" class="w-75">
                  <div class="card text-start bg bg-white p-5">
                    <Vrow>
                      <div class="row w-100 mb-3">
                        <div class="col-11">
                          <h4>Cấp mới mật khẩu: {{ NV.NV_HoTen }}</h4>
                        </div>
                        <div class=col-1>
                          <VBtn class="bg bg-danger" @click="dialog3 = false">Đóng</VBtn>
                        </div>
                        <div class="col-12">
                          <p class="text-center text-success">{{ CapNhatMatKhau }}</p>
                        </div>
                      </div>
                      <div class="card p-3">
                        <VCol cols="12">
                          <VTextField v-model="password1" label="Nhập mật khẩu mới" placeholder="Nhập mật khẩu mới"
                            type="password" />

                        </VCol>
                        <VCol cols="12">
                          <VTextField v-model="password2" label="Nhập lại mật khẩu mới"
                            placeholder="Nhập lại mật khẩu mới" type="password" />
                        </VCol>
                        <div class="row w-100 mb-3">
                          <div class="col-9">

                          </div>
                          <div class=col-3>
                            <VBtn class="bg bg-primary" @click="updatePassword(NV.TKNV_MaNV)"
                              :disabled="!checkPasswordMatch()">
                              Tạo mật khẩu
                            </VBtn>
                          </div>
                        </div>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-warning text-white mb-1" @click="KhoaTaiKhoan(NV.TKNV_MaNV)"
                  v-if="item.TKNV_TrangThai == 1"><font-awesome-icon :icon="['fas', 'lock']" /> Khóa tài khoản</button>
                <button class="dropdown-item btn bg bg-success text-white mb-1" @click="MoKhoaTaiKhoan(NV.TKNV_MaNV)"
                  v-if="item.TKNV_TrangThai == 2"><font-awesome-icon :icon="['fas', 'lock']" /> Mở khóa tài khoản</button>
                <button class="dropdown-item btn bg bg-info text-white mb-1" @click="dialog4 = true">
                  <font-awesome-icon :icon="['fas', 'medal']" />Cập nhật vai trò</button>
                <v-dialog v-model="dialog4">
                  <div class="card p-2 w-75 mx-auto">
                    <div class="row w-100 my-3">
                      <div class="col-11">
                        <h4>Cập nhật vai trò của nhân viên: {{ NV.TKNV_MaNV }}</h4>
                      </div>
                      <div class="col-1">
                        <Vbtn class="btn btn-danger" @click="dialog4 = false">Đóng</Vbtn>
                      </div>
                    </div>
                    <div class="card mx-1 my-1">

                      <VRow class="px-4">
                        <!-- <VCol cols="6" class="my-2">
                        <VTextField v-model="KH.TKKH_HangMuc" label="Hạng mức hiện tại" readonly
                          placeholder="+1 123 456 7890" />
                      </VCol> -->
                        <VCol cols="4">
                          <label for="" class="h-100 my-3 h6">Vai trò hiện tại</label>
                        </VCol>
                        <VCol cols="8" class="my-3">
                          <label for="" class="h5">{{ getVaiTroName(NV.TKNV_VaiTro) }}</label>
                        </VCol>
                        <VCol cols="4">
                          <label for="" class="h-100 my-3 h6">Vai trò mới</label>
                        </VCol>
                        <VCol cols="8" class="my-3">
                          <select class="form-control h-100" v-model="this.NewVT">
                            <option v-for="gt in VTs" :value="gt.VT_Ma">{{ gt.VT_TenVaiTro }}</option>
                          </select>
                        </VCol>
                        <VCol cols="9">

                        </VCol>
                        <VCol cols="3" class=" my-3">
                          <Vbtn class="btn btn-primary" @click="capnhatvaitro()">Cập nhật</Vbtn>
                        </VCol>
                      </VRow>
                    </div>

                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog5 = true">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog5" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa tài khoản nhân viên này không?</h2>
                    <p class="mt-3">tài khoản nhân viên sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa tài khoản nhân viên này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(item.TKNV_MaNV)">
                          <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog5 = false">
                          <font-awesome-icon :icon="['fas', 'xmark']" /> Hủy</button></div>
                      <div class="col-2"></div>

                    </div>
                  </div>

                </v-dialog>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
  <v-dialog v-model="dialog6" class="w-75 h-75">
    <div class="card text-center bg bg-white p-5">
      <h2>Bạn không có quyền truy cập vào trang này!!</h2>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
            @click="this.$router.push(`/`)">
            <font-awesome-icon :icon="['fas', '213-291']" />Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
</template>

<script>
import moment from "moment";
import { defineComponent } from 'vue';

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
      NewVT: "",
      VTs: [],
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      password1: "",
      password2: "",
      CapNhatMatKhau: ""
    }

  },
  computed: {
    filteredNVs() {
      return this.NVs.filter((item) => {
        return item.TKNV_MaNV.toLowerCase().includes(this.FitlerNVs.toLowerCase()) ||
          item.TKNV_VaiTro.toLowerCase().includes(this.FitlerNVs.toLowerCase());
      })
    },
  },
  created() {
    const nhanvien = localStorage.getItem('nhanvien')
    const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"))
    if (nhanvienchitiet.TKNV_VaiTro != "KBVT003") {
      this.dialog6 = true
    }
  },
  mounted() {
    this.GetVaiTro()
    this.GetNV()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    capnhatvaitro() {
      const now = moment()
      this.NV.TKNV_VaiTro = this.NewVT;
      this.NV.TKNV_NgayCapNhat = now.format("DD-MM-YYYY");
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/nhanvien/CapNhatVaiTro/" + this.NV.TKNV_MaNV, this.NV).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.dialog4 = false
        this.GetNV()
      }).catch(error => {
        console.log(error);
      });

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
          this.GetNV()

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
      axios.get('http://localhost:3000/api/nhanvien/' + id)
        .then((response) => {
          this.NV = response.data;
          console.log(response);
          console.log(this.NV);

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.GetDiaChi(id)


    },

    GetNV() {
      axios.get('http://localhost:3000/api/nhanvien')
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
    GetVaiTro() {
      axios.get('http://localhost:3000/api/vaitro')
        .then((response) => {
          this.VTs = response.data;
          console.log(response);
          console.log(this.VTs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    MoKhoaTaiKhoan(id) {
      const now = moment()
      const data = {
        TKNV_TrangThai: 1,
        TKNV_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/nhanvien/CapNhatTrangThai/' + id, data)
        .then((response) => {
          this.GetNV()
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    KhoaTaiKhoan(id) {
      const now = moment()
      const data = {
        TKNV_TrangThai: 2,
        TKNV_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/nhanvien/CapNhatTrangThai/' + id, data)
        .then((response) => {
          this.GetNV()
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    getVaiTroName(TKNV_MaVT) {
      return this.VTs.find(item => item.VT_Ma === TKNV_MaVT).VT_TenVaiTro;
    },
    GetTrangThai(id) {
      switch (id) {
        case 1:
          return "Đang hoạt động";
        case 2:
          return "Đang khóa";
        default:
          return null;
      }
    },
    GetColor(id) {
      switch (id) {
        case 1:
          return "text-success";
        case 2:
          return "text-danger";
        default:
          return null;
      }
    },
    XoaSach(NV_Ma) {
      axios.delete("http://localhost:3000/api/nhanvien/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/diachi/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/thongtinnhanvien/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        // Sau đó, chuyển hướng người dùng


      }).catch(error => {
        console.log(error);
      });
      window.location.reload();
    }
  }
});
</script>
