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

      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Khách hàng
          </th>
          <th class="text-uppercase">
            Email
          </th>
          <!-- <th>
            Mật khẩu
          </th> -->
          <th>
            Hạng mức
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

        <tr v-for="(item, i) in filteredKHs" :key="KH_MaKH">
          <td>{{ i + 1 }}</td>
          <td>{{ item.TKKH_MaKH }}</td>
          <td>{{ item.TKKH_Email }}</td>
          <!-- <td>{{ item.TKKH_MatKhau }}</td> -->
          <td>{{ getHangMucName(item.TKKH_HangMuc) }}</td>
          <td :class="GetColor(item.TKKH_TrangThai)">{{ GetTrangThai(item.TKKH_TrangThai) }}</td>
          <td>{{ item.TKKH_NgayTao }}</td>
          <td>{{ item.TKKH_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="GetOneKH(item.TKKH_MaKH)">
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
                          <h4>Cấp mới mật khẩu: </h4>
                        </div>
                        <div class=col-1>
                          <VBtn class="bg bg-danger" @click="dialog3 = false, CapNhatMatKhau = ''">Đóng </VBtn>
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
                            <VBtn class="bg bg-primary" @click="updatePassword(KH.TKKH_MaKH)"
                              :disabled="!checkPasswordMatch()">
                              Tạo mật khẩu
                            </VBtn>
                          </div>
                        </div>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-warning text-white mb-1" @click="TamKhoaTaiKhoan(KH.TKKH_MaKH)"
                  v-if="item.TKKH_TrangThai == 1"><font-awesome-icon :icon="['fas', 'lock']" /> Tạm khóa tài
                  khoản</button>
                <button class="dropdown-item btn bg bg-secondary text-white mb-1" @click="dialog1 = true"
                  v-if="item.TKKH_TrangThai == 2"><font-awesome-icon :icon="['fas', 'spinner']" /> Xử lý tài
                  khoản</button>
                <v-dialog v-model="dialog1" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h3>Phương hướng xử lý tài khoản đang tạm khóa</h3>
                    <p>
                      (1) Nếu tài khoản vi phạm quy định của hệ thống có thể khóa tài khoản vĩnh viễn sau khi xem xét <br>
                      (2) Nếu tài khoản không vi phạm quy định của hệ thống có thể mở khóa tài khoản vĩnh viễn sau khi xem
                      xét <br>

                    </p>
                    <div class="row w-100">
                      <div class="mx-auto col-4"> <button class=" btn bg bg-danger text-white text-center"
                          @click="KhoaTaiKhoan(KH.TKKH_MaKH)">
                          <font-awesome-icon :icon="['fas', 'lock']" /> Khóa tài khoản</button></div>
                      <div class="mx-auto col-5"> <button class=" btn bg bg-primary text-white text-center"
                          @click="MoKhoaTaiKhoan(KH.TKKH_MaKH)">
                          <font-awesome-icon :icon="['fas', 'unlock']" /> Mở khóa tài khoản</button></div>
                      <div class="mx-auto col-2"> <button class=" btn bg bg-secondary text-white text-center"
                          @click="dialog1 = false">
                          <font-awesome-icon :icon="['fas', 'xmark']" /> Hủy</button></div>

                    </div>
                  </div>

                </v-dialog>

                <button class="dropdown-item btn bg bg-success s text-white mb-1" @click="MoKhoaTaiKhoan(KH.TKKH_MaKH)"
                  v-if="item.TKKH_TrangThai == 3"><font-awesome-icon :icon="['fas', 'lock']" /> Mở khóa tài khoản</button>

                <button class="dropdown-item btn bg bg-info text-white mb-1" @click="dialog4 = true">
                  <font-awesome-icon :icon="['fas', 'medal']" /> Nâng hạng</button>
                <v-dialog v-model="dialog4">
                  <div class="card p-2 w-75 mx-auto">
                    <div class="row w-100 my-3">
                      <div class="col-11">
                        <h4>Nâng hạng mức khách hàng: {{ KH.TKKH_MaKH }}</h4>
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
                          <label for="" class="h-100 my-3 h6">Hạng Mức hiện tại</label>
                        </VCol>
                        <VCol cols="8" class="my-3">
                          <label for="" class="h5">{{ getHangMucName(KH.TKKH_HangMuc) }}</label>
                        </VCol>
                        <VCol cols="4">
                          <label for="" class="h-100 my-3 h6">Hạng Mức tiếp theo</label>
                        </VCol>
                        <VCol cols="8" class="my-3">
                          <select class="form-control h-100" v-model="newHM">
                            <option v-for="gt in HMs" :value="gt.HM_Ma">{{ gt.HM_TenHangMuc }}</option>
                          </select>
                          <small><p class="text-danger">{{ errors.HangMuc }}</p></small>
                        </VCol>
                        <VCol cols="9">

                        </VCol>
                        <VCol cols="3" class=" my-3">
                          <Vbtn class="btn btn-primary" @click="onSubmit()">Nâng hạng</Vbtn>
                        </VCol>
                      </VRow>
                    </div>

                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog7 = true">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog7" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa khách hàng này không?</h2>
                    <p class="mt-3">khách hàng sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa khách hàng này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(item.TKKH_MaKH)">
                          <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog7 = false">
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
      KH: "",
      FitlerKHs: "",
      DC: "",
      GT: "",
      HMs: [],
      newHM: "",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog7: false,

      password1: "",
      password2: "",
      CapNhatMatKhau: "",
      MaGH: "",
      errors: ref({
        HangMuc: ""
      }),
      DaDayDu: ref()
    }

  },
  computed: {
    filteredKHs() {
      return this.KHs.filter((item) => {
        return item.TKKH_MaKH.toLowerCase().includes(this.FitlerKHs.toLowerCase()) ||
          item.TKKH_Email.toLowerCase().includes(this.FitlerKHs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetHangMuc()
    this.GetKH()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    async validateInput(){
      this.errors.HangMuc = ""
      if(!this.newHM){
        this.errors.HangMuc = "Vui lòng chọn hạng mức mới"
      }
      this.DaDayDu = !Object.values(this.errors).some((error) => error);

    },
    async onSubmit() {
      this.validateInput()
      if (this.DaDayDu == true) {
        this.nanghang();
      }

    },
    nanghang() {
      const now = moment()
      this.KH.TKKH_HangMuc = this.newHM;
      this.KH.TKKH_NgayCapNhat = now.format("DD-MM-YYYY");
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/khachhang/CapNhatHangMuc/" + this.KH.TKKH_MaKH, this.KH).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.dialog4 = false
        this.GetKH()
      }).catch(error => {
        console.log(error);
      });

    },
    updatePassword(id) {
      const now = moment()
      const data = {
        TKKH_MatKhau: this.password2,
        TKKH_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/khachhang/ResetPassword/' + id, data)
        .then((response) => {
          this.CapNhatMatKhau = "Đã cập nhật thành công"
          this.GetKH()

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
    GetOneKH(id) {
      axios.get('http://localhost:3000/api/khachhang/' + id)
        .then((response) => {
          this.KH = response.data;
          console.log(response);
          console.log("KhachHAng" + this.KH);

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.GetDiaChi(id)


    },
    getHangMucName(TKKH_HangMuc) {
      return this.HMs.find(item => item.HM_Ma === TKKH_HangMuc).HM_TenHangMuc;
    },
    GetKH() {
      axios.get('http://localhost:3000/api/khachhang')
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
    GetHangMuc() {
      axios.get('http://localhost:3000/api/hangmuc')
        .then((response) => {
          this.HMs = response.data;
          console.log(response);
          console.log(this.HMs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    TamKhoaTaiKhoan(id) {
      const now = moment()
      const data = {
        TKKH_TrangThai: 2,
        TKKH_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/khachhang/CapNhatTrangThai/' + id, data)
        .then((response) => {
          this.GetKH()
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    MoKhoaTaiKhoan(id) {
      const now = moment()
      const data = {
        TKKH_TrangThai: 1,
        TKKH_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/khachhang/CapNhatTrangThai/' + id, data)
        .then((response) => {
          this.GetKH()
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.dialog1 = false
    },
    KhoaTaiKhoan(id) {
      const now = moment()
      const data = {
        TKKH_TrangThai: 3,
        TKKH_NgayCapNhat: now.format("DD-MM-YYYY")
      }
      axios.put('http://localhost:3000/api/khachhang/CapNhatTrangThai/' + id, data)
        .then((response) => {
          this.GetKH()
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.dialog1 = false

    },
    GetTrangThai(id) {
      switch (id) {
        case 1:
          return "Đang hoạt động";
        case 2:
          return "Tạm khóa";
        case 3:
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
          return "text-warning";
        case 3:
          return "text-danger";
        default:
          return null;
      }
    },
    XoaSach(KH_Ma) {
      axios.delete("http://localhost:3000/api/khachhang/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/diachi/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/thongtinkhachhang/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        // Sau đó, chuyển hướng người dùng


      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/giohang/deleteKH/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
     
      axios.delete("http://localhost:3000/api/binhluan/deleteKH/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công bình luận");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/danhgiacuahang/deleteKH/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành đánh giá cửa hàng thành công");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.get("http://localhost:3000/api/giohang/GetByKH/" + KH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        this.MaGH = response.data.GH_Ma
        console.log("MaGh")
        console.log(this.MaGH)
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/chitietgiohang/deleteGH/" + this.MaGH)
        .then(response => {
          // Nếu cập nhật thành công, thì hiển thị thông báo
          console.log("Xóa thành công chi tiet gio hang");
          // Sau đó, chuyển hướng người dùng
        }).catch(error => {
          console.log(error);
        });

      axios.delete("http://localhost:3000/api/danhgia/deleteKH/" + KH_Ma)
        .then(response => {
          // Nếu cập nhật thành công, thì hiển thị thông báo
          console.log("Xóa thành công sách");
          // Sau đó, chuyển hướng người dùng
        }).catch(error => {
          console.log(error);
        });
        axios.delete(`http://localhost:3000/api/thumbnail/xoaanh/KH_` + KH_Ma +`.png`)
        .then(response => {
          // Nếu cập nhật thành công, thì hiển thị thông báo
          console.log("Xóa thành công bình luận của sách");
          // Sau đó, chuyển hướng người dùng
        }).catch(error => {
          console.log(error);
        });
      window.location.reload();
    }
  }
});
</script>
