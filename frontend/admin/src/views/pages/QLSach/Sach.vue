<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerSachs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="3"></VCol>
      <VCol cols="2" class="ms-5 ps-5 d-flex">
        <button class="btn btn-outline-primary w-100" @click="GetSach()"
          style="float: right; right: 0;"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
        <RouterLink :to="{ name: 'SachThem' }">
          <button class="btn btn-outline-primary w-100" style="float: right; right: 0;"><font-awesome-icon
              :icon="['fas', 'plus']" /></button>
        </RouterLink>
      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Sách
          </th>
          <th>
            Tên Sách
          </th>
          <th>
            Tác giả
          </th>
          <th>
            Số lượng (cuốn)
          </th>
          <th>
            Giá (VNĐ)
          </th>
          <th>
            Thể loại
          </th>
          <th>
            NXB
          </th>
          <th>
            Ngày nhập
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

        <tr v-for="(item, i) in filteredSachs" :key="S_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.S_Ma }}</td>
          <td>{{ item.S_Ten }}</td>
          <td>{{ item.S_TacGia }}</td>
          <td>{{ item.S_SoLuong }}</td>
          <td>{{ item.S_Gia }}</td>
          <td>{{ getTheLoaiName(item.S_TheLoai) }}</td>
          <td>
            {{ getNXBName(item.S_NXB) }}
          </td>
          <td>{{ item.S_NgayNhap }}</td>
          <td>{{ item.S_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="setActiveSach(item.S_Ma)">
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
                        <div class="col-6">
                          <h4>Chi tiết sách: {{ sach.S_Ten }}</h4>
                        </div>
                        <div class=col-5></div>
                        <div class=col-1>
                          <VBtn class="bg bg-danger" @click="dialog3 = false">Đóng</VBtn>
                        </div>
                      </div>
                      <div class="row w-100">
                        <div class="col-12 col-md-6">
                          <h6> THUMBNAIL&nbsp;&nbsp; <button class="btn btn-outline-success h-50"
                              @click="dialog6 = true">Cập nhật</button>
                          </h6>
                          <v-dialog v-model="dialog6">
                            <div class="card w-75 mx-auto text-start bg bg-white p-5">
                              <div class="col-11">
                                <h4>Cập nhật ThumbNail sách: {{ sach.S_Ten }}</h4>
                              </div>

                              <VCol cols="12">
                                <VForm @submit.prevent="UpdateThumbNail">
                                  <VFileInput label="ThumbNail" type="file" ref="imageInput"
                                    @change="setImageThumbNail" />
                                  <div class="row w-100 mt-2">
                                    <div class="col-8"></div>
                                    <div class="d-flex gap-4 col-2">
                                      <VBtn class="ms-5" type="Thêm">
                                        Cập nhật
                                      </VBtn>
                                    </div>
                                    <div class="d-flex gap-4 col-1">
                                      <VBtn class="ms-5 bg bg-secondary" @click="dialog6 = false">
                                        Hủy
                                      </VBtn>
                                    </div>
                                  </div>
                                </VForm>
                              </VCol>
                            </div>

                          </v-dialog>
                          <img :src="GetThumNail(sach.S_Ma)" class="img-fluid mt-2 mb-4" style="height: 350px;" alt=""
                            srcset="">
                        </div>


                        <VRow>
                          <VCol cols="12">
                            <VTextField v-model="sach.S_Ma" label="Mã sách" readonly placeholder="John" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="sach.S_Ten" label="Tên Sách" readonly
                              placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="TenNXB" label="Nhà xuất bản" readonly placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="TenTheLoai" label="Thể loại sách" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="sach.S_Gia" label="Giá bán (VNĐ)" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="sach.S_SoLuong" label="Số lượng" readonly placeholder="············" />
                          </VCol>

                          <VCol cols="6">
                            <VTextField v-model="sach.S_NgayNhap" label="Ngày nhập kho" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="sach.S_NgayCapNhat" label="Ngày cập nhật" readonly
                              placeholder="············" />
                          </VCol>
                        </VRow>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>
        
                <RouterLink :to="{ name: 'SachSua', params: { id: item.S_Ma } }">
                  <button class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon
                      :icon="['fas', 'pen']" /> Chỉnh sửa</button>
                </RouterLink>
                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog8 = true"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog8" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa sách này không?</h2>
                    <p class="mt-3">sách sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa sách này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(item.S_Ma)">
                          <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog8 = false">
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
import moment from 'moment';
import { defineComponent } from 'vue';
import { defineAsyncComponent, ref } from 'vue';
// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  data() {
    return {
      NXBs: [],
      TheLoais: [],
      sachs: [],
      sach: "",
      sachNKD: "",
      LastID: "",
      NewID: "",
      So: "",
      Chu: "",
      NK: {
        NK_Ma: "",
        NK_MaSach: "",
        NK_MaNV: "",
        NK_Gia: "",
        NK_SoLuong: "",
        NK_NgayNhap: "",
      },
      S_NgayXoa: "",
      TenNXB: "",
      TenTheLoai: "",
      FitlerSachs: "",
      S_MaActive: "",
      dialog3: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      dialog5: false,
      nhanvien: {},


      imageThumbnail: null

    }

  },

  computed: {
    filteredSachs() {
      return this.sachs.filter((item) => {
        return item.S_Ma.toLowerCase().includes(this.FitlerSachs.toLowerCase()) ||
          item.S_Ten.toLowerCase().includes(this.FitlerSachs.toLowerCase()) ||
          item.S_TacGia.toLowerCase().includes(this.FitlerSachs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetNhanVien()
    this.GetSach()
    this.getNXB()
    this.getTheLoai()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    done() {
      window.location.reload()
    },
    setImageThumbNail(event) {
      this.imageThumbnail = event.target.files[0];
    },
    async CapNhatHMM(STT, File) {
      const formData = new FormData();

      formData.append("images", File);
      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/sach/HMH/" + this.sach.S_Ma + "/" + STT, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert('Thêm dữ liệu thành công!')
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        alert('LỖI!' + error)

        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
    },
    async UpdateThumbNail() {
      const formData = new FormData();
      formData.append("image", this.imageThumbnail);
      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/TB/" + this.sach.S_Ma, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        window.location.reload()
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
    },

    GetThumNail(S_Ma) {
      const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
      return logo;
    },
    GetHMM(S_Ma, STT) {
      const logo = "http://localhost:3000/api/thumbnail/image/HMH/HMH/" + S_Ma + "/" + STT
      return logo;
    },
    GetNhanVien() {
      const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"));
      this.nhanvien = nhanvienchitiet;
    },
    GetLastID() {
      axios.get(`http://localhost:3000/api/sach/NhapKho/getid/getlastnkma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.NK.NK_Ma = this.NewID
        console.log("newid" + this.NK.NK_Ma)
      })
    },
    Increase() {
      // Chuyển đổi chuỗi thành số nguyên
      let SoNguyen = parseInt(this.So);

      // Tăng giá trị của số nguyên
      SoNguyen += 1;

      // Chuyển đổi số nguyên thành chuỗi
      this.So = String(SoNguyen).padStart(3, "0");
      this.NewID = this.Chu + this.So;
      console.log(this.NewID)
    },
    TachKBS() {
      let [Text1, result1] = this.LastID.split("0");
      let [Text, result] = this.LastID.split("NK");
      this.So = result;
      this.Chu = Text1;
    },

    increaseID() {
      // Chuyển đổi chuỗi thành số nguyên
      let so_nguyen = parseInt(this.chuỗi);

      // Tăng giá trị của số nguyên
      so_nguyen += 1;

      // Chuyển đổi số nguyên thành chuỗi
      this.chuỗi = String(so_nguyen);
    },
  
    setActiveSach(data) {
      this.S_MaActive = data;
      console.log("S_Ma" + this.S_MaActive)
      this.GetOneSach(this.S_MaActive)
    },
    GetSach() {
      axios.get('http://localhost:3000/api/sach')
        .then((response) => {
          this.sachs = response.data;
          console.log(response);
          console.log(this.sachs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },

    GetOneSach(id) {
      axios.get('http://localhost:3000/api/sach/' + id)
        .then((response) => {
          this.sach = response.data;
          console.log(response);
          console.log(this.sach);
          this.TXTen();

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })


    },
    TXTen() {
      this.TenNXB = this.getNXBName(this.sach.S_NXB);
      this.TenTheLoai = this.getTheLoaiName(this.sach.S_TheLoai);
    },
    getNXBName(S_NXB) {
      return this.NXBs.find(item => item.NXB_Ma === S_NXB).NXB_Ten;
    },
    getTheLoaiName(S_TheLoai) {
      return this.TheLoais.find(item => item.TL_Ma === S_TheLoai).TL_Ten;
    },
    getNXB() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/NXB`).then(res => {
        this.NXBs = res.data
        console.log(this.NXBs)
      })
    },
    getTheLoai() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/theloai`).then(res => {
        this.TheLoais = res.data
        console.log(this.TheLoais)
      })
    },
    XoaSach(Sach_ma) {
      const now = moment()
      this.sachNKD = this.sach
      this.S_NgayXoa = now.format("DD-MM-YYYY");
      console.log(this.sachNKD)
      console.log(this.S_NgayXoa)
      axios.post("http://localhost:3000/api/sachngungkinhdoanh/", this.sachNKD).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        alert(error);
      });
      axios.delete("http://localhost:3000/api/sach/" + Sach_ma)
        .then(response => {
          // Nếu cập nhật thành công, thì hiển thị thông báo
          alert("Xóa thành công");
          // Sau đó, chuyển hướng người dùng
          this.GetSach();

        }).catch(error => {
          alert(error);
        });
      const data = {
        S_Ma: Sach_ma
      }
      axios.post(`http://localhost:5000/delete_product`, data)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            console.log("xóa sách khỏi csv thành công")
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log("Lưu sách vào csv không thành công")
          console.log(error)
        })
    }
  }
});
</script>
