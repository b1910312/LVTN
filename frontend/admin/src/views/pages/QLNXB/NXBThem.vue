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
      }
    };
  },
  mounted() {
    this.GetLastID()
  },
  methods: {
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
        alert('Thêm dữ liệu thành công!')
        this.$router.push("/quanlynxb");
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
    <VForm @submit.prevent="addNXB">
      <VRow>
        <VCol cols="12">
          <VFileInput label="Logo" type="file" ref="imageInput" @change="setImageFile" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="NXB.NXB_Ten" label="Tên Nhà xuất bản" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="NXB.NXB_Email" label="Email" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="NXB.NXB_SDT" label="Số điện thoại" placeholder="············" />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="DC.DC_DiaChi" label="Địa chỉ" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_PhuongXa" label="Phường/Xã" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_QuanHuyen" label="Quận quyện" placeholder="············" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="DC.DC_TinhTP" label="Tỉnh/Thành phố" placeholder="············" />
        </VCol>

        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-5" type="Thêm">
            Thêm NXB
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
