<script>
import DatePicker from "vue3-datepicker";
import moment from "moment";
export default {
  name: 'SachCapNhat',
  components: {
    DatePicker
  },
  data() {
    return {
      Sachs: {
        S_Ma: "",
        S_Ten: "",
        S_TacGia: "",
        S_SoLuong: "",
        S_Gia: "",
        S_TheLoai: "",
        S_NXB: "",
        S_NgayNhap: "",
        S_NgayCapNhat: ""
      }
    };
  },
  mounted() {
    let S_Ma = this.$route.params.id
    this.getSach(S_Ma)
    // Lấy ngày hiện tại

    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    getSach(S_MaSach) {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/sach/${S_MaSach}`).then(res => {
        this.Sachs = res.data
      })
    },
    updateSach() {
      const now = moment();

      this.Sachs.S_NgayCapNhat = now.format("DD-MM-YYYY");

      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/sach/" + this.Sachs.S_Ma, this.Sachs).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.Sachs)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.$router.push("/quanlysach");
      }).catch(error => {
        alert(error);
      });
    }
  },
};
</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="updateSach">
      <VRow>
        <VCol cols="12">
          <VTextField readonly v-model="Sachs.S_Ma" label="Mã sách" placeholder="John" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sachs.S_Ten" label="Tên sách" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sachs.S_TacGia" label="Tác giả" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sachs.S_SoLuong" label="Số lượng" type="number" placeholder="············" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sachs.S_Gia" label="Gia" type="number" placeholder="············" />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="Sachs.S_TheLoai" label="Thể loại" placeholder="+1 63 456 7890" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="Sachs.S_NXB" label="Nhà xuất bản" placeholder="+1 123 456 7890" />
        </VCol>
        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-3" type="Thêm">
            Cập nhật sách
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
