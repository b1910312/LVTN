<script>

export default {
    name: "CuaHang",
    data() {
        return {
            DanhMuc: [
                { name: " Thông tin cá nhân", Value: "1" },
                { name: " Danh sách đơn hàng", Value: "2" },
                { name: " Lịch sử mua hàng", Value: "3" },
                { name: " Đặt lại mật khẩu", Value: "4" },
                { name: " Trò chuyện", Value: "5" },
            ],
            GioiTinh: [
                { name: "Nữ", value: "1" },
                { name: "Name", value: "2" }
            ],
            products: [
                { name: "Sách 1", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "120000" },
                { name: "Sách 2", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "25", gia: "150000" },
                { name: "Sách 3", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "1030000" },
                { name: "Sách 4", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "23", gia: "102000" },
                { name: "Sách 5", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "22", gia: "106000" },
                { name: "Sách 6", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "12", gia: "108000" },
                { name: "Sách 1", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "120000" },
                { name: "Sách 2", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "25", gia: "150000" },
                { name: "Sách 3", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "1030000" },
                { name: "Sách 4", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "23", gia: "102000" },
                { name: "Sách 5", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "22", gia: "106000" },
                { name: "Sách 6", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "12", gia: "108000" }
            ],
        }
    },
    components: {
    }
}
</script>
<template>
    <VRow>
        <div class="col-3">
            <VCard class="mt-3" style=" background-color: rgba(0, 0, 0, 0.4  ); height: 700px;">
                <Vrow>
                    <VCol cols="12">
                        <VRow>
                            <VCol cols="5"> <img src="https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                                    class="img-fluid" style="border-radius: 50%; width: 100px; height: 100px;" alt="">
                            </VCol>
                            <VCol cols="7">
                                <VRow>
                                    <VCol cols="6">
                                        <VBtn class="pt-2">
                                            <h5>
                                                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                                            </h5>
                                            <template v-slot:append>
                                                <v-badge color="error" class="mb-2" content="6" inline></v-badge>
                                            </template>
                                        </VBtn>
                                    </VCol>
                                    <VCol cols="6">
                                        <VBtn class="pt-2">
                                            <h5> <font-awesome-icon :icon="['fas', 'box']" /> </h5>
                                            <template v-slot:append>
                                                <v-badge color="error" class="mb-2" content="6" inline></v-badge>
                                            </template>
                                        </VBtn>
                                    </VCol>
                                    <VCol cols="7">
                                        <h4><font-awesome-icon :icon="['fas', 'medal']" /> Vàng</h4>
                                    </VCol>
                                    <VCol cols="5"></VCol>
                                </VRow>
                            </VCol>
                            <VCol cols="12">
                                <div class="text-start  text-dark">
                                    <div class="table-responsive">
                                        <table class="table table-dark text-dark">
                                            <tbody>
                                                <tr class="row w-100 ps-4">
                                                    <td class="col-2"></td>
                                                    <th class="col-8">
                                                        <h5 style="font-weight: bold;">Nguyễn Thanh Tín</h5>
                                                    </th>
                                                    <td class="col-2"></td>
                                                </tr>
                                                <tr class="row w-100 ps-4">
                                                    <th class="col-2"><font-awesome-icon
                                                            :icon="['fas', 'map-location-dot']" />
                                                    </th>
                                                    <td class="col-10">Song Lộc, Châu Thành, Trà Vinh</td>
                                                </tr>

                                                <tr class="row w-100 ps-4">
                                                    <th class="col-2"><font-awesome-icon :icon="['fas', 'phone']" /></th>
                                                    <td class="col-10">0984442145</td>
                                                </tr>
                                                <tr class="row w-100 ps-4">
                                                    <th class="col-2"><font-awesome-icon :icon="['fas', 'envelope']" /></th>
                                                    <td class="col-10">minhtran24680@gmai.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </VCol>
                        </VRow>

                    </VCol>
                </Vrow>
            </VCard>
        </div>
        <VCol cols="9">
            <VCard>
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <div class="row w-100">
                        <li class="nav-item col-3" role="presentation">
                            <button class="nav-link  w-100 active" id="ThonTinCaNhan-tab" data-bs-toggle="tab"
                                data-bs-target="#ThonTinCaNhan" type="button" role="tab" aria-controls="ThonTinCaNhan"
                                aria-selected="true">Thông tin cá nhân</button>
                        </li>
                        <li class="nav-item col-3" role="presentation">
                            <button class="nav-link  w-100" id="DatLaiMatKhau-tab" data-bs-toggle="tab"
                                data-bs-target="#DatLaiMatKhau" type="button" role="tab" aria-controls="DatLaiMatKhau"
                                aria-selected="false">Đặt lại mật khẩu</button>
                        </li>
                        <li class="nav-item col-3" role="presentation">
                            <button class="nav-link  w-100" id="DanhSachDonHang-tab" data-bs-toggle="tab"
                                data-bs-target="#DanhSachDonHang" type="button" role="tab" aria-controls="DanhSachDonHang"
                                aria-selected="false">Danh sách đơn hàng</button>
                        </li>
                        <li class="nav-item col-3" role="presentation">
                            <button class="nav-link  w-100" id="LichSuMuaHang-tab" data-bs-toggle="tab"
                                data-bs-target="#LichSuMuaHang" type="button" role="tab" aria-controls="LichSuMuaHang"
                                aria-selected="false">Lịch sử mua hàng</button>
                        </li>


                    </div>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="ThonTinCaNhan" role="tabpanel" aria-labelledby="ThonTinCaNhan-tab">

                        <VRow>
                            <VCol cols="12">
                                <VCard title="Thông tin khách hàng">
                                    <VCardText class="d-flex">
                                        <!-- 👉 Avatar -->
                                        <!-- <VAvatar rounded="lg" size="100" class="me-6" :image="GetLogo(nvv.TKNV_MaNV)" /> -->

                                        <!-- 👉 Upload Photo -->
                                        <form class="d-flex flex-column justify-center gap-5">
                                            <div class="d-flex flex-wrap gap-2">
                                                <VBtn color="primary">
                                                    <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                                                    <span class="d-none d-sm-block">Cập nhật ảnh đại diện</span>
                                                </VBtn>
                                                <v-dialog v-model="dialog5">
                                                    <div class="card w-75 mx-auto text-start bg bg-white p-5">
                                                        <div class="col-11">
                                                            <h4>Cập nhật Ảnh đại diện</h4>
                                                        </div>

                                                        <VCol cols="12">
                                                            <VForm>
                                                                <VFileInput label="Avatar" type="file" ref="imageInput" />
                                                                <div class="row w-100 mt-2">
                                                                    <div class="col-8"></div>
                                                                    <div class="d-flex gap-4 col-2">
                                                                        <VBtn class="ms-5" type="Thêm">
                                                                            Cập nhật
                                                                        </VBtn>
                                                                    </div>
                                                                    <div class="d-flex gap-4 col-1">
                                                                        <VBtn class="ms-5 bg bg-secondary">
                                                                            Hủy
                                                                        </VBtn>
                                                                    </div>
                                                                </div>
                                                            </VForm>
                                                        </VCol>
                                                    </div>

                                                </v-dialog>

                                                <!-- <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                  <span class="d-none d-sm-block">Reset</span>
                  <VIcon icon="bx-refresh" class="d-sm-none" />
                </VBtn> -->
                                            </div>

                                            <!-- <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p> -->
                                        </form>
                                    </VCardText>

                                    <VDivider />

                                    <VCardText>
                                        <!-- 👉 Form -->
                                        <VForm class="mt-6">
                                            <VRow>
                                                <!-- 👉 Address -->
                                                <VCol cols="12" md="6">
                                                    <VTextField readonly label="Mã Nhân viên"
                                                        placeholder="123 Main St, New York, NY 10001" />
                                                </VCol>
                                                <!-- 👉 First Name -->
                                                <VCol md="6" cols="12">
                                                    <VTextField placeholder="John" label="Họ tên" />
                                                </VCol>

                                                <!-- 👉 Last Name -->
                                                <VCol md="6" cols="12">
                                                    <select class="form-control">
                                                        <!-- <option v-for="gt in GioiTinh" :value="gt.value">{{ gt.name }}
                                                        </option> -->
                                                    </select>
                                                </VCol>

                                                <!-- 👉 Email -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="E-mail" placeholder="johndoe@gmail.com"
                                                        type="email" />
                                                </VCol>

                                                <!-- 👉 Organization -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Ngày sinh" placeholder="ThemeSelection" />
                                                </VCol>

                                                <!-- 👉 Phone -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Số điện thoại" placeholder="+1 (917) 543-9876" />
                                                </VCol>



                                                <!-- 👉 State -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Địa chỉ" placeholder="New York" />
                                                </VCol>

                                                <!-- 👉 Zip Code -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Phường Xã" placeholder="10001" />
                                                </VCol>

                                                <!-- 👉 Country -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Quận Huyện" placeholder="Select Country" />
                                                </VCol>

                                                <!-- 👉 Language -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Tỉnh Thành phố" placeholder="Select Language" />
                                                </VCol>

                                              
                                                <!-- 👉 Form Actions -->
                                                <VCol cols="12" class="d-flex flex-wrap gap-4">
                                                    <VBtn>Cập nhật</VBtn>
                                                    
          
                                                </VCol>
                                            </VRow>
                                        </VForm>
                                    </VCardText>
                                </VCard>
                            </VCol>

                        </VRow>
                    </div>
                    <div class="tab-pane" id="DatLaiMatKhau" role="tabpanel" aria-labelledby="DatLaiMatKhau-tab">
                        <VRow>
                            <!-- SECTION: Change Password -->
                            <VCol cols="12">
                                <VCard title="Đổi mật khẩu">
                                    <VForm>
                                        <VCardText>
                                            <!-- 👉 Current Password -->

                                            <!-- 👉 New Password -->
                                            <VRow>
                                                <div class="col-12">
                                                    <p class="text-center text-success"></p>
                                                </div>
                                                <VCol cols="12">
                                                    <VTextField label="Nhập mật khẩu mới" placeholder="Nhập mật khẩu mới"
                                                        type="password" />

                                                </VCol>
                                                <VCol cols="12">
                                                    <VTextField label="Nhập lại mật khẩu mới"
                                                        placeholder="Nhập lại mật khẩu mới" type="password" />
                                                </VCol>
                                            </VRow>
                                        </VCardText>


                                        <!-- 👉 Action Buttons -->
                                        <VCardText class="d-flex flex-wrap gap-4">
                                            <div class="row w-100 mb-3">
                                                <div class="col-9">

                                                </div>
                                                <div class=col-3>
                                                    <VBtn class="bg bg-primary">
                                                        Tạo mật khẩu
                                                    </VBtn>
                                                </div>
                                            </div>
                                        </VCardText>
                                    </VForm>
                                </VCard>
                            </VCol>
                            <!-- !SECTION -->

                        </VRow>

                    </div>
                    <div class="tab-pane" id="DanhSachDonHang" role="tabpanel" aria-labelledby="DanhSachDonHang-tab">
                        <v-table fixed-header height="500px">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Calories
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item,i in products" :key="item.name">
                            <td>
                              {{ i+1 }}
                            </td>
                            <td><img :src="item.img" class="img-fluid" style="width: 100px; height: 100px;" alt=""
                                    srcset=""></td>
                            <td>{{ item.name }}</td>
                            <td>
                                {{ item.soluong }}
                            </td>
                            <td>{{ item.gia }}</td>
                            
                        </tr>
                    </tbody>
                </v-table></div>
                    <div class="tab-pane" id="LichSuMuaHang" role="tabpanel" aria-labelledby="LichSuMuaHang-tab">
                        <v-table fixed-header height="500px">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Calories
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item,i in products" :key="item.name">
                            <td>
                              {{ i+1 }}
                            </td>
                            <td><img :src="item.img" class="img-fluid" style="width: 100px; height: 100px;" alt=""
                                    srcset=""></td>
                            <td>{{ item.name }}</td>
                            <td>
                                {{ item.soluong }}
                            </td>
                            <td>{{ item.gia }}</td>
                            
                        </tr>
                    </tbody>
                </v-table></div>
                </div>
            </VCard>
        </VCol>

    </VRow>
</template>
<style>
.table-dark {
    --bs-table-color: #fff;
    --bs-table-bg: rbga(0, 0, 0, 0);
    --bs-table-border-color: #4d5154;
    --bs-table-striped-bg: #2c3034;
    --bs-table-striped-color: #fff;
    --bs-table-active-bg: #373b3e;
    --bs-table-active-color: #fff;
    --bs-table-hover-bg: #323539;
    --bs-table-hover-color: #fff;
    color: var(--bs-table-color);
    border-color: var(--bs-table-border-color);
}

</style>