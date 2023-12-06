<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: "CuaHang",
    data() {
        return {

            GioiTinh: [
                { name: "Nữ", value: "1" },
                { name: "Nam", value: "2" }
            ],
            DonHang: [],
            TatCaDonHang: [],
            count: "",
            nvv: "",
            KH: "",
            KH1: "",
            VT: "",
            DC: "",
            DH_CT: "",
            MatKhau: "",
            MKMoi: "",
            CorrectPassMessage: "",
            NhapLaiMKMoi: "",
            Correct: false,
            CTDH: "",
            DC1: "",
            TongCong: 0,
            dialog: false,
            dialog5: false,
            ResetPassMessage: "",
            updateLogoMessage: "",
            updateThongTinMessage: "",
        }
    },
    created() {
        const khachhangchitiet = JSON.parse(localStorage.getItem("khachhang"))
        if (!khachhangchitiet ) {
            this.$router.push("/");
        }
        if (khachhangchitiet.TKKH_TrangThai != 1 ) {
            this.$router.push("/");
        }
    },
    mounted() {
        this.getNV()
        this.GetOneNV(this.nvv.TKKH_MaKH)
        this.GetOneNV1(this.nvv.TKKH_MaKH)
        this.GetOneVT(this.nvv.TKKH_HangMuc)
        this.GetDiaChi(this.nvv.TKKH_MaKH)
        this.GetDiaChi1(this.nvv.TKKH_MaKH)
        this.GetDonHang(this.nvv.TKKH_MaKH)
        this.GetDonHangAll(this.nvv.TKKH_MaKH)
        this.CountGH()
        this.interval = setInterval(() => {
            // Call the API
            axios.get('http://localhost:3000/api/chitietgiohang/getbyMaKH/' + this.nvv.TKKH_MaKH).then((response) => {
                // Update the value of the variable
                this.count = response.data
                console.log(this.count)
            })
        }, 1000)
    },

    methods: {
        DanhGia(MaSach){
            window.open(`http://localhost:8080/chitietsach/` + MaSach)
        },
        checkPasswordMatch() {
            if (this.MKMoi == "") {
                return false;
            }
            if (this.NhapLaiMKMoi == "") {
                return false;
            }
            return this.MKMoi === this.NhapLaiMKMoi;
        },

        updatePassword(id) {
            const now = moment()
            const data = {
                TKKH_MatKhau: this.NhapLaiMKMoi,
                TKKH_NgayCapNhat: now.format("DD-MM-YYYY")
            }
            axios.put('http://localhost:3000/api/khachhang/ResetPassword/' + id, data)
                .then((response) => {
                    this.ResetPassMessage = "Đã cập nhật mật khẩu thành công"
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
            this.MatKhau = ""
            this.MKMoi = ""
            this.NhapLaiMKMoi = ""
        },
        GetPass() {
            axios.get(`http://localhost:3000/api/khachhang/getpass/` + this.nvv.TKKH_Email + `/` + this.MatKhau)
                .then(res => {
                    this.Correct = res.data
                    if (!res.data) {
                        this.CorrectPassMessage = "Mật khẩu không chính xác"
                    } else {
                        this.CorrectPassMessage = ""
                    }
                })
        },
        DaNhanHang(MaDH) {
            const now = moment();
            let data = {
                DH_NgayCapNhat: now.format("DD-MM-YYYY"),
                DH_TrangThai: 5
            }
            // Gọi API để cập nhật sản phẩm
            axios.put("http://localhost:3000/api/donhang/capnhattrangthai/" + MaDH, data).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo
                console.log(data)
                this.GetDonHang(this.nvv.TKKH_MaKH)
                this.GetDonHangAll(this.nvv.TKKH_MaKH)
                // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
                this.GetDonHang();
            }).catch(error => {
                alert(error);
            });
            this.dialog = false

        },
        HuyDonHang(DH_Ma) {
            axios.delete("http://localhost:3000/api/donhang/" + DH_Ma).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo

            }).catch(error => {
                alert(error);
            });
            axios.delete("http://localhost:3000/api/chitietdonhang//deletebyDH/" + DH_Ma).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo
                this.GetDonHang(this.nvv.TKKH_MaKH)
                this.GetDonHangAll(this.nvv.TKKH_MaKH)
                this.dialog = false
                // Sau đó, chuyển hướng người dùng
            }).catch(error => {
                alert(error);
            });
        },
        GetTrangThai(id) {
            switch (id) {
                case 0:
                    return "Chưa xác nhận";
                case 1:
                    return "Đã xác nhận";
                case 2:
                    return "Đã thanh toán";
                case 3:
                    return "Đang vận chuyển";
                case 4:
                    return "Đang giao"
                case 5:
                    return "Đã giao";
                default:
                    return null;
            }
        },
        CapNhatThongTin() {
            const now = moment();
            this.KH.KH_NgayCapNhat = now.format("DD-MM-YYYY");
            this.DC.DC_NgayCapNhat = now.format("DD-MM-YYYY");
            // Gọi API để cập nhật sản phẩm
            axios.put("http://localhost:3000/api/thongtinkhachhang/" + this.KH.KH_MaKH, this.KH).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo
                // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
            }).catch(error => {
                alert(error);
            });

            axios.put("http://localhost:3000/api/diachi/" + this.KH.KH_MaKH, this.DC).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo
                // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
            }).catch(error => {
                alert(error);
            });
            this.updateThongTinMessage = "Cập nhật thông tin thành công"
            this.GetOneNV(this.nvv.TKKH_MaKH)
            this.GetDiaChi(this.nvv.TKKH_MaKH)
            this.GetOneNV1(this.nvv.TKKH_MaKH)
            this.GetDiaChi1(this.nvv.TKKH_MaKH)
        },
        XemChiTietDonHang(MaDH) {
            this.dialog = true
            this.GetOneDH(MaDH)
            this.GetCTDH(MaDH)


        },
        async UpdateLogo() {
            const formData = new FormData();
            formData.append("image", this.imageFile);

            try {
                const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/KH/" + this.KH.KH_MaKH, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                // this.$router.push("/quanlynxb");
                this.updateLogoMessage = "Cập nhật ảnh đại diện thành công"
                console.log("Tệp ảnh đã được tải lên thành công:", response.data);
            } catch (error) {
                console.error("Lỗi khi tải lên tệp ảnh:", error);
            }

        },

        setImageFile(event) {
            this.imageFile = event.target.files[0];
        },
        GetOneNV(id) {
            axios.get('http://localhost:3000/api/thongtinkhachhang/' + id)
                .then((response) => {
                    this.KH = response.data;
                    console.log(response);
                    console.log(this.KH);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetCTDH(MaDH) {
            axios.get('http://localhost:3000/api/chitietdonhang/getbyDHMa/' + MaDH)
                .then((response) => {
                    this.CTDH = response.data;
                    this.TongCong = this.CTDH.reduce((acc, ctdh) => acc + ctdh.CTDH_ThanhTien, 0);
                    console.log(response);
                    console.log(this.CTDH);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetOneDH(id) {
            axios.get('http://localhost:3000/api/donhang/' + id)
                .then((response) => {
                    this.DH_CT = response.data;
                    console.log(response);
                    console.log(this.DH_CT);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },

        GetDonHang(id) {
            axios.get('http://localhost:3000/api/donhang/undone/' + id)
                .then((response) => {
                    this.DonHang = response.data;
                    console.log(response);
                    console.log(this.DonHang);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetDonHangAll(id) {
            axios.get('http://localhost:3000/api/donhang/all/' + id)
                .then((response) => {
                    this.TatCaDonHang = response.data;
                    console.log(response);
                    console.log(this.TatCaDonHang);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetOneNV1(id) {
            axios.get('http://localhost:3000/api/thongtinkhachhang/' + id)
                .then((response) => {
                    this.KH1 = response.data;
                    console.log(response);
                    console.log(this.KH1);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetOneVT(id) {
            axios.get('http://localhost:3000/api/hangmuc/' + id)
                .then((response) => {
                    this.VT = response.data;
                    console.log(response);
                    console.log(this.VT);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetDiaChi(id) {
            axios.get('http://localhost:3000/api/diachi/' + id)
                .then((response) => {
                    this.DC = response.data;
                    this.DC1 = response.data;
                    console.log(response);
                    console.log(this.DC);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetDiaChi1(id) {
            axios.get('http://localhost:3000/api/diachi/' + id)
                .then((response) => {
                    this.DC1 = response.data;
                    console.log(response);
                    console.log(this.DC1);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

        },
        GetAVT(KH_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/KH/" + KH_Ma
            // console.log(logo)
            return logo
        },
        getNV() {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvv = JSON.parse(localStorage.getItem("khachhang"))
            }
            console.log(this.nvv);
        },
        CountGH() {
            axios.get(`http://localhost:3000/api/chitietgiohang/getbyMaKH/` + this.nvv.TKKH_MaKH).then(res => {
                this.count = res.data
                console.log("newid")
                console.log(this.count.length)
            })
        },
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
                            <VCol cols="3"></VCol>
                            <VCol cols="6"> <img :src="GetAVT(nvv.TKKH_MaKH)"  class="img-fluid mx-auto"
                                    style="border-radius: 15px; width: auto; height: 250px;" alt="">
                            </VCol>
                            <VCol cols="3"></VCol>
                            <VCol cols="12">
                                <VRow>
                                    <VCol cols="6">
                                        <v-button @click="this.$router.push(`/giohang`)">

                                            <v-badge ref="badgeRef" color="error" class="mb-5" :content="count.length"
                                                inline>
                                                <h6 class="mt-5">
                                                    <font-awesome-icon :icon="['fas', 'cart-shopping']" /> Giỏ hàng
                                                </h6>
                                            </v-badge>
                                        </v-button>

                                    </VCol>

                                    <VCol cols="6 mt-5">
                                        <h6><font-awesome-icon :icon="['fas', 'medal']" /> Hạng mức: {{ VT.HM_TenHangMuc }}
                                        </h6>
                                    </VCol>
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
                                                        <h5 style="font-weight: bold;">{{ KH1.KH_HoTen }}</h5>
                                                    </th>
                                                    <td class="col-2"></td>
                                                </tr>
                                                <tr class="row w-100 ps-4">
                                                    <th class="col-2"><font-awesome-icon
                                                            :icon="['fas', 'map-location-dot']" />
                                                    </th>
                                                    <td class="col-10">{{ DC1.DC_DiaChi }}, {{ DC1.DC_PhuongXa }}, {{
                                                        DC1.DC_QuanHuyen }}, {{ DC1.DC_TinhTP }}</td>
                                                </tr>

                                                <tr class="row w-100 ps-4">
                                                    <th class="col-2"><font-awesome-icon :icon="['fas', 'phone']" /></th>
                                                    <td class="col-10">{{ KH1.KH_SoDienThoai }}</td>
                                                </tr>
                                                <tr class="row w-100 ps-4">
                                                    <th class="col-2"><font-awesome-icon :icon="['fas', 'envelope']" /></th>
                                                    <td class="col-10">{{ nvv.TKKH_Email }}</td>
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
                                                <VBtn color="primary" @click="dialog5 = true">
                                                    <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                                                    <span class="d-none d-sm-block">Cập nhật ảnh đại diện</span>
                                                </VBtn>
                                                <v-dialog v-model="dialog5">
                                                    <div class="card w-75 mx-auto text-start bg bg-white p-5"
                                                        style="height: auto;">
                                                        <div class="col-11">
                                                            <h4>Cập nhật Ảnh đại diện</h4>

                                                        </div>

                                                        <VCol cols="12">
                                                            <VForm @submit.prevent="UpdateLogo">
                                                                <p class="text-center text-success my-1"> {{
                                                                    updateLogoMessage }}</p>
                                                                <VFileInput label="Avatar" type="file" ref="imageInput"
                                                                    @change="setImageFile" />
                                                                <div class="row w-100 mt-2">
                                                                    <div class="col-8"></div>
                                                                    <div class="d-flex gap-4 col-2">
                                                                        <VBtn class="ms-5" type="Thêm">
                                                                            Cập nhật
                                                                        </VBtn>
                                                                    </div>
                                                                    <div class="d-flex gap-4 col-1">
                                                                        <VBtn class="ms-5 bg bg-secondary"
                                                                            @click="dialog5 = false">
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
                                                <VCol cols="12" v-if="updateThongTinMessage != ''">
                                                    <p class="text-center text-success my-1"> {{
                                                        updateThongTinMessage }}</p>
                                                </VCol>
                                                <!-- 👉 Address -->
                                                <VCol cols="12" md="6">
                                                    <VTextField readonly label="Mã Khách hàng" v-model="KH.KH_MaKH"
                                                        placeholder="123 Main St, New York, NY 10001" />
                                                </VCol>
                                                <!-- 👉 First Name -->
                                                <VCol md="6" cols="12">
                                                    <VTextField placeholder="Nhập họ tên" v-model="KH.KH_HoTen"
                                                        label="Họ tên" />
                                                </VCol>

                                                <!-- 👉 Last Name -->
                                                <VCol md="6" cols="12">
                                                    <select class="form-control h-100 "
                                                        style="background-color: rgba(0, 0, 0, 0.05 ); color: white; border-color: rgba(255, 255, 255,0.3);"
                                                        v-model="KH.KH_GioiTinh">
                                                        <option class="text-dark"
                                                            style="background-color: rgba(0, 0, 0, 0.05 );"
                                                            v-for="gt in GioiTinh" :value="gt.value">{{ gt.name }}
                                                        </option>
                                                    </select>
                                                </VCol>

                                                <!-- 👉 Email -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="E-mail" readonly v-model="nvv.TKKH_Email"
                                                        placeholder="johndoe@gmail.com" type="email" />
                                                </VCol>

                                                <!-- 👉 Organization -->
                                                <VCol cols="12" md="6">
                                                    <VTextField v-model="KH.KH_NgaySinh" type="date" label="Ngày sinh"
                                                        placeholder="ThemeSelection" />
                                                </VCol>

                                                <!-- 👉 Phone -->
                                                <VCol cols="12" md="6">
                                                    <VTextField v-model="KH.KH_SoDienThoai" label="Số điện thoại"
                                                        placeholder="+1 (917) 543-9876" />
                                                </VCol>

                                                <!-- 👉 State -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Địa chỉ" v-model="DC.DC_DiaChi"
                                                        placeholder="New York" />
                                                </VCol>

                                                <!-- 👉 Zip Code -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Phường Xã" v-model="DC.DC_PhuongXa"
                                                        placeholder="10001" />
                                                </VCol>

                                                <!-- 👉 Country -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Quận Huyện" v-model="DC.DC_QuanHuyen"
                                                        placeholder="Select Country" />
                                                </VCol>

                                                <!-- 👉 Language -->
                                                <VCol cols="12" md="6">
                                                    <VTextField label="Tỉnh Thành phố" v-model="DC.DC_TinhTP"
                                                        placeholder="Select Language" />
                                                </VCol>

                                                <VCol cols="8"></VCol>
                                                <!-- 👉 Form Actions -->
                                                <VCol cols="4" class="d-flex flex-wrap gap-4">
                                                    <v-button class="w-100  btn btn-primary" @click="CapNhatThongTin()">Cập
                                                        nhật</v-button>


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
                                                    <p class="text-center text-success">{{ ResetPassMessage }}</p>
                                                </div>
                                                <VCol cols="12">
                                                    <VTextField label="Nhập mật khẩu cũ" v-model="MatKhau"
                                                        @change="GetPass()" :error-messages="CorrectPassMessage"
                                                        placeholder="Nhập mật khẩu cũ" type="password" />

                                                </VCol>
                                                <VCol cols="12">
                                                    <VTextField label="Nhập mật khẩu mới" v-model="MKMoi"
                                                        placeholder="Nhập mật khẩu mới" type="password" />

                                                </VCol>
                                                <VCol cols="12">
                                                    <VTextField label="Nhập lại mật khẩu mới" v-model="NhapLaiMKMoi"
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
                                                    <VBtn class="bg bg-primary" @click="updatePassword(KH.KH_MaKH)"
                                                        :disabled="!checkPasswordMatch() || !Correct">
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
                  
                    <div class="tab-pane" id="LichSuMuaHang" role="tabpanel" aria-labelledby="LichSuMuaHang-tab">
                        <v-table fixed-header height="650">
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        STT
                                    </th>
                                    <th class="text-left">
                                        Mã Đơn hàng
                                    </th>
                                    <th class="text-left">
                                        Số điện thoại
                                    </th>
                                    <th class="text-left">
                                        Địa chỉ
                                    </th>
                                    <th class="text-left">
                                        Ngày Tạo
                                    </th>
                                    <th class="text-left">
                                        Trạng Thái
                                    </th>
                                    <th class="text-left">
                                        Chi tiết
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item, i in TatCaDonHang" :key="item.name">
                                    <td>
                                        {{ i + 1 }}
                                    </td>
                                    <td>{{ item.DH_Ma }}</td>
                                    <td>
                                        {{ item.DH_SoDienThoai }}
                                    </td>
                                    <td>{{ item.DH_DiaChi }}, {{ item.DH_PhuongXa }}, {{ item.DH_QuanHuyen }}, {{
                                        item.DH_TinhTP }}</td>
                                    <td>{{ item.DH_NgayTao }}</td>
                                    <td>{{ GetTrangThai(item.DH_TrangThai) }}</td>
                                    <td>
                                        <v-button @click="XemChiTietDonHang(item.DH_Ma)" class="btn btn-success">
                                            <font-awesome-icon :icon="['fas', 'eye']" />

                                        </v-button>
                                        <v-dialog v-model="dialog" class="w-75">
                                            <VCard>
                                                <VRow>
                                                    <VCol cols="11">
                                                        <VCardText>
                                                            <h4>Chi tiết đơn hàng #{{ DH_CT.DH_Ma }}</h4>
                                                        </VCardText>
                                                    </VCol>
                                                    <VCol cols="1">
                                                        <v-button class="btn btn-danger mt-3"
                                                            @click="dialog = false">Đóng</v-button>
                                                    </VCol>
                                                </VRow>
                                                <VContainer>
                                                    <h5>Thông tin người nhận</h5>
                                                    <VRow>
                                                        <VCol cols="12">
                                                            <div class="table-responsive">
                                                                <v-table fixed-header class="table table-dark">

                            <tbody>
                                <tr class=" w-100">
                                    <td class="col-2">Người nhận: </td>
                                    <td>{{ DH_CT.DH_Ho }} {{ DH_CT.DH_Ten }}</td>
                                </tr>
                                <tr class="">
                                    <td>Số điện thoại: </td>
                                    <td>{{ DH_CT.DH_SoDienThoai }}</td>
                                </tr>
                                <tr class="">
                                    <td>Địa chỉ: </td>
                                    <td>
                                        {{ DH_CT.DH_DiaChi }},
                                        {{ DH_CT.DH_PhuongXa }},
                                        {{ DH_CT.DH_QuanHuyen }},
                                        {{ DH_CT.DH_TinhTP }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
        </VCol>
    </VRow>
    <h5 class="mt-3">Thông tin đơn hàng</h5>
    <VRow>
        <VCol cols="12">
            <div class="table-responsive">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên sách</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                            <th v-if="DH_CT.DH_TrangThai == 5">Đánh giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ctdh, index) in CTDH" :key="ctdh.CTDH_Ma">
                            <td>{{ index + 1 }}</td>
                            <td>{{ ctdh.CTDH_TenSach }}</td>
                            <td>{{ ctdh.CTDH_SoLuong }}</td>
                            <td>{{ ctdh.CTDH_Gia }} VNĐ</td>
                            <td>{{ ctdh.CTDH_ThanhTien }} VNĐ</td>
                            <td v-if="DH_CT.DH_TrangThai == 5">
                                <v-button class="btn text-white" @click="DanhGia(ctdh.CTDH_MaSach)">
                                    <font-awesome-icon style="color:gold" :icon="['fas', 'star']" /> Đánh giá
                                </v-button>
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="4">
            <h5>Tổng cộng: {{ TongCong }} VNĐ</h5>
        </VCol>
        <VCol cols="4">
            <h5>Trạng thái: &nbsp{{ GetTrangThai(DH_CT.DH_TrangThai) }}</h5>
        </VCol>

        <VCol cols="4" v-if="DH_CT.DH_TrangThai != 0 && DH_CT.DH_TrangThai != 5">
            <v-button class="btn text-white w-100" @click="DaNhanHang(DH_CT.DH_Ma)"
                style="background-color: rgba(0,255,4,1)">Đã nhận được hàng</v-button>
        </VCol>
        <VCol cols="4" v-if="DH_CT.DH_TrangThai == 0">
            <v-button class="btn text-white w-50" @click="DaNhanHang(DH_CT.DH_Ma)"
                style="background-color: rgba(0,255,4,1)">Đã nhận được hàng</v-button>
            <v-button class="btn btn-danger text-white w-50" @click="HuyDonHang(DH_CT.DH_Ma)">Hủy đơn hàng</v-button>

        </VCol>
    </VRow>
    </VContainer>
    </VCard>
    </v-dialog>
    </td>
    </tr>
    </tbody>
    </v-table>
    </div>
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