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
      imageFile: null,
      NXB: {
        NXB_Ma: "",
        NXB_Ten: "",
        NXB_Email: "",
        NXB_SDT: "",
        NXB_NgayTao: "",
        NXB_NgayCapNhat: ""
      },
      DC: {
        DC_MaDT: "",
        DC_DiaChi: "",
        DC_PhuongXa: "",
        DC_QuanHuyen: "",
        DC_TinhTP: "",
        DC_NgayTao: "",
      },
      dialog4: false,
      errors: ref({
        Ten: "",
        Email: "",
        SoDienThoai: "",
        DiaChi: "",
        PhuongXa: "",
        QuanHuyen: "",
        TinhTP: "",
        Image: ""
      }),
      DaDayDu: ref()
    };
  },
  mounted() {
    this.GetLastID()
  },
  methods: {
    async validateInput() {
      this.errors.Ten = "";
      this.errors.Email = "";
      this.errors.SoDienThoai = "";
      this.errors.DiaChi = "";
      this.errors.PhuongXa = "";
      this.errors.QuanHuyen = "";
      this.errors.TinhTP = "";
      this.errors.Image = "";

      if (!this.NXB.NXB_Ten) {
        this.errors.Ten = "Vui lòng nhập tên nhà xuất bản";
      }
      if (!this.NXB.NXB_Email) {
        this.errors.Email = "Vui lòng nhập email";
      } else if (!/^\S+@\S+\.\S+$/.test(this.NXB.NXB_Email)) {
        this.errors.Email = "Email không hợp lệ";
      }
      if (!this.NXB.NXB_SDT) {
        this.errors.SoDienThoai = "Vui lòng nhập số điện thoại";
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
        this.errors.Image = "Vui lòng chọn Logo Nhà xuất bản"
      }

      this.DaDayDu = !Object.values(this.errors).some((error) => error);
    },
    async onSubmit() {
      this.validateInput()
      if (this.DaDayDu == true) {
        this.addNXB();
      }

    },
    GetLastID() {
      axios.get(`http://localhost:3000/api/NXB/getid/getlastnxbma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.NXB.NXB_Ma = this.NewID
        this.DC.DC_MaDT = this.NewID
        console.log(this.NXB.NXB_Ma)
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
      let [Text, result] = this.LastID.split("XB");
      this.So = result;
      console.log(result);
      this.Chu = Text1;
      console.log(Text1);
    },
    async addNXB() {
      const now = moment();
      this.NXB.NXB_NgayTao = now.format("DD-MM-YYYY");
      this.DC.DC_NgayTao = now.format("DD-MM-YYYY");

      // Gọi API thêm dữ liệu
      axios.post('http://localhost:3000/api/nxb', this.NXB)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            // alert('Thêm dữ liệu thành công!')

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

          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })
      event.preventDefault();

      const formData = new FormData();
      formData.append("image", this.imageFile);

      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/NXB/" + this.NXB.NXB_Ma, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        // alert('Thêm dữ liệu thành công!')
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
      this.dialog4 = true


    },
    setImageFile(event) {
      this.imageFile = event.target.files[0];
    },
  }
});

</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="onSubmit">
      <VRow>
        <VCol cols="12">
          <VFileInput label="Logo" type="file" ref="imageInput" @change="setImageFile" :error-messages="errors.Image" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="NXB.NXB_Ten" :error-messages="errors.Ten" label="Tên Nhà xuất bản"
            placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="NXB.NXB_Email" :error-messages="errors.Email" label="Email"
            placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="NXB.NXB_SDT" :error-messages="errors.SoDienThoai" label="Số điện thoại"
            placeholder="············" />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="DC.DC_DiaChi" :error-messages="errors.DiaChi" label="Địa chỉ" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_PhuongXa" :error-messages="errors.PhuongXa" label="Phường/Xã"
            placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_QuanHuyen" :error-messages="errors.QuanHuyen" label="Quận quyện"
            placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_TinhTP" :error-messages="errors.TinhTP" label="Tỉnh/Thành phố"
            placeholder="············" />
        </VCol>

        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-5" type="Thêm">
            Thêm NXB
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
    <v-dialog v-model="dialog4" class="w-50 h-25">
      <div class="card text-center bg bg-white p-5">
        <h3 class="text-success">Bạn đã thêm nhà xuất bản thành công</h3>
        <div class="row w-100">
          <div class="col-4"></div>
          <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
              @click="dialog4 = false, this.$router.push(`/quanlynxb`)">
              <font-awesome-icon :icon="['fas', 'check']" /> Xác nhận</button></div>
          <div class="col-4"></div>

        </div>
      </div>

  </v-dialog>
</div></template>
