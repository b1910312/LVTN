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
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon :icon="['fas', 'gears']" />
               </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <button class="dropdown-item btn bg bg-primary text-white mb-1"><font-awesome-icon :icon="['fas', 'eye']" /> Chi tiết</button>
                <button class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon :icon="['fas', 'envelope']" /> Trả lời</button>
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.LH_Ma)"> <font-awesome-icon :icon="['fas', 'trash']" />  Xóa</button>
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
      LHs: [],
      FitlerLHs: "",
      color:""
    }

  },
  computed: {
    filteredLHs() {
      return this.LHs.filter((item) => {
        return item.LH_Ma.toLowerCase().includes(this.FitlerLHs.toLowerCase()) ||
          item.LH_Ten.toLowerCase().includes(this.FitlerLHs.toLowerCase()) ||
          item.LH_Email.toLowerCase().includes(this.FitlerLHs.toLowerCase())||
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
    GetTrangThai(status){
      switch (status){
        case true:
          this.color = "text-success"
          return "Đã xử lý"
        case false:
        this.color = "text-warning"
          return "Đang xử lý"
        default:
        this.color = "text-danger"
          return "Lỗi"
      }
    },
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
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetNXB();

      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
