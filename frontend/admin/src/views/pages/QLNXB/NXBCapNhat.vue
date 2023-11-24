<script>
import DatePicker from "vue3-datepicker";
import moment from "moment";
export default {
  name: 'NXBCapNhat',
  components: {
    DatePicker
  },
  data() {
    return {
      NXBs: {
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
      dialog5: false
    };
  },
  mounted() {
    let NXB_Ma = this.$route.params.id
    this.getNXB(NXB_Ma)
    this.GetDiaChi(NXB_Ma)
    // Lấy ngày hiện tại

    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    cancel() {
      this.dialog4 = false
    },
    async UpdateLogo() {
      const formData = new FormData();
      formData.append("image", this.imageFile);

      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/NXB/" + this.NXBs.NXB_Ma, formData, {
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
    getNXB(NXB_MaNXB) {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/NXB/${NXB_MaNXB}`).then(res => {
        this.NXBs = res.data
      })
    },
    GetLogo(NXB_Ma) {
      const logo = "http://localhost:3000/api/thumbnail/image/NXB/" + NXB_Ma
      return logo;
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
    updateNXB() {
      const now = moment();

      this.NXBs.NXB_NgayCapNhat = now.format("DD-MM-YYYY");

      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/NXB/" + this.NXBs.NXB_Ma, this.NXBs).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.NXBs)
        // alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
         console.log(error)
        // alert(error);
      });
      axios.put("http://localhost:3000/api/diachi/" + this.DC.DC_MaDT, this.DC).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.DC)
        // alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
         console.log(error)
        // alert(error);
      });
      this.dialog5 = true
    }
  },
};
</script>

<template>
  <div class="m-1 mx-3 ">
    <VRow>

      <h6 class="ms-3"> Logo&nbsp;&nbsp; <button @click="dialog4 = true"
          class="btn btn-outline-success"><font-awesome-icon :icon="['fas', 'pen']" /></button>
      </h6>
      <v-dialog v-model="dialog4">
        <div class="card w-75 mx-auto text-start bg bg-white p-5">
          <div class="col-11">
            <h4>Cập nhật logo nhà xuất bản: {{ NXBs.NXB_Ten }}</h4>
          </div>

          <VCol cols="12">
            <VForm @submit.prevent="UpdateLogo">
              <VFileInput label="Logo" type="file" ref="imageInput" @change="setImageFile" />
              <div class="row w-100 mt-2">
                <div class="col-8"></div>
                <div class="d-flex gap-4 col-2">
                  <VBtn class="ms-5" type="Thêm">
                    Cập nhật
                  </VBtn>
                </div>
                <div class="d-flex gap-4 col-1">
                  <VBtn class="ms-5 bg bg-secondary" @click="cancel()">
                    Hủy
                  </VBtn>
                </div>
              </div>
            </VForm>
          </VCol>
        </div>

      </v-dialog>
      <img style="max-width: 300px;" :src="GetLogo(NXBs.NXB_Ma)" class="img-fluid mt-2 mx-auto mb-4" alt="" srcset="">

      <VCol cols="12">
        <VTextField readonly v-model="NXBs.NXB_Ma" label="Mã sách" placeholder="John" />
      </VCol>

      <VCol cols="12">
        <VTextField v-model="NXBs.NXB_Ten" label="Tên sách" placeholder="johndoe@example.com" />
      </VCol>

      <VCol cols="12">
        <VTextField v-model="NXBs.NXB_Email" label="Tác giả" placeholder="+1 123 456 7890" />
      </VCol>

      <VCol cols="12">
        <VTextField v-model="NXBs.NXB_SDT" label="Số lượng" type="number" placeholder="············" />
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
        <VBtn class="ms-3" @click="updateNXB()">
          Cập nhật NXB
        </VBtn>
      </VCol>
    </VRow>
    <v-dialog v-model="dialog5" class="w-50 h-25">
      <div class="card text-center bg bg-white p-5">
        <h2 class="text-success">Bạn đã cập nhật thông tin nhà xuất bản thành công</h2>
        <div class="row w-100">
          <div class="col-4"></div>
          <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
              @click="dialog5 = false, this.$router.push(`/quanlynxb`)">
              <font-awesome-icon :icon="['fas', 'check']" /> Xác nhận</button></div>
          <div class="col-4"></div>

        </div>
      </div>

    </v-dialog>
  </div>
</template>
