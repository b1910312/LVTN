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
      },
      VT: [],
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
        VaiTro: "",
        GioiTinh: "",
        CCCD: "",
        DiaChi:"",
        PhuongXa:"",
        QuanHuyen: "",
        TinhTP: "",
        Image: ""
      }),
      DaDayDu: ref()
    };
  },
  mounted() { 
    this.GetLastID()
    this.GetVT()
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
      if (!this.TKNV.TKNV_VaiTro) {
        this.errors.VaiTro = "Vui lòng chọn vai trò";
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
      if (!this.imageFile) {
        this.errors.Image = "Vui lòng chọn ảnh đại diện nhân viên"
      }

      this.DaDayDu = !Object.values(this.errors).some((error) => error);
    },
    async onSubmit() {
      this.validateInput()
      if (this.DaDayDu == true) {
        this.addNhanVien();
      }

    },
    GetVT() {
      axios.get('http://localhost:3000/api/vaitro')
        .then((response) => {
          this.VT = response.data;
          console.log(response);
          console.log(this.VT);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
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
  <div class="m-1 mx-3 " >
    <VForm>
      <VRow>
        <VCol cols="6">
          <VTextField v-model="NV.NV_MaNV" label="Mã Nhân viên" readonly placeholder="John" />
        </VCol>
        <VCol cols="6">
          <VFileInput label="Ảnh đại diện" type="file" ref="imageInput" @change="setImageFile" :error-messages="errors.Image"/>
        </VCol>
        <VCol cols="6">
          <VTextField v-model="NV.NV_HoTen" label="Tên Nhân viên" :error-messages="errors.Ten" placeholder="johndoe@example.com" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="NV.NV_NgaySinh" type="date" :error-messages="errors.NgaySinh" label="Ngày Sinh" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="1">
          <label for="" class="h-100 my-3">Giới tính</label>
        </VCol>
        
        <VCol cols="5">
          <select class="form-control h-100" v-model="NV.NV_GioiTinh">
            <option v-for="gt in GioiTinh" :value="gt.value">{{ gt.name }}</option>
          </select>
          <small><p class="text-danger text-center">{{ errors.GioiTinh }}</p></small>
        </VCol>
        <VCol cols="1">
          <label for="" class="h-100 my-3">Vai trò</label>
        </VCol>
        <VCol cols="5">
          <select class="form-control h-100" v-model="TKNV.TKNV_VaiTro">
            <option v-for="vt in VT" :value="vt.VT_Ma">{{ vt.VT_TenVaiTro }}</option>
          </select>
          <small><p class="text-danger text-center">{{ errors.VaiTro }}</p></small>

        </VCol>

       
        <VCol cols="12">
          <VTextField v-model="NV.NV_CCCD"  :error-messages="errors.CCCD" label="Căn cước công dân" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="NV.NV_Email" :error-messages="errors.Email" type="email" label="Email" placeholder="············" />
        </VCol>
        <VCol cols="6 ">
          <VTextField v-model="NV.NV_SoDienThoai" :error-messages="errors.SoDienThoai" label="Số diện thoại" placeholder="············" />
        </VCol>
       
        <VCol cols="6">
          <VTextField v-model="DC.DC_DiaChi" :error-messages="errors.DiaChi" label="Địa chỉ" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_PhuongXa" :error-messages="errors.PhuongXa" label="Phường/Xã" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_QuanHuyen" :error-messages="errors.QuanHuyen" label="Quận/Huyện" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_TinhTP" :error-messages="errors.TinhTP" label="Tỉnh/Thành phố" placeholder="············" />
        </VCol>
        <div class="row w-100 mb-3">
          <div class="col-10">

          </div>
          <div class=col-2>
            <VBtn class="bg bg-primary w-100" @click="onSubmit()">
              Thêm nhân viên
            </VBtn>
          </div>
        </div>
      </VRow>

    </VForm>
  </div>
</template>
