<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerSachs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="4"></VCol>
      <VCol cols="1" class="pe-5 ms-5 ps-5 d-flex">
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
                      <div class="card p-3">
                        <div class="row w-100">

                          <div class="col-12 col-md-6">
                            <h6> THUMBNAIL&nbsp;&nbsp; <button class="btn btn-outline-success h-50">Cập nhật</button>
                            </h6>
                            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" class="img-fluid mt-2 mb-4" alt=""
                              srcset="">
                          </div>

                          <div class="col-12 col-md-6">
                            <h6 class=""> HÌNH MINH HỌA &nbsp;&nbsp;<button class="btn btn-outline-success h-50">Cập
                                nhật</button>
                            </h6>
                            <v-carousel class="mb-4 " height="350">

                              <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                auto></v-carousel-item>

                              <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                                auto></v-carousel-item>

                              <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                auto></v-carousel-item>
                            </v-carousel>
                          </div>
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
                          <VCol cols="4">
                            <VTextField v-model="sach.S_SoLuong" label="Số lượng" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="2 ">
                            <VBtn class="btn bg bg-primary h-100">Nhập thêm</VBtn>
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
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.S_Ma)"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> Xóa</button>
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
      S_NgayXoa: "",
      TenNXB: "",
      TenTheLoai: "",
      FitlerSachs: "",
      S_MaActive: "",
      dialog3: false,
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
    this.GetSach()
    this.getNXB()
    this.getTheLoai()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
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
    XoaSach(S_Ma) {
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
      axios.delete("http://localhost:3000/api/sach/" + S_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetSach();

      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
