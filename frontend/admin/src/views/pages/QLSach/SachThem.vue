<script>
import DatePicker from "vue3-datepicker";
import { defineComponent } from "vue";
import moment from "moment";
export default defineComponent({
  name: 'SachThem',
  components: {
    DatePicker
  },
  data() {
    return {
      LastID: "",
      NewID: "",
      So: "",
      Chu: "",
      Sach: {
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
    this.GetLastID()
  },
  methods: {
    GetLastID() {
      axios.get(`http://localhost:3000/api/sach/getid/getlastsma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.Sach.S_Ma = this.NewID
        console.log(this.Sach.S_Ma)
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
      let [Text, result] = this.LastID.split("S");
      this.So = result;
      this.Chu = Text1;
    },

    increaseID() {
      // Chuyển đổi chuỗi thành số nguyên
      let so_nguyen = parseInt(this.chuỗi);

      // Tăng giá trị của số nguyên
      so_nguyen += 1;

      // Chuyển đổi số nguyên thành chuỗi
      this.chuỗi = String(so_nguyen);
    },
    addSach() {
      const now = moment();
      this.Sach.S_NgayNhap = now.format("DD-MM-YYYY");
      // Gọi API thêm dữ liệu
      axios.post('http://localhost:3000/api/sach', this.Sach)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            alert('Thêm dữ liệu thành công!')
            this.$router.push("/quanlysach");
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })

    }
  }
});

</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="addSach">
      <VRow>

        <VCol cols="12">
          <VTextField v-model="Sach.S_Ten" label="Tên sách" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_TacGia" label="Tác giả" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_SoLuong" label="Số lượng" type="number" placeholder="············" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_Gia" label="Gia" type="number" placeholder="············" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_TheLoai" label="Thể loại" placeholder="+1 63 456 7890" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="Sach.S_NXB" label="Nhà xuất bản" placeholder="+1 123 456 7890" />
        </VCol>
        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-5" type="Thêm">
            Thêm sách
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>
