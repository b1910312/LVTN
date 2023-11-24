<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerNKs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="3"></VCol>
      <VCol cols="2" class=" ms-5 ps-5 d-flex">
        <button class="btn btn-outline-primary w-100" @click="GetSach()"
          style="float: right; right: 0;"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
        <button class="btn btn-outline-primary w-100" style="float: right; right: 0;"
          @click="dialog5 = true"><font-awesome-icon :icon="['fas', 'plus']" /></button>
        <v-dialog v-model="dialog5" class="w-50 mt-5" style="height: fit-content;">
          <div class="card text-start bg bg-white p-4 ">
            <Vrow>
              <div class="row w-100 mb-3">
                <div class="col-6 ms-3">
                  <h4>Nhập kho sách: <br> {{ sach.S_Ten }}</h4>
                </div>
                <div class=col-4></div>
                <div class=col-1>
                  <VBtn class="bg bg-danger" @click="dialog5 = false, NK=''">Đóng</VBtn>
                </div>
              </div>
              <div class="row w-100 ms-2">

                <VRow>
                  <VCol cols="1">
                    <label for="" class="h-100 my-3">Sách</label>
                  </VCol>
                  <VCol cols="11">
                    <select class="form-control h-100" v-model="NK.NK_MaSach">
                      <option v-for="gt in Sach" :value="gt.S_Ma">{{ gt.S_Ten }} ({{ gt.S_Ma }})</option>
                    </select>
                  </VCol>
                  <VCol cols="12">
                    <VTextField v-model="NK.NK_SoLuong" label="Số lượng" type="number" placeholder="············" />
                  </VCol>
                  <VCol cols="12">
                    <VTextField v-model="NK.NK_Gia" label="Giá" type="number" placeholder="············" />
                  </VCol>
                </VRow>
              </div>
              <div class="row w-100 mt-3">
                <div class="col-10"></div>
                <div class="col-2">
                  <VBtn class="bg bg-primary" @click="NhapKho()">Cập nhật</VBtn>
                </div>
              </div>
            </Vrow>
          </div>
        </v-dialog>
      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã nhập
          </th>
          <th>
            Nhân viên nhập
          </th>
          <th>
            Sách nhập
          </th>
          <th>
            Số lượng (cuốn)
          </th>
          <th>
            Giá (VNĐ)
          </th>

          <th>
            Ngày nhập
          </th>
        </tr>
      </thead>
      <tbody class="text-center">

        <tr v-for="(item, i) in filteredSachs" :key="NK_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.NK_Ma }}</td>
          <td>{{ item.NK_MaNV }}</td>
          <td>{{ item.NK_MaSach }}</td>
          <td>{{ item.NK_SoLuong }}</td>
          <td>{{ item.NK_Gia }}</td>
          <td>{{ item.NK_NgayNhap }}</td>
        </tr>
      </tbody>
    </VTable>
  </div>
  <v-dialog v-model="dialog9" class="w-50 h-25">
    <div class="card text-center bg bg-white p-5">
      <h2 class="text-center">Nhập kho sách thành công</h2>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
            @click="dialog9 = false, dialog5 = false, NK='' ">
              <font-awesome-icon :icon="['fas', 'circládad']" /> Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
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
      NKs: [],
      sach: "",
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
      Sach: [],
      FitlerNKs: "",
      NK_MaActive: "",
      dialog3: false,
      dialog5: false,
      dialog9: false,
      nhanvien: {},

    }

  },

  computed: {
    filteredSachs() {
      return this.NKs.filter((item) => {
        return item.NK_Ma.toLowerCase().includes(this.FitlerNKs.toLowerCase()) ||
          item.NK_MaNV.toLowerCase().includes(this.FitlerNKs.toLowerCase()) ||
          item.NK_MaSach.toLowerCase().includes(this.FitlerNKs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetNhanVien()
    this.GetLastID()
    this.GetSach()
    this.GetSachMa()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    GetSachMa() {
      axios.get('http://localhost:3000/api/sach')
        .then((response) => {
          this.Sach = response.data;
          console.log(response);
          console.log(this.Sach);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
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
    NhapKho() {
      const now = moment();
      this.NK.NK_MaNV = this.nhanvien.TKNV_MaNV
      this.NK.NK_NgayNhap = now.format("DD-MM-YYYY");
      this.GetOneSach(this.NK.NK_MaSach)
      let SSL = parseInt(this.sach.S_SoLuong);
      let NKSL = parseInt(this.NK.NK_SoLuong);
      this.sach.S_SoLuong = SSL + NKSL;
      this.sach.S_NgayCapNhat = now.format("DD-MM-YYYY");
      //Gọi API để cập nhật sản phẩm
      axios.post("http://localhost:3000/api/sach/nhapkho/", this.NK).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.NK)
        console.log("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        console.log(error);
      });
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/sach/CapNhatSoLuong/" + this.sach.S_Ma, this.sach).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.NK)
        console.log("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        console.log(error);
      });
      this.dialog9 = true
    },
    setActiveSach(data) {
      this.NK_MaActive = data;
      console.log("NK_Ma" + this.NK_MaActive)
    },
    GetSach() {
      this.GetLastID()
      axios.get('http://localhost:3000/api/sach/nhapkho')
        .then((response) => {
          this.NKs = response.data;
          console.log(response);
          console.log(this.NKs.NK_Ma);
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
    XoaSach(NK_Ma) {
      const now = moment()
      this.sachNKD = this.sach
      this.S_NgayXoa = now.format("DD-MM-YYYY");
      console.log(this.sachNKD)
      console.log(this.S_NgayXoa)
      axios.post("http://localhost:3000/api/sachngungkinhdoanh/", this.sachNKD).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        // Sau đó, chuyển hướng người dùng

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/sach/" + NK_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetSach();

      }).catch(error => {
        console.log(error);
      });
    }
  }
});
</script>
