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
      },
      dialog4: false
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
        this.dialog4 = true
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
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
        <v-dialog v-model="dialog4" class="w-50 h-25">
      <div class="card text-center bg bg-white p-5">
        <h3 class="text-success">Bạn đã cập nhật tên thể loại thành công</h3>
        <div class="row w-100">
          <div class="col-4"></div>
          <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
              @click="dialog4 = false,this.$router.push(`/quanlyTheLoai`)">
              <font-awesome-icon :icon="['fas', 'check']" /> Xác nhận</button></div>
          <div class="col-4"></div>

        </div>
      </div>

    </v-dialog>
      </VRow>
    </VForm>
  </div>
</template>
