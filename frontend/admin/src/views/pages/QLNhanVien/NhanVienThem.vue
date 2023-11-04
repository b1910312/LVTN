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
      NV: {
        NV_MaNV: "",
        NV_HoTen: "",
        NV_Email: "",
        NV_SoDienThoai: "",
        NV_NgaySinh: "",
        NV_GioiTinh: "",
        NV_CCCD: "",
        NV_NgayTao: "",
        NV_NgayCapNhat: ""
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
      TKNV: {
        TKNV_MaNV: "",
        TKNV_MatKhau: "12345678",
        TKNV_VaiTro: "",
        TKNV_TrangThai: "1",
        TKNV_NgayTao: "",
        TKNV_NgayCapNhat: ""
      }
    };
  },
  mounted() {
    this.GetLastID()
  },
  methods: {
    GetLastID() {
      axios.get(`http://localhost:3000/api/thongtinnhanvien/getid/getlastttnvma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.NV.NV_MaNV = this.NewID
        console.log(this.NV.NV_MaNV)
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
      let [Text, result] = this.LastID.split("V");
      this.So = result;
      console.log(result);
      this.Chu = Text1;
      console.log(Text1);
    },
    async addNhanVien() {
      const now = moment();
      this.NV.NV_NgayTao = now.format("DD-MM-YYYY");
      this.DC.DC_NgayTao = now.format("DD-MM-YYYY");
      this.TKNV.TKNV_NgayTao = now.format("DD-MM-YYYY");
      this.TKNV.TKNV_MaNV = this.NV.NV_MaNV;
      this.DC.DC_MaDT = this.NV.NV_MaNV;

      // Gọi API thêm dữ liệu
      axios.post('http://localhost:3000/api/thongtinnhanvien', this.NV)
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
      axios.post('http://localhost:3000/api/nhanvien', this.TKNV)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            alert('Thêm dữ liệu thành công!')
            this.$router.push("/quanlynhanvien");
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })
      const formData = new FormData();
      formData.append("image", this.imageFile);

      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/NV/" + this.NV.NV_MaNV, formData, {
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
    setImageFile(event) {
      this.imageFile = event.target.files[0];
    },
  }
});

</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm>
      <VRow>
        <VCol cols="6">
          <VTextField v-model="NV.NV_MaNV" label="Mã Nhân viên" readonly placeholder="John" />
        </VCol>
        <VCol cols="6">
          <VFileInput label="Ảnh đại diện" type="file" ref="imageInput" @change="setImageFile" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="NV.NV_HoTen" label="Tên Nhân viên" placeholder="johndoe@example.com" />
        </VCol>
        <VCol cols="3">
          <VTextField v-model="TKNV.TKNV_VaiTro" label="Vai trò" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="3">
          <VTextField v-model="NV.NV_NgaySinh" label="Ngày Sinh" placeholder="+1 123 456 7890" />
        </VCol>


        <VCol cols="6">
          <VTextField v-model="NV.NV_CCCD" label="Căn cước công dân" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="NV.NV_Email" label="Email" placeholder="············" />
        </VCol>
        <VCol cols="6 ">
          <VTextField v-model="NV.NV_SoDienThoai" label="Số diện thoại" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="NV.NV_GioiTinh" label="Giới tính" placeholder="············" />
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
            <VBtn class="bg bg-primary w-100" @click="addNhanVien()">
              Thêm nhân viên
            </VBtn>
          </div>
        </div>
      </VRow>

    </VForm>
  </div>
</template>
