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
                aria-haspopup="true" aria-expanded="false" @click="GetOneSach(item.NXB_Ma)">
                <font-awesome-icon :icon="['fas', 'gears']" />
              </button>
              <div class="dropdown-menu p-2 border border-primary" aria-labelledby="triggerId">
                <button class="dropdown-item btn bg bg-primary text-white mb-1" @click="dialog3 = true">
                  <font-awesome-icon :icon="['fas', 'eye']" /> Chi tiết</button>
                <v-dialog v-model="dialog3" class="w-75">
                  <div class="card text-start bg bg-white p-5" style="overflow-y: scroll;
height: 800px;">
                    <Vrow>
                      <div class="row w-100 mb-3">
                        <div class="col-11">
                          <h4>Thông tin nhà xuất bản: {{ NXB.NXB_Ten }}</h4>
                        </div>
                        <div class=col-1>
                          <VBtn class="bg bg-danger" @click="dialog3 = false">Đóng</VBtn>
                        </div>
                      </div>
                      <div class="card p-3">
                        <div class="row w-100">
                          <div class="col-12 col-md-6">
                            <h6> Logo&nbsp;&nbsp; <button class="btn btn-outline-success h-50"><font-awesome-icon
                                  :icon="['fas', 'pen']" /></button>
                            </h6>
                            <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" class="img-fluid mx-auto mt-2 mb-4" alt=""
                              srcset="">
                          </div>
                        </div>

                        <VRow>
                          <VCol cols="12">
                            <VTextField v-model="NXB.NXB_Ma" label="Mã Nhà xuất bản" readonly placeholder="John" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NXB.NXB_Ten" label="Tên nhà xuất bản" readonly
                              placeholder="johndoe@example.com" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NXB.NXB_Email" label="Email" readonly placeholder="+1 123 456 7890" />
                          </VCol>

                          <VCol cols="12">
                            <VTextField v-model="NXB.NXB_SDT" label="Số điện thoại" readonly placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_DiaChi" label="Địa chỉ" readonly
                              placeholder="············" />
                          </VCol> <VCol cols="6">
                            <VTextField v-model="DC.DC_PhuongXa" label="Phường/Xã" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="DC.DC_QuanHuyen" label="Quận/Huyện" readonly
                              placeholder="············" />
                          </VCol> <VCol cols="6">
                            <VTextField v-model="DC.DC_TinhTP" label="Tỉnh/Thành phố" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="NXB.NXB_NgayTao" label="Ngày tạo" readonly
                              placeholder="············" />
                          </VCol>
                          <VCol cols="6">
                            <VTextField v-model="NXB.NXB_NgayCapNhat" label="Ngày cập nhật" readonly
                              placeholder="············" />
                          </VCol>
                          

                        </VRow>
                      </div>
                    </Vrow>
                  </div>
                </v-dialog>
                <RouterLink :to="{ name: 'NXBSua', params: { id: item.NXB_Ma } }">
                  <button class="dropdown-item btn bg bg-success text-white mb-1"><font-awesome-icon
                      :icon="['fas', 'pen']" /> Chỉnh sửa</button>
                </RouterLink>
                <button class="dropdown-item btn bg bg-danger text-white" @click="XoaSach(item.NXB_Ma)">
                  <font-awesome-icon :icon="['fas', 'trash']" /> Xóa</button>
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
      NXB: "",
      FitlerNXBs: "",
      dialog3: false,
      DC:"",
    }

  },
  computed: {
    filteredNXBs() {
      return this.NXBs.filter((item) => {
        return item.NXB_Ma.toLowerCase().includes(this.FitlerNXBs.toLowerCase()) ||
          item.NXB_Ten.toLowerCase().includes(this.FitlerNXBs.toLowerCase()) ||
          item.NXB_Email.toLowerCase().includes(this.FitlerNXBs.toLowerCase()) ||
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
    GetOneSach(id) {
      axios.get('http://localhost:3000/api/nxb/' + id)
        .then((response) => {
          this.NXB = response.data;
          console.log(response);
          console.log(this.NXB);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        this.GetDiaChi(id)


    },
    GetDiaChi(id) {
      axios.get('http://localhost:3000/api/diachi/' + id)
        .then((response) => {
          this.DC = response.data;
          console.log(response);
          console.log(this.DC);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    },
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
        alert("Xóa thành công");
        // Sau đó, chuyển hướng người dùng
        this.GetNXB();

      }).catch(error => {
        alert(error);
      });
      axios.delete("http://localhost:3000/api/diachi/" + NXB_Ma).then(response => {
        // Nếu cập nhật thành công, thì hiển thị thông báo
        // Sau đó, chuyển hướng người dùng  
        alert("Xóa thành công")
        this.GetNXB()

      }).catch(error => {
        alert(error);
      });
    }
  }
});
</script>
