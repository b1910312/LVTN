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

      LastID1: "",
      NewID1: "",
      So1: "",
      Chu1: "",

      NK: {
        NK_Ma: "",
        NK_MaSach: "",
        NK_MaNV: "",
        NK_Gia: "",
        NK_SoLuong: "",
        NK_NgayNhap: "",
      },
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
      },
      nhanvien: {},
      imageThumbnail: null,
      TL: [],
      NXB: [],
      errors: ref({
        TenSach: "",
        TacGia: "",
        SoLuong: "",
        Gia: "",
        GiaNK: "",
        TheLoai: "",
        NXB: "",
        Image: ""
      }),
      DaDayDu: ref()
    };
  },
  mounted() {
    this.GetLastID()
    this.GetNhanVien()
    this.GetNXB()
    this.GetTL()
  },
  methods: {
    async validateInput() {
      
      this.errors.TenSach = "";
      this.errors.TacGia = "";
      this.errors.SoLuong = "";
      this.errors.Gia = "";
      this.errors.GiaNK = "";
      this.errors.TheLoai = "";
      this.errors.NXB = "";
      this.errors.Image = "";

      if (!this.Sach.S_Ten) {
        this.errors.TenSach = "Vui lòng nhập tên sách";
      }

      if (!this.Sach.S_TacGia) {
        this.errors.TacGia = "Vui lòng nhập tên tác giả";
      } 

      if (!this.Sach.S_SoLuong) {
        this.errors.SoLuong = "Vui lòng nhập số lượng sách";
      } 
      if (!this.Sach.S_Gia) {
        this.errors.Gia = "Vui lòng nhập giá bán của sách";
      } 
      if (!this.Sach.S_SoLuong) {
        this.errors.S_SoLuong = "Vui lòng nhập số lượng sách";
      } 
      if (!this.NK.NK_Gia) {
        this.errors.GiaNK = "Vui lòng nhập giá nhập kho";
      } 
      if (!this.Sach.S_TheLoai) {
        this.errors.TheLoai = "Vui lòng nhập chọn thể loại";
      } 
      if (!this.Sach.S_NXB) {
        this.errors.NXB = "Vui lòng nhập chọn nhà xuất bản";
      } 
      if (!this.imageThumbnail) {
        this.errors.Image = "Vui lòng chọn ảnh";
      } 
      this.DaDayDu = !Object.values(this.errors).some((error) => error);
    },
    async onSubmit() {
      this.validateInput()
      console.log(this.DaDayDu)
      if(this.DaDayDu == true) {
        this.addSach()
      }
    },
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
    GetNhanVien() {
      const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"));
      this.nhanvien = nhanvienchitiet;
    },
    GetLastID() {
      axios.get(`http://localhost:3000/api/sach/getid/getlastsma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        this.Sach.S_Ma = this.NewID
        console.log(this.Sach.S_Ma)
      })
      axios.get(`http://localhost:3000/api/sach/NhapKho/getid/getlastnkma`).then(res => {
        this.LastID1 = res.data
        this.TachKBS()
        this.Increase()
        this.NK.NK_Ma = this.NewID1
        console.log("newid" + this.NK.NK_Ma)
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

      let SoNguyen1 = parseInt(this.So1);

      // Tăng giá trị của số nguyên
      SoNguyen1 += 1;

      // Chuyển đổi số nguyên thành chuỗi
      this.So1 = String(SoNguyen1).padStart(3, "0");
      this.NewID1 = this.Chu1 + this.So1;
      console.log(this.NewID1)
    },
    TachKBS() {
      let [Text1, result1] = this.LastID.split("0");
      let [Text, result] = this.LastID.split("S");
      this.So = result;
      this.Chu = Text1;

      let [Text3, result3] = this.LastID1.split("0");
      let [Text2, result2] = this.LastID1.split("NK");
      this.So1 = result2;
      this.Chu1 = Text3;
    },

    increaseID() {
      // Chuyển đổi chuỗi thành số nguyên
      let so_nguyen = parseInt(this.chuỗi);

      // Tăng giá trị của số nguyên
      so_nguyen += 1;

      // Chuyển đổi số nguyên thành chuỗi
      this.chuỗi = String(so_nguyen);
    },
    async addSach() {
      const now = moment();
      this.Sach.S_NgayNhap = now.format("DD-MM-YYYY");
      // Gọi API thêm dữ liệu
      axios.post('http://localhost:3000/api/sach', this.Sach)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            console.log("Thêm sách thành công")
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })
      axios.post(`http://localhost:5000/add_product`, this.Sach)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            console.log("Lưu sách vào csv thành công")
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log("Lưu sách vào csv không thành công")
          console.log(error)
        })
      this.NK.NK_MaSach = this.Sach.S_Ma
      this.NK.NK_MaNV = this.nhanvien.TKNV_MaNV
      this.NK.NK_NgayNhap = now.format("DD-MM-YYYY");
      this.NK.NK_SoLuong = this.Sach.S_SoLuong;
      //Gọi API để cập nhật sản phẩm
      axios.post("http://localhost:3000/api/sach/nhapkho/", this.NK).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("NHAPKHO")
        console.log(this.NK)
     
      }).catch(error => {
        alert(error);
      });
      const formData = new FormData();
      // formData.delete("images")
      formData.append("image", this.imageThumbnail);
      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/TB/" + this.Sach.S_Ma, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
    
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
               // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
               this.$router.push("/quanlysach");
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
      // this.LuuHMM(1,this.imageFile1)
      // this.LuuHMM(2,this.imageFile2)
      // this.LuuHMM(3,this.imageFile3)

    },
    setImageThumbNail(event) {
      this.imageThumbnail = event.target.files[0];
    },
   
  }

});

