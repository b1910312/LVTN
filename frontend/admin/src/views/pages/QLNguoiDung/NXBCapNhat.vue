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
      }
    };
  },
  mounted() {
    let NXB_Ma = this.$route.params.id
    this.getNXB(NXB_Ma)
    // Lấy ngày hiện tại

    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    getNXB(NXB_MaNXB) {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/NXB/${NXB_MaNXB}`).then(res => {
        this.NXBs = res.data
      })
    },
    updateNXB() {
      const now = moment();

      this.NXBs.NXB_NgayCapNhat = now.format("DD-MM-YYYY");

      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/NXB/" + this.NXBs.NXB_Ma, this.NXBs).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.NXBs)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.$router.push("/quanlyNXB");
      }).catch(error => {
        alert(error);
      });
    }
  },
};
</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="updateNXB">
      <VRow>
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
        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-3" type="Thêm">
            Cập nhật NXB
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
