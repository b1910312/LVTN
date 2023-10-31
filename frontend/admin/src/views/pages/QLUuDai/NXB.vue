<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <div>
    <VRow>
      <VCol cols="6" class="ps-4">
        <input type="text" class="form-control w-100" v-model.trim="FitlerNXBs" name="" id="" aria-describedby="helpId"
          placeholder="Tìm kiếm theo tên">
      </VCol>
      <VCol cols="5"></VCol>
      <VCol cols="1" class="pe-4">
        <RouterLink :to="{ name: 'NXBThem' }">
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
            Mã NXB
          </th>
          <th>
            Tên NXB
          </th>
          <th>
            Email
          </th>
          <th>
            SDT
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

        <tr v-for="(item, i) in filteredNXBs" :key="NXB_Ma">
          <td>{{ i + 1 }}</td>
          <td>{{ item.NXB_Ma }}</td>
          <td>{{ item.NXB_Ten }}</td>
          <td>{{ item.NXB_Email }}</td>
          <td>{{ item.NXB_SDT }}</td>
          <td>{{ item.NXB_NgayTao }}</td>
          <td>{{ item.NXB_NgayCapNhat }}</td>
          <td>
            <div class="dropdown open">
              <button class="btn btn-outline-info dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon :icon="['fas', 'gears']" />
               </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <RouterLink :to="{ name: 'NXBSua', params: { id: item.NXB_Ma } }">
                  <button class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon :icon="['fas', 'pen']" /> Chỉnh sửa</button>
                </RouterLink>
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.NXB_Ma)"> <font-awesome-icon :icon="['fas', 'trash']" />  Xóa</button>
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
      NXBs: [],
      FitlerNXBs: ""
    }

  },
  computed: {
    filteredNXBs() {
      return this.NXBs.filter((item) => {
        return item.NXB_Ma.toLowerCase().includes(this.FitlerNXBs.toLowerCase()) ||
          item.NXB_Ten.toLowerCase().includes(this.FitlerNXBs.toLowerCase()) ||
          item.NXB_Email.toLowerCase().includes(this.FitlerNXBs.toLowerCase())||
          item.NXB_SDT.toLowerCase().includes(this.FitlerNXBs.toLowerCase());
      })
    },
  },
  mounted() {
    this.GetNXB()
    // Lấy ngày hiện tại
    // Lưu ngày hiện tại vào biến ngày cập nhật
  },
  methods: {
    GetNXB() {
      axios.get('http://localhost:3000/api/nxb')
        .then((response) => {
          this.NXBs = response.data;
          console.log(response);
          console.log(this.NXBs);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
    XoaSach(NXB_Ma) {
      axios.delete("http://localhost:3000/api/nxb/" + NXB_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo

      }).catch(error => {
        alert(error);
      });
    
    }
  }
});
</script>
