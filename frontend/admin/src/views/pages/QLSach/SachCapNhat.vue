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
      },
      dialog9: false,
      TL: [],
      NXB: []
    };
  },
  mounted() {
    let S_Ma = this.$route.params.id
    this.getSach(S_Ma)
    this.GetNXB()
    this.GetTL()
    // Lấy ngày hiện tại

    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    GetTL() {
      axios.get('http://localhost:3000/api/theloai')
        .then((response) => {
          this.TL = response.data;
          console.log(response);
          console.log(this.TL);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    GetNXB() {
      axios.get('http://localhost:3000/api/nxb')
        .then((response) => {
          this.NXB = response.data;
          console.log(response);
          console.log(this.NXB);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
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
        console.log("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
      }).catch(error => {
        console.log(error);
      });
      this.dialog9 = true
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

        <VCol cols="1">
          <label for="" class="h-100 my-3">Thể loại</label>
        </VCol>
        <VCol cols="5">
          <select class="form-control h-100" v-model="Sachs.S_TheLoai">
            <option v-for="gt in TL" :value="gt.TL_Ma">{{ gt.TL_Ten }}</option>
          </select>
        </VCol>
        <!-- <VCol cols="12">
          <VTextField v-model="Sach.S_NXB" label="Nhà xuất bản" placeholder="+1 123 456 7890" />
        </VCol> -->
        <VCol cols="1">
          <label for="" class="h-100 my-3">NXB</label>
        </VCol>
        <VCol cols="5">
          <select class="form-control h-100" v-model="Sachs.S_NXB">
            <option v-for="gt in NXB" :value="gt.NXB_Ma">{{ gt.NXB_Ten }}</option>
          </select>
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
  <v-dialog v-model="dialog9" class="w-50 h-25">
    <div class="card text-center bg bg-white p-5">
      <h2 class="text-center">Cập nhật thông tin sách thành công</h2>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
            @click="        this.$router.push(`/quanlysach`)">
            <font-awesome-icon :icon="['fas', 'circládad']" /> Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
</template>
