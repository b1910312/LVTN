<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerVTs" name="" id="" aria-describedby="helpId"
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
                <VTextField v-model="TenVaiTro" label="Tên vài trò mới" placeholder="Tên vai trò" />
              </VCol>
              <VCol cols="10">
              </VCol>
              <VCol cols="2" class="d-flex gap-4">
                <VBtn type="submit" @click="AddVaiTro()">
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
            Mã Vai trò
          </th>
          <th>
            Tên Vai trò
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

        <tr class="text-center" v-for="(item, i) in filteredVTs" :key="VT_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.VT_Ma }}</td>
          <td>{{ item.VT_TenVaiTro }}</td>
          <td>{{ item.VT_NgayTao }}</td>
          <td>
            <div class="dropdown open">
              <button class="dropdown-item btn bg bg-danger text-white"  @click="XoaVaiTro(item.VT_Ma)">
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
      TenVaiTro: "",
      dialog: false,
      VTs: [],
      FitlerVTs: ""
    }

  },
  computed: {
    filteredVTs() {
      return this.VTs.filter((item) => {
        return item.VT_Ma.toLowerCase().includes(this.FitlerVTs.toLowerCase()) ||
          item.VT_TenVaiTro.toLowerCase().includes(this.FitlerVTs.toLowerCase());
      })
    },
  },
  mounted() {
    setInterval(() => {
            this.GetLastID();
        }, 1000);
    this.GetVT()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    setActiveBinhLuan(data) {
      this.VT_MaActive = data;
      console.log("VT_" + this.VT_MaActive)
    },
    GetVT() {
      axios.get('http://localhost:3000/api/VaiTro')
        .then((response) => {
          this.VTs = response.data;
          console.log(response);
          console.log(this.VTs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    GetBinhLuanID() {
      axios.get('http://localhost:3000/api/vaitro/' + this.VT_MaActive)
        .then((response) => {
          this.VT_Active = response.data;
          console.log(response);
          console.log(this.VT_Active);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    XoaVaiTro(VT_Ma) {
      axios.delete("http://localhost:3000/api/VaiTro/" + VT_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetVT();

      }).catch(error => {
        alert(error);
      });
    }, GetLastID() {
      axios.get(`http://localhost:3000/api/vaitro/getid/getlastvtma`).then(res => {
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
      let [Text, result] = this.LastID.split("T");
      this.So = result;
      this.Chu = Text1;
    },
    AddVaiTro() {
      const now = moment();
      const data = {
        VT_Ma: this.NewID,
        VT_TenVaiTro: this.TenVaiTro,
        VT_NgayTao: now.format("DD-MM-YYYY"),
      }
      console.log(data)
      axios.post("http://localhost:3000/api/vaitro", data).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng
        this.dialog = false;
        this.TenVaiTro ="";
        this.GetVT()
      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
