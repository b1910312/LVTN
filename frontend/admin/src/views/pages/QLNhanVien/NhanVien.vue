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
        <button class="btn btn-outline-secondary w-100" style="float: right; right: 0;"
          @click="GetNV()"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
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

                        <h6> Ảnh đại diện&nbsp;&nbsp; </h6>
                        <img style="max-width: 300px;" :src="GetLogo(NV.NV_MaNV)" class="img-fluid mx-auto mt-2 mb-4"
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

                        <h6 class="ms-3"> Ảnh đại diện&nbsp;&nbsp; <button @click="dialog5 = true"
                            class="btn btn-outline-success"><font-awesome-icon :icon="['fas', 'pen']" /></button>
                        </h6>
                        <v-dialog v-model="dialog5">
                          <div class="card w-75 mx-auto text-start bg bg-white p-5">
                            <div class="col-11">
                              <h4>Cập nhật Ảnh đại diện nhân viên: {{ NV.NV_HoTen }}</h4>
                            </div>

                            <VCol cols="12">
                              <VForm @submit.prevent="UpdateLogo">
                                <VFileInput label="Logo" type="file" ref="imageInput" @change="setImageFile" />
                                <div class="row w-100 mt-2">
                                  <div class="col-8"></div>
                                  <div class="d-flex gap-4 col-2">
                                    <VBtn class="ms-5" type="Thêm" :disabled="!imageFile">
                                      Cập nhật
                                    </VBtn>
                                  </div>
                                  <div class="d-flex gap-4 col-1">
                                    <VBtn class="ms-5 bg bg-secondary" @click="dialog5 = false">
                                      Hủy
                                    </VBtn>
                                  </div>
                                </div>
                              </VForm>
                            </VCol>
                          </div>

                        </v-dialog>
                        <img style="max-width: 300px;" :src="GetLogo(NV.NV_MaNV)" class="img-fluid mx-auto mt-2 mb-4"
                          alt="" srcset="">


                        <VRow>

                          <VCol cols="12">
                            <VTextField v-model="NV.NV_HoTen" :error-messages="errors.Ten" label="Tên Nhân viên" placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NV.NV_NgaySinh"   :error-messages="errors.NgaySinh" label="Ngày Sinh" placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="12">
                            <!-- <v-select v-model="NV.NV_GioiTinh" :options="options"></v-select> -->
                            <select class="form-control" v-model="NV.NV_GioiTinh">
                              <option v-for="gt in GioiTinh" :value="gt.value">{{ gt.name }}</option>
                            </select>
                            <small><p class="text-danger text-center">{{ errors.GioiTinh }}</p></small>
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="NV.NV_CCCD"  :error-messages="errors.CCCD" label="Căn cước công dân" placeholder="············" />
                          </VCol>
                          <VCol cols="4">
                            <VTextField v-model="NV.NV_Email"  :error-messages="errors.Email" label="Email" placeholder="············" />
                          </VCol>
                          <VCol cols="4 ">
                            <VTextField v-model="NV.NV_SoDienThoai"  :error-messages="errors.SoDienThoai" label="Số diện thoại" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_DiaChi"  :error-messages="errors.DiaChi" label="Địa chỉ" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_PhuongXa"  :error-messages="errors.PhuongXa" label="Phường/Xã" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_QuanHuyen"  :error-messages="errors.QuanHuyen" label="Quận/Huyện" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_TinhTP"  :error-messages="errors.TinhTP" label="Tỉnh/Thành phố" placeholder="············" />
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
                              <VBtn class="bg bg-primary" @click="onSubmit()">Cập nhật</VBtn>
                            </div>
                          </div>
                        </VRow>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>

                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog6 = true">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog6" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa thông tin nhân viên này không?</h2>
                    <p class="mt-3">thông tin nhân viên sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa thông tin nhân viên này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(item.NV_MaNV)">
                          <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog6 = false">
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
  <v-dialog v-model="dialog7" class="w-50 h-25">
    <div class="card text-center bg bg-white p-5">
      <h3 class="text-success">Bạn đã cập nhật thông tin nhân viên thành công</h3>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
            @click="dialog7 = false">
            <font-awesome-icon :icon="['fas', 'check']" /> Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
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
      imageFile: "",
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
    
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
      errors: ref({
        Ten: "",
        Email: "",
        SoDienThoai: "",
        Email: "",
        NgaySinh: "",
        GioiTinh: "",
        CCCD: "",
        DiaChi:"",
        PhuongXa:"",
        QuanHuyen: "",
        TinhTP: "",
      }),
      DaDayDu: ref()
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
    async validateInput() {
      this.errors.Ten = "";
      this.errors.Email = "";
      this.errors.SoDienThoai = "";
      this.errors.NgaySinh = "";
      this.errors.VaiTro = "";
      this.errors.GioiTinh = "";
      this.errors.CCCD = "";
      this.errors.DiaChi = "";
      this.errors.PhuongXa = "";
      this.errors.QuanHuyen = "";
      this.errors.TinhTP = "";
      this.errors.Image = "";

      if (!this.NV.NV_HoTen) {
        this.errors.Ten = "Vui lòng nhập tên nhân viên";
      }
      if (!this.NV.NV_Email) {
        this.errors.Email = "Vui lòng nhập email";
      } else if (!/^\S+@\S+\.\S+$/.test(this.NV.NV_Email)) {
        this.errors.Email = "Email không hợp lệ";
      }
      if (!this.NV.NV_SoDienThoai) {
        this.errors.SoDienThoai = "Vui lòng nhập số điện thoại";
      }
      if (!this.NV.NV_NgaySinh) {
        this.errors.NgaySinh = "Vui lòng nhập ngày sinh";
      }
      if (!this.NV.NV_GioiTinh) {
        this.errors.GioiTinh = "Vui lòng chọn giới tính";
      }
      if (!this.NV.NV_CCCD) {
        this.errors.CCCD = "Vui lòng nhập Căn cước công dân";
      }

      if (!this.DC.DC_DiaChi.trim()) {
        this.errors.DiaChi = "Vui lòng nhập địa chỉ";
      }

      if (!this.DC.DC_PhuongXa.trim()) {
        this.errors.PhuongXa = "Vui lòng nhập phường xã";
      }
      if (!this.DC.DC_QuanHuyen.trim()) {
        this.errors.QuanHuyen = "Vui lòng nhập quận huyện";
      }

      if (!this.DC.DC_TinhTP.trim()) {
        this.errors.TinhTP = "Vui lòng nhập tỉnh thành phố";
      }
      this.DaDayDu = !Object.values(this.errors).some((error) => error);
    },
    async onSubmit() {
      this.validateInput()
      if (this.DaDayDu == true) {
        this.CapNhatThongTin();
      }

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
    GetLogo(NV_MaNV) {
      const logo = "http://localhost:3000/api/thumbnail/image/NV/" + NV_MaNV
      return logo;
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
        console.log(error);
      });

      axios.put("http://localhost:3000/api/diachi/" + this.NV.NV_MaNV, this.DC).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        console.log(error);
      });
      this.dialog4 = false
      this.dialog7 = true
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
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/diachi/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/bìnhluan/deleteKH" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công bình luận");
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
      
      axios.delete("http://localhost:3000/api/binhluan/deleteKH/" + NV_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công bình luận");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete(`http://localhost:3000/api/thumbnail/xoaanh/NV_` + NV_Ma +`.png`)
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
