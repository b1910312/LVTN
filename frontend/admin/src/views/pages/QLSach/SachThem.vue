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
      imageFile: null,
      imageFile1: null,
      imageFile2: null,
      imageFile3: null,

      imageThumbnail: null,
      TL: [],
      NXB: []
    };
  },
  mounted() {
    this.GetLastID()
    this.GetNhanVien()
    this.GetNXB()
    this.GetTL()
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
            this.$router.push("/quanlysach");
          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
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
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.$router.push("/quanlysach");
      }).catch(error => {
        alert(error);
      });
      const formData = new FormData();
      // formData.append("images", this.imageFile);
      // try {
      //   const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/sach/HMH/" + this.Sach.S_Ma + "/1", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   });
      //   alert('Thêm dữ liệu thành công!')
      //   console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      // } catch (error) {
      //   alert('LỖI!')

      //   console.error("Lỗi khi tải lên tệp ảnh:", error);
      // }
      this.LuuHMM(formData, 1, this.imageFile)
      this.LuuHMM(formData, 2, this.imageFile1)
      this.LuuHMM(formData, 3, this.imageFile2)
      this.LuuHMM(formData, 4, this.imageFile3)
      // formData.delete("images")
      formData.append("image", this.imageThumbnail);
      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/TB/" + this.Sach.S_Ma, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert('Thêm dữ liệu thành công!')
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
      // this.LuuHMM(1,this.imageFile1)
      // this.LuuHMM(2,this.imageFile2)
      // this.LuuHMM(3,this.imageFile3)

    },
    async LuuHMM(form, STT, File) {
      form.append("images", File);
      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/sach/HMH/" + this.Sach.S_Ma + "/" + STT, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert('Thêm dữ liệu thành công!')
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        alert('LỖI!')

        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
    },
    setImageThumbNail(event) {
      this.imageThumbnail = event.target.files[0];
    },
    setImageHMH(event) {
      this.imageFile = event.target.files[0];
    },
    setImageHMH1(event) {
      this.imageFile1 = event.target.files[0];
    },
    setImageHMH2(event) {
      this.imageFile2 = event.target.files[0];
    },
    setImageHMH3(event) {
      this.imageFile3 = event.target.files[0];
    },
  }

});

</script>

<template>
  <div class="m-1 mx-3 ">
    <VForm @submit.prevent="addSach">
      <VRow>
        <VCol cols="12">
          <VTextField v-model="Sach.S_Ma" readonly label="Mã sách" placeholder="johndoe@example.com" />
        </VCol>
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
          <VTextField v-model="Sach.S_Gia" label="Giá" type="number" placeholder="············" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="NK.NK_Gia" label="Giá nhập kho" type="number" placeholder="············" />
        </VCol>

        <!-- <VCol cols="12">
          <VTextField v-model="Sach.S_TheLoai" label="Thể loại" placeholder="+1 63 456 7890" />
          
        </VCol> -->
        <VCol cols="1">
            <label for="" class="h-100 my-3">Thể loại</label>
          </VCol>
          <VCol cols="5">
            <select class="form-control h-100" v-model="Sach.S_TheLoai">
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
            <select class="form-control h-100" v-model="Sach.S_NXB">
              <option v-for="gt in NXB" :value="gt.NXB_Ma">{{ gt.NXB_Ten }}</option>
            </select>
          </VCol>
        <VCol cols="12">
          <VFileInput label="ThumbNail Sách" type="file" ref="imageInput" @change="setImageThumbNail" />
        </VCol>
        <VCol cols="12">
          <VFileInput label="Hình minh họa" type="file" ref="imageInput1" @change="setImageHMH" />
        </VCol>
        <VCol cols="12">
          <VFileInput label="Hình minh họa" type="file" ref="imageInput2" @change="setImageHMH1" />
        </VCol>
        <VCol cols="12">
          <VFileInput label="Hình minh họa" type="file" ref="imageInput3" @change="setImageHMH2" />
        </VCol>
        <VCol cols="12">
          <VFileInput label="Hình minh họa" type="file" ref="imageInput4" @change="setImageHMH3" />
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
