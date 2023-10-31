<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerDanhGias" name="" id=""
          aria-describedby="helpId" placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <!-- <VCol cols="1" class="pe-4">
        <RouterLink :to="{ name: 'DanhGiaThem' }">
          <button class="btn btn-outline-primary w-100" style="float: right; right: 0;"><font-awesome-icon :icon="['fas', 'plus']" /></button>
        </RouterLink>
      </VCol> -->
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã đánh giá
          </th>
          <th>
            Người dùng
          </th>
          <th>
            Sách
          </th>
          <th>
            số sao
          </th>
           
          <th>
            Ngày tạo
          </th>
          
          <th>
            Thao Tác
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, i) in filteredDanhGias" :key="DG_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.DG_Ma }}</td>
          <td>{{ getKHName(item.DG_MaKH) }}</td>
          <td>{{ getSachName(item.DG_MaSach) }}</td>
          <td>{{ item.DG_SoSao }} <font-awesome-icon  class="text-warning" :icon="['fas', 'star']" /></td>
          <td>{{ item.DG_NgayTao }}</td>
          <td>
            <v-btn class="dropdown-item btn bg bg-danger text-white mt-1" @click="XoaSach(item.DG_Ma)"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> &nbsp; Xóa</v-btn>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
</template>

<script>
import { defineComponent, vModelRadio } from 'vue';
import { defineAsyncComponent, ref } from 'vue';
import moment from "moment";

// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  data() {
    return {
     
      DanhGias: [],
      Sachs: [],
      NguoiDungs: [],
      NhanViens: [],
      FitlerDanhGias: "",
    };
  },
  computed: {
    filteredDanhGias() {
      return this.DanhGias.filter((item) => {
        return item.DG_Ma.toLowerCase().includes(this.FitlerDanhGias.toLowerCase()) ||
          this.getKHName(item.DG_MaKH).toLowerCase().includes(this.FitlerDanhGias.toLowerCase()) ||
          this.getSachName(item.DG_MaSach).toLowerCase().includes(this.FitlerDanhGias.toLowerCase());
      });
    },
  },
  mounted() {
    this.GetDanhGia();
    this.getNguoiDung();
    this.getNhanVien();
    this.getSach();
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    openDialog() {
      this.GetDanhGiaID(this.DG_MaActive);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    GetDanhGiaID() {
      axios.get('http://localhost:3000/api/DanhGia/' + this.DG_MaActive)
        .then((response) => {
          this.BLActive = response.data;
          console.log(response);
          console.log(this.BLActive);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    ReplyBL(replyid, masach, mand) {
      this.GetLastID()
      const now = moment();
      let data = {
        DG_Ma: this.NewID,
        DG_MaKH: mand,
        DG_MaSach: masach,
        DG_NoiDung: this.NoiDungTraLoi,
        DG_ReplyId: replyid,
        DG_NgayTao: now.format("DD-MM-YYYY"),
        DG_NgayCapNhat: ""
      }
      axios.post('http://localhost:3000/api/DanhGia', data)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            this.NoiDungTraLoi = "";
            this.dialog = false
            alert("Trả lời bình luận thành công")
            this.GetDanhGia()

          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })

    },
    AnBL(id) {
      const now = moment();
      let data = {
          DG_NgayCapNhat: now.format("DD-MM-YYYY"),
          DG_TrangThai: 2
      }
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/DanhGia/capnhattrangthai/" + id, data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(data)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.GetDanhGia();
      }).catch(error => {
        alert(error);
      });
    },
    HienBL(id) {
      const now = moment();
      let data = {
          DG_NgayCapNhat: now.format("DD-MM-YYYY"),
          DG_TrangThai: 1
      }
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/DanhGia/capnhattrangthai/" + id, data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(data)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.GetDanhGia();
      }).catch(error => {
        alert(error);
      });
    },
    GetTrangThai(id){
      switch (id) {
        case 1:
          return "Đang hiển thị";
        case 2:
          return "Đã ẩn";
        default:
          return null;
      }
    },
    GetLastID() {
      axios.get(`http://localhost:3000/api/DanhGia/getid/getlastblma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        console.log(this.Sach.S_Ma)
      })
    },
    Increase() {
      // Chuyển đổi chuoi thành số nguyên
      let SoNguyen = parseInt(this.So);

      // Tăng giá trị của số nguyên
      SoNguyen += 1;

      // Chuyển đổi số nguyên thành chuoi
      this.So = String(SoNguyen).padStart(3, "0");
      this.NewID = this.Chu + this.So;
      console.log(this.NewID)
    },
    TachKBS() {
      let [Text1, result1] = this.LastID.split("0");
      let [Text, result] = this.LastID.split("L");
      this.So = result;
      this.Chu = Text1;
    },
    setActiveDanhGia(data) {
      this.DG_MaActive = data;
      console.log("DG_Ma" + this.DG_MaActive)
    },
    increaseID() {
      // Chuyển đổi chuoi thành số nguyên
      let songuyen = parseInt(this.chuoi);

      // Tăng giá trị của số nguyên
      songuyen += 1;

      // Chuyển đổi số nguyên thành chuoi
      this.chuoi = String(songuyen);
    },
    GetDanhGia() {
      axios.get('http://localhost:3000/api/DanhGia')
        .then((response) => {
          this.DanhGias = response.data;
          console.log(response);
          console.log(this.DanhGias);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    getSach() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/sach`).then(res => {
        this.Sachs = res.data;
        console.log(this.Sachs);
      });
    },
    getNguoiDung() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/thongtinkhachhang`).then(res => {
        this.NguoiDungs = res.data;
        console.log(this.NguoiDungs);
      });
    },
    getNhanVien() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/thongtinnhanvien`).then(res => {
        this.NhanViens = res.data;
        console.log(this.NhanViens);
      });
    },
    getKHName(DG_MaKH) {
      // return this.NguoiDungs.find(item => item.KH_MaKH === DG_MaKH).KH_HoTen;
      let [Text2, result1] = DG_MaKH.split("0");
      switch (Text2) {
        case "KBKH":
          return this.NguoiDungs.find(item => item.KH_MaKH === DG_MaKH).KH_HoTen;
        case "KBNV":
          return this.NhanViens.find(item => item.NV_MaNV === DG_MaKH).NV_HoTen;
        default:
          return null;
      }
    },
    getSachName(DG_MaSach) {
      return this.Sachs.find(item => item.S_Ma === DG_MaSach).S_Ten;
    },
    XoaSach(DG_Ma) {
      axios.delete("http://localhost:3000/api/DanhGia/" + DG_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetDanhGia();
      }).catch(error => {
        alert(error);
      });
    }
  },
});
</script>
