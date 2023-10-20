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
      }
    };
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
            // Thông báo thành công
            alert('Thêm dữ liệu thành công!')
            this.$router.push("/quanlyTheLoai");
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
</template>
