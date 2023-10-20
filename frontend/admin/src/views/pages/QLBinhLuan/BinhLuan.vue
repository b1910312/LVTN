<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerBinhLuans" name="" id=""
          aria-describedby="helpId" placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <!-- <VCol cols="1" class="pe-4">
        <RouterLink :to="{ name: 'BinhLuanThem' }">
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
            Mã bình luận
          </th>
          <th>
            Người dùng
          </th>
          <th>
            Sách
          </th>
          <th>
            Nội dung
          </th>
          <th>
            Trạng Thái
          </th>
          
          <th>
            Reply_ID
          </th>
           
          <th>
            Ngày tạo
          </th>
          <th>
            Ngày cập nhật
          </th>
          <th>
            Thao Tác
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, i) in filteredBinhLuans" :key="BL_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.BL_Ma }}</td>
          <td>{{ getKHName(item.BL_MaKH) }}</td>
          <td>{{ getSachName(item.BL_MaSach) }}</td>
          <td>{{ item.BL_NoiDung }}</td>
          <td>{{ GetTrangThai(item.BL_TrangThai) }}</td>
          <td>{{ item.BL_ReplyId }}</td>
          <td>{{ item.BL_NgayTao }}</td>
          <td>{{ item.BL_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true" @click="setActiveBinhLuan(item.BL_Ma)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <v-btn class="dropdown-item btn bg bg-success text-white" @click="openDialog"><font-awesome-icon
                    :icon="['fas', 'reply']" /> &nbsp; Trả lời</v-btn>
                <v-dialog v-model="dialog" class="w-50">
                  <v-card>
                    <v-card-title>Trả lời bình luận mã số {{ BLActive.BL_Ma }}</v-card-title>
                    <v-card-text>
                      <div class="mb-3">
                        <label for="" class="form-label">Nội dung bình luận</label>
                        <Textarea type="text" name="" id="" class="form-control" placeholder="" readonly
                          aria-describedby="helpId">{{ BLActive.BL_NoiDung }}</Textarea>
                      </div>
                      <div class="mb-3">
                        <label for="" class="form-label">Nội dung trả lời</label>
                        <textarea v-model="NoiDungTraLoi" type="text" name="" id="" class="form-control" placeholder=""
                          rows="4" aria-describedby="helpId"> </textarea>
                      </div>
                    </v-card-text>
                    <VRow>
                      <VCol cols="9"></VCol>
                      <VCol cols="3">
                        <button class="btn btn-success text-white mx-1 my-2"
                          @click="ReplyBL(BLActive.BL_Ma, BLActive.BL_MaSach, 'KBKH001')">Trả lời</button>
                        <button class="btn btn-danger text-white mx-1 my-2" @click="dialog = false">Đóng</button>
                      </VCol>
                    </VRow>
                  </v-card>
                </v-dialog>

                <v-btn v-if="item.BL_TrangThai == 1" class="dropdown-item btn bg bg-secondary text-white mt-1" @click="AnBL(item.BL_Ma)"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> &nbsp; Ẩn</v-btn>
                    <v-btn v-if="item.BL_TrangThai == 2" class="dropdown-item btn bg bg-info text-white mt-1" @click="HienBL(item.BL_Ma)"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> &nbsp; hiển thị</v-btn>
                <v-btn class="dropdown-item btn bg bg-danger text-white mt-1" @click="XoaSach(item.BL_Ma)"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> &nbsp; Xóa</v-btn>
              </div>
            </div>
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
      LastID: "",
      NewID: "",
      So: "",
      Chu: "",
      NoiDungTraLoi: "",
      BinhLuans: [],
      Sachs: [],
      NguoiDungs: [],
      NhanViens: [],
      dialog: false,
      FitlerBinhLuans: "",
      BL_MaActive: "",
      BLActive: "",
      BLUpdate: {
        BL_MaKH: "",
        BL_MaSach: "",
        BL_NoiDung: "",
        BL_ReplyId: "",
        BL_NgayTao: "",
        BL_NgayCapNhat: ""
      }
    };
  },
  computed: {
    filteredBinhLuans() {
      return this.BinhLuans.filter((item) => {
        return item.BL_Ma.toLowerCase().includes(this.FitlerBinhLuans.toLowerCase()) ||
          this.getKHName(item.BL_MaKH).toLowerCase().includes(this.FitlerBinhLuans.toLowerCase()) ||
          this.getSachName(item.BL_MaSach).toLowerCase().includes(this.FitlerBinhLuans.toLowerCase());
      });
    },
  },
  mounted() {
    this.GetBinhLuan();
    this.getNguoiDung();
    this.getNhanVien();
    this.getSach();
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    openDialog() {
      this.GetBinhLuanID(this.BL_MaActive);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    GetBinhLuanID() {
      axios.get('http://localhost:3000/api/binhluan/' + this.BL_MaActive)
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
        BL_Ma: this.NewID,
        BL_MaKH: mand,
        BL_MaSach: masach,
        BL_NoiDung: this.NoiDungTraLoi,
        BL_ReplyId: replyid,
        BL_NgayTao: now.format("DD-MM-YYYY"),
        BL_NgayCapNhat: ""
      }
      axios.post('http://localhost:3000/api/binhluan', data)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công
            this.NoiDungTraLoi = "";
            this.dialog = false
            alert("Trả lời bình luận thành công")
            this.GetBinhLuan()

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
          BL_NgayCapNhat: now.format("DD-MM-YYYY"),
          BL_TrangThai: 2
      }
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/binhluan/capnhattrangthai/" + id, data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(data)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.GetBinhLuan();
      }).catch(error => {
        alert(error);
      });
    },
    HienBL(id) {
      const now = moment();
      let data = {
          BL_NgayCapNhat: now.format("DD-MM-YYYY"),
          BL_TrangThai: 1
      }
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/binhluan/capnhattrangthai/" + id, data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(data)
        alert("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.GetBinhLuan();
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
      axios.get(`http://localhost:3000/api/binhluan/getid/getlastblma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
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
      let [Text, result] = this.LastID.split("L");
      this.So = result;
      this.Chu = Text1;
    },
    setActiveBinhLuan(data) {
      this.BL_MaActive = data;
      console.log("BL_Ma" + this.BL_MaActive)
    },
    increaseID() {
      // Chuyển đổi chuỗi thành số nguyên
      const số_nguyên = parseInt(this.chuỗi);

      // Tăng giá trị của số nguyên
      số_nguyên += 1;

      // Chuyển đổi số nguyên thành chuỗi
      this.chuỗi = String(số_nguyên);
    },
    GetBinhLuan() {
      axios.get('http://localhost:3000/api/binhluan')
        .then((response) => {
          this.BinhLuans = response.data;
          console.log(response);
          console.log(this.BinhLuans);
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
    getKHName(BL_MaKH) {
      // return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;
      let [Text2, result1] = BL_MaKH.split("0");
      switch (Text2) {
        case "KBKH":
          return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;
        case "KBNV":
          return this.NhanViens.find(item => item.NV_MaNV === BL_MaKH).NV_HoTen;
        default:
          return null;
      }
    },
    getSachName(BL_MaSach) {
      return this.Sachs.find(item => item.S_Ma === BL_MaSach).S_Ten;
    },
    XoaSach(BL_Ma) {
      axios.delete("http://localhost:3000/api/BinhLuan/" + BL_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetBinhLuan();
      }).catch(error => {
        alert(error);
      });
    }
  },
});
</script>
