<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerTheLoais" name="" id=""
          aria-describedby="helpId" placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <RouterLink :to="{ name: 'TheLoaiThem' }">
          <button class="btn btn-outline-primary w-100" style="float: right; right: 0;"><font-awesome-icon
              :icon="['fas', 'plus']" /></button>
        </RouterLink>
      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Thể Loại
          </th>
          <th>
            Tên Thể Loại
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

        <tr v-for="(item, i) in filteredTheLoais" :key="TL_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.TL_Ma }}</td>
          <td>{{ item.TL_Ten }}</td>
          <td>{{ item.TL_NgayTao }}</td>
          <td>{{ item.TL_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" @click="setActiveTL(item.TL_Ma)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <RouterLink :to="{ name: 'TheLoaiSua', params: { id: item.TL_Ma } }">
                  <button class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon
                      :icon="['fas', 'pen']" /> Chỉnh sửa</button>
                </RouterLink>
                <button class="dropdown-item btn bg bg-danger text-white" @click="dialog3 = true"> <font-awesome-icon
                    :icon="['fas', 'trash']" /> Xóa</button>
                <v-dialog v-model="dialog3" class="w-50 h-25">
                  <div class="card text-start bg bg-white p-5">
                    <h2>Bạn có chắc muốn xóa thể loại này không?</h2>
                    <p class="mt-3">Thể loại sẽ bị xóa và không thể khôi phục lại, hãy chắc
                      chắn rằng bạn muốn xóa thể loại này</p>
                    <div class="row w-100">
                      <div class="col-2"></div>
                      <div class="col-4"> <button class="dropdown-item btn bg bg-danger text-white text-center"
                          @click="XoaSach(TL.TL_Ma)">
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

  <v-dialog v-model="dialog4" class="w-50 h-25">
    <div class="card text-start bg bg-white p-5">
      <h2 class="text-center">Không thể xóa thể loại</h2>
      <p class="mt-3">Thể loại bạn muốn xóa còn tồn tại sách, không thể tiếp tục xóa, hãy đảm bảo rằng không còn sách trực
        thuộc trước khi xóa</p>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
            @click="dialog4 = false">
            <font-awesome-icon :icon="['fas', 'circle-check']" /> Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
  <v-dialog v-model="dialog6" class="w-100 h-100">
    <div class="card text-center bg bg-white p-5">
      <h2>Bạn không có quyền truy cập vào trang này!!</h2>
      <div class="row w-100">
        <div class="col-4"></div>
        <div class="col-4"> <button class="dropdown-item btn bg bg-secondary text-white text-center"
            @click="this.$router.push(`/`)">
            <font-awesome-icon :icon="['fas', '213-291']" />Xác nhận</button></div>
        <div class="col-4"></div>

      </div>
    </div>

  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { defineAsyncComponent, ref } from 'vue';

// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  data() {
    return {
      TheLoais: [],
      FitlerTheLoais: "",
      dialog3: false,
      dialog4: false,
      dialog6: false,
      TL_MaActive: "",
      TL: []
    }

  },
  computed: {
    filteredTheLoais() {
      return this.TheLoais.filter((item) => {
        return item.TL_Ma.toLowerCase().includes(this.FitlerTheLoais.toLowerCase()) ||
          item.TL_Ten.toLowerCase().includes(this.FitlerTheLoais.toLowerCase());
      })
    },
  },
  mounted() {

    this.GetTheLoai()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  created() {
    const nhanvienchitiet = JSON.parse(localStorage.getItem("nhanvien"))
    if (nhanvienchitiet.TKNV_VaiTro != "KBVT003") {
      this.dialog6 = true
    }
  },
  methods: {
    GetOneTL(TL_Ma) {
      axios.get(`http://localhost:3000/api/theloai/` + TL_Ma)
      .then(res=>{
          this.TL = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    setActiveTL(data) {
      this.TL_MaActive = data;
      console.log("S_Ma" + this.TL_MaActive)
      this.GetOneTL(this.TL_MaActive)
    },
    GetTheLoai() {
      axios.get('http://localhost:3000/api/TheLoai')
        .then((response) => {
          this.TheLoais = response.data;
          console.log(response);
          console.log(this.TheLoais);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    XoaSach(TL_Ma) {
      axios.get("http://localhost:3000/api/sach/GetByDanhMuc/" + TL_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        if (response.data != "") {
          this.dialog4 = true
          this.dialog3 = false
        }
        else {
          axios.delete("http://localhost:3000/api/theloai/" + TL_Ma).then(response => {
            // Nếu cập nhật thành công, thì hiển thị thông báo
            this.dialog3 = false
            // Sau đó, chuyển hướng người dùng
            this.GetTheLoai();

          }).catch(error => {
            alert(error);
          });
        }
        this.GetTheLoai();

      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
