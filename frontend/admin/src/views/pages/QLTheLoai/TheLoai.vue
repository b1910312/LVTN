<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerTheLoais" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <RouterLink :to="{ name: 'TheLoaiThem' }">
          <button class="btn btn-outline-primary w-100" style="float: right; right: 0;"><font-awesome-icon :icon="['fas', 'plus']" /></button>
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
                aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon :icon="['fas', 'gears']" />
               </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <RouterLink :to="{ name: 'TheLoaiSua', params: { id: item.TL_Ma } }">
                  <button class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon :icon="['fas', 'pen']" /> Chỉnh sửa</button>
                </RouterLink>
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.TL_Ma)"> <font-awesome-icon :icon="['fas', 'trash']" />  Xóa</button>
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

// Tạo component
export default defineComponent({
  name: "DanhSachSach",
  data() {
    return {
      TheLoais: [],
      FitlerTheLoais: ""
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
  methods: {
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
      axios.delete("http://localhost:3000/api/TheLoai/" + TL_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetTheLoai();

      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
