<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerSachs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol Cols="6">

      </VCol>
    </VRow>
    <VTable height="500" fixed-header>
      <thead>
        <tr>
          <th>
            STT
          </th>
          <th class="text-uppercase">
            Mã Sách
          </th>
          <th>
            Tên Sách
          </th>
          <th>
            Tác giả
          </th>
          <th>
            Giá (VNĐ)
          </th>
          <th>
            Thể loại
          </th>
          <th>
            NXB
          </th>
          <th>
            Ngày nhập
          </th>
          <th>
            Ngày cập nhật
          </th>
          <th>
            Ngày xóa
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, i) in filteredSachs" :key="SNKD_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.SNKD_Ma }}</td>
          <td>{{ item.SNKD_Ten }}</td>
          <td>{{ item.SNKD_TacGia }}</td>
          <td>{{ item.SNKD_Gia }}</td>
          <td>{{ getTheLoaiName(item.SNKD_TheLoai) }}</td>
          <td>
           {{ getNXBName(item.SNKD_NXB) }}
          </td>
          <td>{{ item.SNKD_NgayNhap }}</td>
          <td>{{ item.SNKD_NgayCapNhat }}</td>
          <td>
            {{ item.SNKD_NgayXoa }}
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
      NXBs: [],
      TheLoais: [],
      sachs: [],
      FitlerSachs: ""
    }

  },
  computed: {
    filteredSachs() {
      return this.sachs.filter((item) => {
        return item.SNKD_Ma.toLowerCase().includes(this.FitlerSachs.toLowerCase()) ||
          item.SNKD_Ten.toLowerCase().includes(this.FitlerSachs.toLowerCase()) ||
          item.SNKD_TacGia.toLowerCase().includes(this.FitlerSachs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetSach()
    this.getNXB()
    this.getTheLoai()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    GetSach() {
      axios.get('http://localhost:3000/api/sachngungkinhdoanh')
        .then((response) => {
          this.sachs = response.data;
          console.log(response);
          console.log(this.sachs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    getNXBName(SNKD_NXB) {
      return this.NXBs.find(item => item.NXB_Ma === SNKD_NXB).NXB_Ten;
    },
    getTheLoaiName(SNKD_TheLoai) {
      return this.TheLoais.find(item => item.TL_Ma === SNKD_TheLoai).TL_Ten;
    },
    getNXB() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/NXB`).then(res => {
        this.NXBs = res.data
        console.log(this.NXBs)
      })
    },
    getTheLoai() {
      // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
      axios.get(`http://localhost:3000/api/theloai`).then(res => {
        this.TheLoais = res.data
        console.log(this.TheLoais)
      })
    },
  }
});
</script>
