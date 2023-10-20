<script>
import DatePicker from "vue3-datepicker";
import moment from "moment";
export default {
  name: 'TheLoaiCapNhat',
  components: {
    DatePicker
  },
  data() {
    return {
      TheLoais: {
        TL_Ma: "",
        TL_Ten: "",
        TL_NgayTao: "",
        TL_NgayCapNhat: ""
      }
    };
  },
  mounted() {
    let TL_Ma = this.$route.params.id
    this.getTheLoai(TL_Ma)
    // Lấy ngày hiện tại

    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    getTheLoai(TL_MaTheLoai) {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/TheLoai/${TL_MaTheLoai}`).then(res => {
        this.TheLoais = res.data
      })
    },
    updateTheLoai() {
      const now = moment();

      this.TheLoais.TL_NgayCapNhat = now.format("DD-MM-YYYY");

      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/TheLoai/" + this.TheLoais.TL_Ma, this.TheLoais).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(this.TheLoais)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.$router.push("/quanlyTheLoai");
      }).catch(error => {
        alert(error);
      });
    }
  },
};
</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="updateTheLoai">
      <VRow>
        <VCol cols="12">
          <VTextField readonly v-model="TheLoais.TL_Ma" label="Mã sách" placeholder="John" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="TheLoais.TL_Ten" label="Tên sách" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-3" type="Thêm">
            Cập nhật Thể loại
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
