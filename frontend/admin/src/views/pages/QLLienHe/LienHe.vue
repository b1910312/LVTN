<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerLHs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">

      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Liên hệ
          </th>
          <th>
            Email
          </th>
          <th>
            Họ Tên
          </th>
          <th>
            Chủ đề
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

        <tr v-for="(item, i) in filteredLHs" :key="LH_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.LH_Ma }}</td>
          <td>{{ item.LH_Email }}</td>
          <td>{{ item.LH_Ho }}&nbsp;{{ item.LH_Ten }}</td>
          <td>{{ item.LH_ChuDe }}</td>
          <td :class="color">{{ GetTrangThai(item.LH_TrangThai) }}</td>
          <td>{{ item.LH_NgayTao }}</td>
          <td>{{ item.LH_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button @click="GetOneLH(item.LH_Ma)" class="btn btn-outline-info dropdown-toggle" type="button"
                id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <button class="dropdown-item btn bg bg-primary text-white mb-1" @click="dialog1 = true"><font-awesome-icon
                    :icon="['fas', 'eye']" /> Chi tiết</button>
                <v-dialog v-model="dialog1">
                  <div class="card p-4 w-75 mx-auto">
                    <div class="row w-100 my-3">
                      <div class="col-11">
                        <h4>Chi tiết liên hệ: {{ LH.LH_Ma }} </h4>
                      </div>
                      <div class="col-1">
                        <Vbtn class="btn btn-danger" @click="dialog1 = false">Đóng</Vbtn>
                      </div>
                    </div>
                    <div class="card mx-1 my-1 p-2">

                      <VRow class="px-4">
                        <!-- <VCol cols="6" class="my-2">
                        <VTextField v-model="KH.TKKH_HangMuc" label="Hạng mức hiện tại" readonly
                          placeholder="+1 123 456 7890" />
                      </VCol> -->
                        <VRow class="py-3 px-2">
                          <Vcol cols="3">
                            <h6 class="mt-4 ms-3 me-3 ">Thông tin liên hệ</h6>
                          </Vcol>
                          <VCol cols="5">
                            <VTextField v-model="LH.LH_Ho" readonly label="Họ" placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="5">
                            <VTextField v-model="LH.LH_Ten" readonly label="Tên" placeholder="+1 123 456 7890" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="LH.LH_ChuDe" readonly label="Chủ đề" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="LH.LH_Email" readonly label="Email" placeholder="············" />
                          </VCol>


                          <VCol cols="12">
                            <VTextarea v-model="LH.LH_NoiDung" readonly label="Nội dung" placeholder="············" />
                          </VCol>


                          <VCol cols="5"></VCol>
                          <VCol cols="4" class="d-flex gap-4">
                            <h6>Trạng thái: {{ GetTrangThai(LH.LH_TrangThai) }}</h6>
                          </VCol>
                          <VCol cols="3" class="d-flex gap-4">
                            <h6>Ngày tạo: {{ LH.LH_NgayTao }}</h6>
                          </VCol>
                        </VRow>
                        <!-- <select class="form-control h-100" v-model="this.NewVT">
                            <option v-for="gt in VTs" :value="gt.VT_Ma">{{ gt.VT_TenVaiTro }}</option>
                          </select> -->


                      </VRow>
                    </div>

                  </div>
                </v-dialog>
                <button v-if="!item.LH_TrangThai" class="dropdown-item btn bg bg-info text-white mb-1"
                  @click="dialog2 = true"><font-awesome-icon :icon="['fas', 'envelope']" /> Trả lời</button>
                <v-dialog v-model="dialog2">
                  <div class="card p-4 w-75 mx-auto">
                    <div class="row w-100 my-3">
                      <div class="col-11">
                        <h4>Trả lời liên hệ: {{ LH.LH_Ma }} </h4>
                      </div>
                      <div class="col-1">
                        <Vbtn class="btn btn-danger" @click="dialog2 = false">Đóng</Vbtn>
                      </div>
                    </div>
                    <div class="card mx-1 my-1 p-2">

                      <VRow class="px-4">
                        <!-- <VCol cols="6" class="my-2">
                        <VTextField v-model="KH.TKKH_HangMuc" label="Hạng mức hiện tại" readonly
                          placeholder="+1 123 456 7890" />
                      </VCol> -->
                        <VRow class="py-3 px-2">
                          <Vcol cols="3">
                            <h6 class="mt-4 ms-3 me-3 ">Thông tin liên hệ</h6>
                          </Vcol>
                          <VCol cols="5">
                            <VTextField v-model="LH.LH_Ho" readonly label="Họ" placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="5">
                            <VTextField v-model="LH.LH_Ten" readonly label="Tên" placeholder="+1 123 456 7890" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="LH.LH_ChuDe" readonly label="Chủ đề" placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="LH.LH_Email" readonly label="Email" placeholder="············" />
                          </VCol>


                          <VCol cols="12">
                            <VTextarea v-model="LH.LH_NoiDung" readonly label="Nội dung" placeholder="············" />
                          </VCol>
                          <VCol cols="12">
                            <VTextarea v-model="TraLoi" :error-messages="errors.TraLoi" label="Nội dung" placeholder="············" />
                          </VCol>

                          <VCol cols="10"></VCol>

                          <VCol cols="2" class="">
                            <Vbtn class="btn btn-primary w-100"   @click="onSubmit()">Trả lời</Vbtn>
                          </VCol>
                        </VRow>
                        <!-- <select class="form-control h-100" v-model="this.NewVT">
                            <option v-for="gt in VTs" :value="gt.VT_Ma">{{ gt.VT_TenVaiTro }}</option>
                          </select> -->


                      </VRow>
                    </div>

                  </div>
                </v-dialog>
                <button v-if="!item.LH_TrangThai" class="dropdown-item btn bg bg-success text-white mb-1"
                  @click="dialog6 = true"><font-awesome-icon :icon="['fas', 'check']" /> Đã xong</button>
                <v-dialog v-model="dialog6" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2 class="text-center">Bạn có chắc đã trả lời liên hệ này</h2>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
                          @click="done()">
                          <font-awesome-icon :icon="['fas', 'circle-check']" /> Xác nhận</button></div>
                          <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog6 = false">
                          <font-awesome-icon :icon="['fas', 'circle-check']" /> Hủy</button></div>
                      <div class="col-2"></div>

                    </div>
                  </div>
                </v-dialog>

                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog5 = true"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog5" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa liên hệ này không?</h2>
                    <p class="mt-3">liên hệ sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa liên hệ này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(item.LH_Ma)">
                          <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                          @click="dialog5 = false">
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
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  data() {
    return {
      LHs: [],
      LH: null,
      FitlerLHs: "",
      color: "",
      dialog1: false,
      dialog2: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      linkmail: "",
      TraLoi: "",
      errors: ref({
        TraLoi: ""
      }),
      DaDayDu: ref()
    }

  },
  computed: {
    filteredLHs() {
      return this.LHs.filter((item) => {
        return item.LH_Ma.toLowerCase().includes(this.FitlerLHs.toLowerCase()) ||
          item.LH_Ten.toLowerCase().includes(this.FitlerLHs.toLowerCase()) ||
          item.LH_Email.toLowerCase().includes(this.FitlerLHs.toLowerCase()) ||
          item.LH_ChuDe.toLowerCase().includes(this.FitlerLHs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetNXB()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    async validateInput() {
      this.errors.TraLoi = "";
     

      if (!this.TraLoi) {
        this.errors.TraLoi = "Vui lòng nhập nội dung trả lời";
      }
    
      this.DaDayDu = !Object.values(this.errors).some((error) => error);
    },
    async onSubmit() {
      this.validateInput()
      if (this.DaDayDu == true) {
        this.setMail();
      }

    },
    done() {
      const now = moment()
      this.LH.LH_TrangThai = true;
      this.LH.LH_NgayCapNhat = now.format("DD-MM-YYYY");
      // Gọi API để cập nhật sản phẩm
      axios.put("http://localhost:3000/api/lienhe/done/" + this.LH.LH_Ma, this.LH).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
        this.GetNXB()
      }).catch(error => {
        console.log(error);
      });
      this.dialog6 = false
    },
    setMail() {
      this.linkmail = "mailto:" + this.LH.LH_Email + "?subject=[Reply]" + this.LH.LH_ChuDe + "&cc=" + "" + "&bcc=" + "" + "&body=" + this.TraLoi
      window.location.href = this.linkmail


    },
    // redirectToURL(url) {
    //   window.location.href = url; // Gán đường dẫn URL mới để chuyển hướng trang
    // },
    GetTrangThai(id) {
      switch (id) {
        case true:
          return "Đã trả lời"
        case false:
          return "Chưa trả lời"
        default:
          return "Chưa trả lời"
      }
    },
    GetOneLH(id) {
      axios.get('http://localhost:3000/api/lienhe/' + id)
        .then((response) => {
          this.LH = response.data;
          console.log(response);
          console.log(this.LH);

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })


    },
    // GetTrangThai(status) {
    //   switch (status) {
    //     case true:
    //       this.color = "text-success"
    //       return "Đã xử lý"
    //     case false:
    //       this.color = "text-warning"
    //       return "Đang xử lý"
    //     default:
    //       this.color = "text-danger"
    //       return "Lỗi"
    //   }
    // },
    GetNXB() {
      axios.get('http://localhost:3000/api/lienhe')
        .then((response) => {
          this.LHs = response.data;
          console.log(response);
          console.log(this.LHs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    XoaSach(LH_Ma) {
      axios.delete("http://localhost:3000/api/lienhe/" + LH_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        console.log("Xóa thành công");
        this.dialog5 = false
        // Sau đó, chuyển hướng người dùng
        this.GetNXB();

      }).catch(error => {
        console.log(error);
      });
    }
  }
});
</script>
