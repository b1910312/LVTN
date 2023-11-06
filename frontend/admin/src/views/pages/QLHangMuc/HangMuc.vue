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
            <H4>Thêm vai trò mới</H4>
            <VRow>
              <VCol cols="12">
                <VTextField v-model="TenHangMuc" label="Tên vài trò mới" placeholder="Tên vai trò" />
              </VCol>
              <VCol cols="10">
              </VCol>
              <VCol cols="2" class="d-flex gap-4">
                <VBtn type="submit" @click="AddHangMuc()">
                  Thêm
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </v-dialog>
    </VRow>

    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Hạng mức
          </th>
          <th>
            Tên Hạng mức
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

        <tr class="text-center" v-for="(item, i) in filteredHMs" :key="HM_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.HM_Ma }}</td>
          <td>{{ item.HM_TenHangMuc }}</td>
          <td>{{ item.HM_NgayTao }}</td>
          <td>
            <div class="dropdown open">
              <button class="dropdown-item btn bg bg-danger text-white"  @click="XoaHangMuc(item.HM_Ma)">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
            </div>
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
      HMs: [],
      FitlerHMs: ""
    }

  },
  computed: {
    filteredHMs() {
      return this.HMs.filter((item) => {
        return item.HM_Ma.toLowerCase().includes(this.FitlerHMs.toLowerCase()) ||
          item.HM_TenHangMuc.toLowerCase().includes(this.FitlerHMs.toLowerCase());
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
    if ( nhanvienchitiet.TKNV_VaiTro != "KBVT003") {
      alert("Quyền đéo đâu mà vào")
      this.$router.push("/");
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    GetHM() {
      axios.get('http://localhost:3000/api/HangMuc')
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

    XoaHangMuc(HM_Ma) {
      axios.delete("http://localhost:3000/api/HangMuc/" + HM_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetHM();

      }).catch(error => {
        alert(error);
      });
    }, GetLastID() {
      axios.get(`http://localhost:3000/api/HangMuc/getid/getlasthmma`).then(res => {
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
      let [Text, result] = this.LastID.split("M");
      this.So = result;
      this.Chu = Text1;
    },
    AddHangMuc() {
      const now = moment();
      const data = {
        HM_Ma: this.NewID,
        HM_TenHangMuc: this.TenHangMuc,
        HM_NgayTao: now.format("DD-MM-YYYY"),
      }
      console.log(data)
      axios.post("http://localhost:3000/api/HangMuc", data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng
        this.dialog = false;
        this.TenHangMuc ="";
        this.GetHM()
      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
