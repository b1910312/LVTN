<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerHMs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <button class="btn btn-outline-primary w-100" style="float: right; right: 0;"
          @click="openDialog"><font-awesome-icon :icon="['fas', 'plus']" /></button>

      </VCol>
      <v-dialog v-model="dialog" class="w-50">
        <VCard>
          <VCardText>
            <H4>Thêm banner mới</H4>
            <VRow>
              <VCol cols="12">
                <VFileInput label="Ảnh banner" type="file" ref="imageInput" @change="setImageBanner" />
              </VCol>
              <VCol cols="10">
              </VCol>
              <VCol cols="2" class="d-flex gap-4">
                <VBtn type="submit" @click="AddBanner()">
                  Thêm
                </VBtn>
              </VCol>

            </VRow>

          </VCardText>
        </VCard>
      </v-dialog>
    </VRow>
    <v-dialog v-model="dialog4" class="w-50 h-25">
      <div class="card text-center bg bg-white p-5">
        <h3 class="text-success">Bạn đã thêm banner thành công</h3>
        <div class="row w-100">
          <div class="col-4"></div>
          <div class="col-4"> <button class="dropdown-item btn bg bg-primary text-white text-center"
              @click="dialog4 = false">
              <font-awesome-icon :icon="['fas', 'check']" /> Xác nhận</button></div>
          <div class="col-4"></div>

        </div>
      </div>

    </v-dialog>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Banner
          </th>
          <th>
            Hình ảnh
          </th>
          <th>
            Trạng thái
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

        <tr class="text-center" v-for="(item, i) in filteredHMs" :key="BN_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.BN_Ma }}</td>
          <td><img :src="GetBanner(item.BN_Ma)" class="img-fluid" alt="..." style="max-width: 300px"></td>
          <td>{{ item.BN_TrangThai }}</td>
          <td>{{ item.BN_NgayTao }}</td>
          <td>
            <div class="dropdown open">
              <button class="dropdown-item btn bg bg-danger text-white" @click="dialog3 = true">
                <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
            </div>
            <v-dialog v-model="dialog3" class="w-50 h-25">
              <div class="card text-start bg bg-white p-5">
                <h2>Bạn có chắc muốn xóa banner này không?</h2>
                <p class="mt-3">banner sẽ bị xóa và không thể khôi phục lại, hãy chắc
                  chắn rằng bạn muốn xóa banner này</p>
                <div class="row w-100">
                  <div class="col-2"></div>
                  <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                      @click="XoaHangMuc(item.BN_Ma)">
                      <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button></div>
                  <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
                      @click="dialog3 = false">
                      <font-awesome-icon :icon="['fas', 'xmark']" /> Hủy</button></div>
                  <div class="col-2"></div>

                </div>
              </div>

            </v-dialog>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
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
      TenHangMuc: "",
      dialog: false,
      dialog3: false,
      dialog4: false,
      HMs: [],
      FitlerHMs: "",
      imageBanner: "",
    }

  },
  computed: {
    filteredHMs() {
      return this.HMs.filter((item) => {
        return item.BN_Ma.toLowerCase().includes(this.FitlerHMs.toLowerCase());
      })
    },
  },
  mounted() {
    setInterval(() => {
      this.GetLastID();
    }, 1000);
    this.GetHM()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  created() {
    const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"))
    if (nhanvienchitiet.TKNV_VaiTro != "KBVT003") {
      alert("Quyền đéo đâu mà vào")
      this.$router.push("/");
    }
  },
  methods:
  {
    async setBanner() {
      const formData = new FormData();
      formData.append("image", this.imageBanner);
      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/BN/" + this.NewID, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    GetHM() {
      axios.get('http://localhost:3000/api/Banner')
        .then((response) => {
          this.HMs = response.data;
          console.log(response);
          console.log(this.HMs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },

    XoaHangMuc(BN_Ma) {
      axios.delete("http://localhost:3000/api/banner/" + BN_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng
        this.GetHM();
        this.dialog3 = false
      }).catch(error => {
        alert(error);
      });
    }, GetLastID() {
      axios.get(`http://localhost:3000/api/banner/getid/getlastbnma`).then(res => {
        this.LastID = res.data
        this.TachKBS()
        this.Increase()
        console.log(this.LastID)
        console.log("ID NEW" + this.NewID)
        console.log(this.So)
        console.log(this.Chu)
      })
    },

    GetBanner(S_Ma) {
      const logo = "http://localhost:3000/api/thumbnail/image/BN/" + S_Ma
      return logo;
    },
    setImageBanner(event) {
      this.imageBanner = event.target.files[0];
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
      let [Text, result] = this.LastID.split("N");
      this.So = result;
      this.Chu = Text1;
    },
    AddBanner() {
      const now = moment();
      const data = {
        BN_Ma: this.NewID,
        BN_NgayTao: now.format("DD-MM-YYYY"),
      }
      console.log(data)
      axios.post("http://localhost:3000/api/banner", data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng
        this.dialog = false;
        this.GetHM()
      }).catch(error => {
        alert(error);
      });
      this.setBanner()
      this.dialog4 = true
    }
  }
});
</script>
