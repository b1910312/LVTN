<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerDHs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="4"></VCol>
      <VCol cols="2" class="pe-4">
        <button class="btn btn-outline-primary w-50" @click="GetDonHang()"
          style="float: right; right: 0;"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>

      </VCol>
    </VRow>
    <VTable height="600" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Đơn hàng
          </th>
          <th>
            Tên Khách hàng
          </th>
          <th>
            Số điện thoại
          </th>
          <th>
            Địa chỉ
          </th>
          <th>
            Trạng thái
          </th>
          <th>
            Ngày nhập
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

        <tr v-for="(item, i) in filteredDHs" :key="DH_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.DH_Ma }}</td>
          <td>{{ item.DH_Ho + ' ' + item.DH_Ten }}</td>
          <td>{{ item.DH_SoDienThoai }}</td>
          <td>{{ item.DH_DiaChi }} <br> <b>Phường/Xã: </b> {{ item.DH_PhuongXa }},<br><b>Quận/Huyện: </b> {{
            item.DH_QuanHuyen }} <br><b>Tỉnh/Thành phố: </b> {{ item.DH_TinhTP }}</td>
          <td :class="GetColor(item.DH_TrangThai)">{{ GetTrangThai(item.DH_TrangThai) }}</td>
          <td>{{ item.DH_NgayTao }}</td>
          <td>{{ item.DH_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="setActiveDH(item.DH_Ma)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-secondary" aria-labelledby="triggerId">
                <button class="dropdown-item btn bg bg-primary text-white mb-1" @click="dialog5 = true"><font-awesome-icon
                    :icon="['fas', 'eye']" /> Chi tiết</button>
                <v-dialog ref="contentToPrint" v-model="dialog5" class=" mt-5" :style="dialogHeight">
                  <div class="card text-start bg bg-white p-4 " style="overflow-y: auto;">
                    <div class="row w-100">
                      <div class="col-12">
                        <div class="row w-100 mt-3 mb-3 ">
                          <div class="col-8 ms-3">
                            <h4>Thông tin đơn hàng: {{ DH_MaActive }} </h4>
                          </div>
                          <div class="col-1"></div>
                          <div class="col-2 ms-5 ps-5">
                            <VBtn class="bg bg-secondary" @click="printPage">In</VBtn>
                            <VBtn class="bg bg-danger" @click="dialog5 = false">Đóng</VBtn>
                          </div>

                        </div>
                        <div class="row w-100 ms-2 mt-4">

                          <VRow>
                            <VCol cols="6">
                              <VTextField v-model="DH.DH_Ho" label="Họ" readonly placeholder="············" />
                            </VCol>
                            <VCol cols="6">
                              <VTextField v-model="DH.DH_Ten" label="Tên" readonly placeholder="············" />
                            </VCol>
                            <VCol cols="12">
                              <VTextField v-model="DH.DH_SoDienThoai" label="Số điện thoại" type="number" readonly
                                placeholder="············" />
                            </VCol>
                            <VCol cols="12">
                              <VTextField v-model="DH.DH_DiaChi" label="Địa chỉ" readonly placeholder="············" />
                            </VCol>
                            <VCol cols="4">
                              <VTextField v-model="DH.DH_PhuongXa" label="Phường/Xã" readonly
                                placeholder="············" />
                            </VCol>
                            <VCol cols="4">
                              <VTextField v-model="DH.DH_QuanHuyen" label="Quận quyện" readonly
                                placeholder="············" />
                            </VCol>
                            <VCol cols="4">
                              <VTextField v-model="DH.DH_TinhTP" label="Tỉnh/Thành phố" readonly
                                placeholder="············" />
                            </VCol>
                            <VCol cols="6">
                              <h4> Tổng cộng : {{ CongTien(CTDH) }} VNĐ</h4>
                            </VCol>

                            <VCol cols="6" class="d-flex">
                              <h5>Trạng thái:&nbsp;</h5>
                              <h5 :class="GetColor(item.DH_TrangThai)">{{ GetTrangThai(item.DH_TrangThai) }}</h5>
                            </VCol>
                          </VRow>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="row w-100 mb-3 mt-3">
                          <div class="col-6 ms-3">
                            <h4>Chi tiết đơn hàng</h4>
                          </div>

                        </div>
                        <Vrow>
                          <VTable height="600" fixed-header style="border: 3px solid blue; border-radius: 10px;">
                            <thead>
                              <tr>
                                <th>
                                  STT
                                </th>
                                <th class="text-uppercase">
                                  Tên sách
                                </th>
                                <th class="text-uppercase">
                                  Số lượng
                                </th>
                                <th class="text-uppercase">
                                  Giá (VNĐ)
                                </th>
                                <th class="text-uppercase">
                                  Thành tiền (VNĐ)
                                </th>
                              </tr>
                            </thead>

      <tbody>
        <tr v-for="(item, i) in CTDH" :key="CTDH_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.CTDH_TenSach }}</td>
          <td>{{ item.CTDH_SoLuong }}</td>
          <td>{{ item.CTDH_Gia }}</td>
          <td>{{ item.CTDH_ThanhTien }}</td>
        </tr>
      </tbody>
    </VTable>
    </Vrow>
  </div>

  </div>
  </div>
  </v-dialog>
  <button class="dropdown-item btn bg bg-success text-white mb-1" @click="dialog2 = true"><font-awesome-icon
      :icon="['fas', 'pen']" /> Cật nhập trạng thái</button>
  <v-dialog v-model="dialog2" class="w-50">
    <v-card height="250" class="">
      <VRow>
        <VCol cols="9" class="d-flex">

          <v-card-title>
            <h3 class="mt-3">Cập nhật trạng thái đơn hàng {{ DH_MaActive }}</h3>
          </v-card-title>
          <button class="btn text-danger ms-5 ps-5" @click="dialog2 = false">
            <h2><font-awesome-icon :icon="['fas', 'square-minus']" /></h2>
          </button>
        </VCol>
        <v-card-text style="padding: 0 1.5rem;">
          <VRow>
            <VCol cols="12">
              <div class="mb-3">
                <label for="" class="form-label">Trạng thái đơn hàng</label>
                <select class="form-select form-select-lg" v-model="DH.DH_TrangThai" name="" id=""
                  @change="updateTrangThai()">
                  <option value="0">Chưa xác nhận</option>
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Đã thanh toán</option>
                  <option value="3">Đang vận chuyển</option>
                  <option value="4">Đang giao</option>
                  <option value="5">Đã giao</option>
                </select>
              </div>
            </VCol>

            <VCol cols="12 mb-5">
              <VBtn @click="CapNhatTrangThai(DH_MaActive)" class="me-2 float-end btn btn-primary mb-5">
                Cập nhật trạng thái
              </VBtn>

            </VCol>
          </VRow>
        </v-card-text>

      </VRow>
    </v-card>
  </v-dialog>

  <button class="dropdown-item btn bg bg-danger text-white" @click="dialog8 = true">
    <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
  <v-dialog v-model="dialog8" class="w-50 h-25">
    <div class="card text-start bg bg-white p-5">
      <h2>Bạn có chắc muốn xóa đơn hàng này không?</h2>
      <p class="mt-3">đơn hàng sẽ bị xóa và không thể khôi phục lại, hãy chắc
        chắn rằng bạn muốn xóa đơn hàng này</p>
      <div class="row w-100">
        <div class="col-2"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
            @click="XoaDonHang(DH_MaActive)">
            <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
            @click="dialog8 = false">
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
import moment from 'moment';
// Tạo component
export default defineComponent({
  name: "DanhSachSach",

  data() {
    return {
      DHs: [],
      CTDH: [],
      DH: "",
      FitlerDHs: "",
      DH_MaActive: "",
      dialog5: false,
      dialog8: false,
      dialog2: false,
      dialogHeight: "700px"
    }

  },
  computed: {
    filteredDHs() {
      return this.DHs.filter((item) => {
        return item.DH_Ma.toLowerCase().includes(this.FitlerDHs.toLowerCase()) ||
          item.DH_Ten.toLowerCase().includes(this.FitlerDHs.toLowerCase());
        // item.NXB_Email.toLowerCase().includes(this.FitlerDHs.toLowerCase())||
        // item.NXB_SDT.toLowerCase().includes(this.FitlerDHs.toLowerCase());
      })
    },
  },
  mounted() {

    this.GetDonHang()
    // Lắng nghe sự kiện keydown (nhấn phím)
    window.addEventListener('keydown', this.handleKeyDown);
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  beforeUnmount() {
    // Gỡ bỏ lắng nghe sự kiện khi component bị hủy
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      // Kiểm tra khi nào người dùng nhấn tổ hợp phím Ctrl + P
      if (event.ctrlKey && event.key === 'p') {
        this.printPage();
        event.preventDefault(); // Ngăn chặn hành vi mặc định của tổ hợp phím
      }
    },
    printPage() {
      this.dialogHeight = "900px"
      window.print()
    },
    CapNhatTrangThai(MaDH) {
      const now = moment();
      let data = {
        DH_NgayCapNhat: now.format("DD-MM-YYYY"),
        DH_TrangThai: this.DH.DH_TrangThai
      }
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/donhang/capnhattrangthai/" + MaDH, data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log(data)
        console.log("Cập nhật thành công");
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.GetDonHang();
      }).catch(error => {
        console.log(error);
      });
      this.dialog2 = false

    },
    updateTrangThai() {
      // Get the selected value from the select element.
      const selectedValue = document.querySelector("select").value;
      // Update the value of DH.DH_TrangThai.
      this.DH.DH_TrangThai = selectedValue;

      // Save the updated value to he database.
      // ...
    },
    setActiveDH(data) {
      this.DH_MaActive = data;
      this.GetOneDonHang()
      this.GetChiTietDonHang()
      this.CongTien(this.CTDH)
    },
    CongTien(arr) {
      return arr.reduce((sum, item) => sum + item.CTDH_ThanhTien, 0);
    },
    GetOneDonHang() {
      axios.get('http://localhost:3000/api/donhang/' + this.DH_MaActive)
        .then((response) => {
          this.DH = response.data;
          console.log(response);
          console.log(this.DH);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    GetDonHang() {
      axios.get('http://localhost:3000/api/donhang')
        .then((response) => {
          this.DHs = response.data;
          console.log(response);
          console.log(this.DHs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    GetTrangThai(id) {
      switch (id) {
        case 0:
          return "Chưa xác nhận";
        case 1:
          return "Đã xác nhận";
        case 2:
          return "Đã thanh toán";
        case 3:
          return "Đang vận chuyển";
        case 4:
          return "Đang giao"
        case 5:
          return "Đã giao";
        default:
          return null;
      }
    },
    GetColor(id) {
      switch (id) {
        case 0:
          return "text-danger";
        case 1:
          return "text-secondary";
        case 2:
          return "text-info";
        case 3:
          return "text-warning";
        case 4:
          return "text-primary"
        case 5:
          return "text-success";
        default:
          return null;
      }
    },
    GetChiTietDonHang() {
      axios.get("http://localhost:3000/api/chitietdonhang/getbyDHMa/" + this.DH_MaActive).then(response => {
        this.CTDH = response.data
        console.log(this.CTDH)
      }).catch(error => {
        console.log(error);
      });
    },
    XoaDonHang(DH_Ma) {
      axios.delete("http://localhost:3000/api/donhang/" + DH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo

      }).catch(error => {
        console.log(error);
      });
      axios.delete("http://localhost:3000/api/chitietdonhang/deletebyDH/" + DH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetDonHang();

      }).catch(error => {
        console.log(error);
      });
      this.dialog8 = false
    }
  }
});
</script>
