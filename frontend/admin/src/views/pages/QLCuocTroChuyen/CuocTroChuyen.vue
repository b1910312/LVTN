<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerCTCs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <button class="btn btn-outline-primary w-100" @click="openDialog()"
          style="float: right; right: 0;"><font-awesome-icon :icon="['fas', 'plus']" /></button>
        <v-dialog v-model="dialog1" class="w-50">
          <v-card height="240">
            <VRow>
              <VCol cols="9" class="d-flex">
                <button class="btn text-danger mx-1" @click="dialog1 = false">
                  <h2><font-awesome-icon :icon="['fas', 'square-minus']" /></h2>
                </button>
                <v-card-title>
                  <h2 class="mt-2">Thêm cuộc trò chuyện</h2>
                </v-card-title>
              </VCol>
              <v-card-text style="padding: 0 1.5rem;">
                <VRow>
                  <VCol cols="12">
                    <VTextField v-model="CTC_MAKH" prepend-inner-icon="bx-user" label="Mã khách hàng"
                      placeholder="KBKH***" />
                  </VCol>

                  <VCol cols="12">
                    <VBtn @click="addCTC()" class="me-2 float-end btn btn-primary">
                      Tạo cuộc trò chuyện
                    </VBtn>

                  </VCol>
                </VRow>
              </v-card-text>

            </VRow>
          </v-card>
        </v-dialog>
      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Cuộc trò chuyện
          </th>
          <th>
            Khách hàng
          </th>
          <th>
            Nhân viên
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
      <tbody ref="CTCs">

        <tr v-for="(item, i) in filteredCTCs" :key="CTC_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.CTC_Ma }}</td>
          <td>{{ getKHName(item.CTC_MaKH) }} <br>({{ item.CTC_MaKH }})</td>
          <td>{{ getKHName(item.CTC_MaNV) }} <br>({{ item.CTC_MaNV }})</td>
          <td>{{ item.CTC_NgayTao }}</td>
          <td>{{ item.CTC_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="setActiveCTC(item.CTC_Ma, item.CTC_MaKH)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <button @click="dialog = true" class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon
                    :icon="['fas', 'eye']" /> Xem</button>
                <v-dialog v-model="dialog" class="w-75">
                  <!-- <v-card height="800">
                    <VRow>
                      <VCol cols="9" class="d-flex">
                        <button class="btn  text-danger mx-1 my-2" @click="dialog = false">
                          <h2 class="mt-2"><font-awesome-icon :icon="['fas', 'square-minus']" /></h2>
                        </button>
                        <v-card-title>
                          <h2 class="mt-3">{{ getKHName(CTC_MaKHActive) }}</h2>
                        </v-card-title>
                      </VCol>
                      <v-card-text style="padding: 0 1.5rem;">
                       
                      </v-card-text>

                    </VRow>
                  </v-card> -->
                  <div class="card text-start" style="height: 700px;">
                    <Chatbox :CTC_Ma="CTC_MaActive" :name="getKHName(CTC_MaKHActive)"></Chatbox>
                  </div>
                </v-dialog>
                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog3 = true">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog3" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa cuộc trò chuyện</h2>
                    <p class="mt-3">Toàn bộ tin nhắn của cuộc trò chuyện sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa cuộc trò chuyện này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(CTC_MaActive)">
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
import { defineComponent } from 'vue';
import { defineAsyncComponent, ref } from 'vue';
import Chatbox from "./Chatbox.vue"
import moment from "moment";

// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  components: {
    Chatbox
  },
  data() {
    return {
      flag: false,
      CTCs: [],
      FitlerCTCs: "",
      NguoiDungs: [],
      NhanViens: [],
      dialog: false,
      dialog1: false,
      dialog3: false,
      LastID: "",
      NewID: "",
      So: "",
      Chu: "",
      CTC_MAKH: [],
      CTC_MANV: "KBNV001",
      CTC_MaActive: "",
      CTC_MaKHActive: "",
      messages: [],
    }

  },
  computed: {
    filteredCTCs() {
      return this.CTCs.filter((item) => {
        return item.CTC_Ma.toLowerCase().includes(this.FitlerCTCs.toLowerCase()) ||
          this.getKHName(item.CTC_MaKH).toLowerCase().includes(this.FitlerCTCs.toLowerCase()) ||
          this.getKHName(item.CTC_MaNV).toLowerCase().includes(this.FitlerCTCs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetLastID();
    this.getNguoiDung()
    this.getNhanVien()
    this.GetCTC()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    stop() {
      this.flag = false
    },
    openDialog() {
      this.GetCTC()
      this.dialog1 = true;
    },
    getMessages(CTC_Ma2) {
      axios.get('http://localhost:3000/api/tinnhan/getTN/' + CTC_Ma2)
        .then((response) => {
          this.messages = response.data;
          console.log(response);
          console.log(this.messages);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      // ...
      console.log(this.messages)
    },
    setActiveCTC(data, data2) {
      this.CTC_MaActive = data;
      this.CTC_MaKHActive = data2;
      console.log(this.CTC_MaActive)
      console.log("MAKHH" + this.CTC_MaKHActive)

    },
    GetLastID() {
      axios.get(`http://localhost:3000/api/CuocTroChuyen/getid/getlastctcma`).then(res => {
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
      let [Text, result] = this.LastID.split("TC");
      this.So = result;
      this.Chu = Text1;
    },
    addCTC() {
      this.GetLastID()
      console.log("NEWID: " + this.NewID)
      const now = moment();
      const data = {
        CTC_Ma: this.NewID,
        CTC_MaKH: this.CTC_MAKH,
        CTC_MaNV: "KBNV001",
        CTC_NgayTao: now.format("DD-MM-YYYY"),
      }
      console.log(data)
      axios.post("http://localhost:3000/api/CuocTroChuyen", data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng
        this.dialog1 = false
        this.GetCTC()
      }).catch(error => {
        alert(error);
      });
      this.CTC_MAKH = "";
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
    getKHName(CTC_MaKH) {
      // return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;
      let [Text2, result1] = CTC_MaKH.split("0");
      switch (Text2) {
        case "KBKH":
          return this.NguoiDungs.find(item => item.KH_MaKH === CTC_MaKH).KH_HoTen;
        case "KBNV":
          return this.NhanViens.find(item => item.NV_MaNV === CTC_MaKH).NV_HoTen;
        default:
          return null;
      }
    },
    GetCTC() {
      this.flag = false
      axios.get('http://localhost:3000/api/cuoctrochuyen')
        .then((response) => {
          this.CTCs = response.data;
          console.log(response);
          console.log(this.CTCs);

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
      this.GetLastID()

    },
    XoaSach(CTC_Ma) {
      console.log("DAY NE" + CTC_Ma)
      axios.delete("http://localhost:3000/api/tinnhan/deleteTN/" + CTC_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        if (response.status === 200) {
          axios.delete("http://localhost:3000/api/cuoctrochuyen/" + CTC_Ma).then(response => {
            // Nếu cập nhật thành công, thì hiển thị thông báo
            // Sau đó, chuyển hướng người dùng
            this.GetCTC();
            this.dialog3 = false

          }).catch(error => {
            alert(error);
          });
        }
        // Sau đó, chuyển hướng người dùng
      }).catch(error => {
        alert(error);
      });


    }
  }
});
</script>
