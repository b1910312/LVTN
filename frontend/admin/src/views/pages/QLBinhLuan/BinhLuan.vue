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
      <tbody refs="BinhLuans">

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
                        <button class="btn btn-success text-white mx-1 my-2" @click="BLTraloi()">Trả lời</button>
                        <button class="btn btn-danger text-white mx-1 my-2" @click="dialog = false">Đóng</button>
                      </VCol>
                    </VRow>
                  </v-card>
                </v-dialog>

                <v-btn v-if="item.BL_TrangThai == 1" class="dropdown-item btn bg bg-secondary text-white mt-1"
                  @click="AnBL(item.BL_Ma)"> <font-awesome-icon :icon="['fas', 'trash']" /> &nbsp; Ẩn</v-btn>
                <v-btn v-if="item.BL_TrangThai == 2" class="dropdown-item btn bg bg-info text-white mt-1"
                  @click="HienBL(item.BL_Ma)"> <font-awesome-icon :icon="['fas', 'trash']" /> &nbsp; hiển thị</v-btn>
                <v-btn class="dropdown-item btn bg bg-danger text-white mt-1" @click="dialog3 = true">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</v-btn>
                <v-dialog v-model="dialog3" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa bình luận</h2>
                    <p class="mt-3">Bình luận sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa bình luận này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(BL_MaActive)">
                          <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog3 = false">
                          <font-awesome-icon :icon="['fas', 'xmark']" /> Hủy</button></div>
                      <div class="col-2"></div>

                    </div>
                  </div>

                </v-dialog>
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
      dialog3: false,
      BLUpdate: {
        BL_MaKH: "",
        BL_MaSach: "",
        BL_NoiDung: "",
        BL_ReplyId: "",
        BL_NgayTao: "",
        BL_NgayCapNhat: ""
      },
      BLReply: {
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
    this.GetLastID()
    this.GetBinhLuan();
    this.getNguoiDung();
    this.getNhanVien();
    this.getSach();
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    BLTraloi() {
      const now = moment();
      this.BLReply.BL_Ma = this.NewID
      this.BLReply.BL_MaKH = "KBNV001"
      this.BLReply.BL_MaSach = this.BLActive.BL_MaSach
      this.BLReply.BL_NoiDung = this.NoiDungTraLoi
      this.BLReply.BL_ReplyId = this.BLActive.BL_Ma
      this.BLReply.BL_NgayTao = now.format("DD-MM-YYYY"),
        this.BLReply.BL_NgayCapNhat = ""
      console.log(this.BLReply)
      this.ReplyBL()
    },
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
    ReplyBL() {
      axios.post('http://localhost:3000/api/binhluan', this.BLReply)
        .then((response) => {
          // Nếu API trả về thành công
          if (response.status === 200) {
            // Thông báo thành công

            this.GetBinhLuan()

          }
        })
        .catch((error) => {
          // Nếu API trả về lỗi
          console.log(error)
        })
      this.NoiDungTraLoi = "";
      this.dialog = false

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
    GetTrangThai(id) {
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
        console.log(this.LastID)
        console.log("ID NEW" + this.NewID)
        console.log(this.So)
        console.log(this.Chu)
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
    setActiveBinhLuan(data) {
      this.BL_MaActive = data;
      console.log("BL_Ma" + this.BL_MaActive)
    },
    increaseID() {
      // Chuyển đổi chuoi thành số nguyên
      let songuyen = parseInt(this.chuoi);

      // Tăng giá trị của số nguyên
      songuyen += 1;

      // Chuyển đổi số nguyên thành chuoi
      this.chuoi = String(songuyen);
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
        // Sau đó, chuyển hướng người dùng
        this.GetBinhLuan();
      }).catch(error => {
        alert(error);
      });
      this.dialog3 = false
    }
  },
});
</script>