</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="onSubmit">
      <VRow>
        <VCol cols="12">
          <VTextField v-model="Sach.S_Ma" readonly label="Mã sách" placeholder="johndoe@example.com" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="Sach.S_Ten" :error-messages="errors.TenSach" label="Tên sách" placeholder="johndoe@example.com" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_TacGia" :error-messages="errors.TacGia"  label="Tác giả" placeholder="+1 123 456 7890" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_SoLuong" :error-messages="errors.SoLuong"  label="Số lượng" type="number" placeholder="············" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="Sach.S_Gia" :error-messages="errors.Gia"  label="Giá" type="number" placeholder="············" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="NK.NK_Gia" :error-messages="errors.GiaNK"  label="Giá nhập kho" type="number" placeholder="············" />
        </VCol>

        <!-- <VCol cols="12">
          <VTextField v-model="Sach.S_TheLoai" label="Thể loại" placeholder="+1 63 456 7890" />
          
        </VCol> -->
        <VCol cols="1">
          <label for="" class="h-100 my-3" >Thể loại</label>
        </VCol>
        <VCol cols="5">
          <select class="form-control h-100" v-model="Sach.S_TheLoai" >
            <option v-for="gt in TL" :value="gt.TL_Ma">{{ gt.TL_Ten }}</option>
          </select>
          <small><p class="text-danger text-center">{{ errors.TheLoai }}</p></small>
        </VCol>
        <!-- <VCol cols="12">
          <VTextField v-model="Sach.S_NXB" label="Nhà xuất bản" placeholder="+1 123 456 7890" />
        </VCol> -->
        <VCol cols="1">
          <label for="" class="h-100 my-3">NXB</label>
        </VCol>
        <VCol cols="5">
          <select class="form-control h-100" v-model="Sach.S_NXB">
            <option v-for="gt in NXB" :value="gt.NXB_Ma">{{ gt.NXB_Ten }}</option>
          </select>
          <small><p class="text-danger text-center">{{ errors.NXB }}</p></small>

        </VCol>
        <VCol cols="12">
          <VFileInput label="ThumbNail Sách" type="file" accept="image/jpeg, image/png" ref="imageInput"  :error-messages="errors.Image"  @change="setImageThumbNail" />
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
