<script>
import DatePicker from "vue3-datepicker";
import { defineComponent } from "vue";
import moment from "moment";
export default defineComponent({
  name: 'NXBThem',
  components: {
    DatePicker
  },
  data() {
    return {
      LastID: "",
      NewID: "",
      So: "",
      Chu: "",
      KH: {
        KH_MaKH: "",
        KH_HoTen: "",
        KH_SoDienThoai: "",
        KH_NgaySinh: "",
        KH_GioiTinh: "",
        KH_NgayTao: "",
        KH_NgayCapNhat: ""
      },
      DC: {
        DC_MaDT: "",
        DC_DiaChi: "",
        DC_PhuongXa: "",
        DC_QuanHuyen: "",
        DC_TinhTP: "",
        DC_NgayTao: "",
        DC_NgayCapNhat: ""
      },
      TKKH: {
        TKKH_MaKH: "",
        TKKH_MatKhau: "12345678",
        TKKH_Email: "",
        TKKH_HangMuc: "KBHM001",
        TKKH_TrangThai: "1",
        TKKH_NgayTao: "",
        TKKH_NgayCapNhat: ""
      },
      GH: {

        GH_Ma: "",
        GH_MaKH: "",
        GH_NgayTao: ""
      }
    };
  },
  mounted() {
    this.GetLastID()
  },
  methods: {
    GetLastID() {
      axios.get(`http://localhost:3000/api/thongtinkhachhang/getid/getlastttkhma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.KH.KH_MaKH = this.NewID
        console.log(this.KH.KH_MaKH)
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
      let [Text, result] = this.LastID.split("H");
      this.So = result;
      console.log(result);
      this.Chu = Text1;
      console.log(Text1);
    },
    addKhachHang() {
      const now = moment();
      this.KH.KH_NgayTao = now.format("DD-MM-YYYY");
      this.DC.DC_NgayTao = now.format("DD-MM-YYYY");
      this.TKKH.TKKH_NgayTao = now.format("DD-MM-YYYY");
      this.TKKH.TKKH_MaKH = this.KH.KH_MaKH;
      this.DC.DC_MaDT = this.KH.KH_MaKH;

      // Gọi API thêm dữ liệu
      axios.post('http://localhost:3000/api/thongtinkhachhang', this.KH)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            alert('Thêm dữ liệu thành công!')
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })

      axios.post('http://localhost:3000/api/diachi', this.DC)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            alert('Thêm dữ liệu thành công!')
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })
      axios.post('http://localhost:3000/api/khachhang', this.TKKH)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            alert('Thêm dữ liệu thành công!')
            window.location.reload()
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })
      window.location.reload();

    }
  }
});

</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm>
      <VRow>
        <VCol cols="12">
          <VTextField v-model="KH.KH_MaKH" label="Mã Nhân viên" readonly placeholder="John" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="KH.KH_HoTen" label="Tên Nhân viên" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="KH.KH_NgaySinh" label="Ngày Sinh" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="TKKH.TKKH_Email" label="Email" placeholder="············" />
        </VCol>
        <VCol cols="6 ">
          <VTextField v-model="KH.KH_SoDienThoai" label="Số diện thoại" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="KH.KH_GioiTinh" label="Giới tính" placeholder="············" />
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
        <div class="row w-100 mb-3">
          <div class="col-10">

          </div>
          <div class=col-2>
            <VBtn class="bg bg-primary w-100" @click="addKhachHang()">
              Thêm nhân viên
            </VBtn>
          </div>
        </div>
      </VRow>

    </VForm>
  </div>
</template>
