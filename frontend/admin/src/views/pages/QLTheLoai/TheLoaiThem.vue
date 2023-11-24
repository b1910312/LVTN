<script>
import DatePicker from "vue3-datepicker";
import { defineComponent } from "vue";
import moment from "moment";
export default defineComponent({
  name: 'TheLoaiThem',
  components: {
    DatePicker
  },
  data() {
    return {
      LastID: "",
      NewID: "",
      So: "",
      Chu: "",
      TheLoai: {
        TL_Ma: "",
        TL_Ten: "",
        TL_NgayTao: "",
        TL_NgayCapNhat: ""
      },
      dialog4: false
    };
  },
  created() {
    const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"))
    if (nhanvienchitiet.TKNV_VaiTro != "KBVT003") {
      this.dialog6 = true
    }
  },
  mounted() {
    this.GetLastID()
  },
  methods: {
    GetLastID() {
      axios.get(`http://localhost:3000/api/TheLoai/getid/getlastTheLoaima`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.TheLoai.TL_Ma = this.NewID
        console.log(this.TheLoai.TL_Ma)
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
      let [Text, result] = this.LastID.split("L");
      this.So = result;
      console.log(result);
      this.Chu = Text1;
      console.log(Text1);
    },
    addTheLoai() {
      const now = moment();
      this.TheLoai.TL_NgayTao = now.format("DD-MM-YYYY");
      // Gọi API thêm dữ liệu
      axios.post('http://localhost:3000/api/TheLoai', this.TheLoai)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công')
            this.dialog4 = true
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
    <VForm @submit.prevent="addTheLoai">
      <VRow>

        <VCol cols="12">
          <VTextField v-model="TheLoai.TL_Ten" label="Tên Thể loại" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="10"></VCol>
        <VCol cols="2" class="d-flex gap-4">
          <VBtn class="ms-5" type="Thêm">
            Thêm Thể Loại
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
  <v-dialog v-model="dialog4" class="w-50 h-25">
    <div class="card text-center bg bg-white p-5">
      <h3 class="text-success">Bạn đã thêm thể loại thành công</h3>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
            @click="dialog4 = false, this.$router.push(`/quanlyTheLoai`)">
            <font-awesome-icon :icon="['fas', 'check']" /> Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
  <v-dialog v-model="dialog6" class="w-75 h-75">
    <div class="card text-center bg bg-white p-5">
      <h2>Bạn không có quyền truy cập vào trang này!!</h2>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
            @click="this.$router.push(`/`)">
            <font-awesome-icon :icon="['fas', '213-291']" />Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
</template>
