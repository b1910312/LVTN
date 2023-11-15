<script>
import { handle } from "../common/promise"
import moment from "moment";

export default {
    name: "dangky",
    data() {
        return {
            message: "",
            TKKH: {
                TKKH_MaKH: "",
                TKKH_MatKhau: "12345678",
                TKKH_Email: "",
                TKKH_HangMuc: "KBHM001",
                TKKH_TrangThai: "1",
                TKKH_NgayTao: "",
                TKKH_NgayCapNhat: ""
            },
            TTKH: {
                KH_MaKH: "",
                KH_HoTen: "",
                KH_SoDienThoai: "",
                KH_NgaySinh: "",
                KH_GioiTinh: "",
                KH_NgayTao: "",
                KH_NgayCapNhat: ""
            },
            DC: {
                DC_MaDT: "",
                DC_DiaChi: "",
                DC_PhuongXa: "",
                DC_QuanHuyen: "",
                DC_TinhTP: ""
            },
            errors: {
                TKKH_Email: "",
                pass1: "",
                pass2: "",
                KH_SoDienThoai: "",
                KH_NgaySinh: "",
                KH_HoTen: "",
                DC_DiaChi: "",
                DC_PhuongXa: "",
                DC_QuanHuyen: "",
                DC_TinhTP: "",
            },
            GH: {
                GH_MaGH: "",
                GH_MaKH: "",
                GH_NgayTao: "",
                GH_NgayCapNhat: ""
            },
            GioiTinh: [
                {
                    name: "Nữ",
                    value: "1"
                },
                {
                    name: "Nam",
                    value: "2"
                },
            ],
            LastID: "",
            NewID: "",
            So: "",
            Chu: "",
            LastID1: "",
            NewID1: "",
            So1: "",
            Chu1: "",
            pass1: "",
            pass2: "",
            Email: "",
        }
    },
    mounted() {
        this.GetLastID();
        this.GetLastID1();
    },
    methods: {
        addKhachHang() {
            const now = moment();
            this.TTKH.KH_NgayTao = now.format("DD-MM-YYYY");
            this.DC.DC_NgayTao = now.format("DD-MM-YYYY");
            this.TKKH.TKKH_NgayTao = now.format("DD-MM-YYYY");
            this.GH.GH_NgayTao = now.format("DD-MM-YYYY");
            this.TKKH.TKKH_MaKH = this.TTKH.KH_MaKH;
            this.DC.DC_MaDT = this.TTKH.KH_MaKH;
            this.GH.GH_MaKH = this.TTKH.KH_MaKH;
            console.log("Truoc khi goi api")
            // Gọi API thêm dữ liệu
            axios.post('http://localhost:3000/api/thongtinkhachhang', this.TTKH)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        console.log("gọi api 1 thành công")

                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })

            console.log("Truoc khi goi api dia chi")

            axios.post('http://localhost:3000/api/diachi', this.DC)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        console.log("gọi api 2 thành công")

                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })
            console.log("Truoc khi goi api khachhang")

            axios.post('http://localhost:3000/api/khachhang', this.TKKH)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        console.log("gọi api 3 thành công")

                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })
            console.log("Truoc khi goi giohang")

            axios.post('http://localhost:3000/api/giohang', this.GH)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        console.log("gọi api 4 thành công")
                        this.message = "Đăng ký thành công vui lòng chuyển sang trang đăng nhập để đăng nhập"

                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })
        },
        GetLastID() {
            axios.get(`http://localhost:3000/api/thongtinkhachhang/getid/getlastttkhma`).then(res => {
                this.LastID = res.data
                this.TachKBS()
                this.Increase()
                this.TTKH.KH_MaKH = this.NewID
                console.log(this.TTKH.KH_MaKH)
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
            let [Text, result] = this.LastID.split("H");
            this.So = result;
            console.log(result);
            this.Chu = Text1;
            console.log(Text1);
        },
        GetEmailAccount(TKKH_Email) {
            axios.get(`http://localhost:3000/api/khachhang/GetByEmail/${TKKH_Email}/`).then(res => {
                this.Email = res.data.TKKH_Email
                console.log("data")
                console.log(res.data)
                console.log("Email")
                console.log(this.Email)

            })
        },
        GetLastID1() {
            axios.get(`http://localhost:3000/api/giohang/getid/getlastghma`).then(res => {
                this.LastID1 = res.data
                this.TachKBS1()
                this.Increase1()
                this.GH.GH_MaGH = this.NewID1
                console.log(this.GH.GH_MaGH)
            })
        },
        Increase1() {
            // Chuyển đổi chuỗi thành số nguyên
            let SoNguyen = parseInt(this.So1);

            // Tăng giá trị của số nguyên
            SoNguyen += 1;

            // Chuyển đổi số nguyên thành chuỗi
            this.So1 = String(SoNguyen).padStart(3, "0");
            this.NewID1 = this.Chu1 + this.So1;
            console.log(this.NewID1)
        },
        TachKBS1() {
            let [Text1, result1] = this.LastID1.split("0");
            let [Text, result] = this.LastID1.split("GH");
            this.So1 = result;
            console.log(result1);
            this.Chu1 = Text1;
            console.log(Text1);
        },
        async validateInput() {
            await this.GetEmailAccount(this.TKKH.TKKH_Email)
            this.errors.TKKH_Email = "";
            this.errors.TKKH_MatKhau = "";
            this.errors.pass1 = "";
            this.errors.pass2 = "";
            this.errors.KH_HoTen = "";
            this.errors.KH_SoDienThoai = "";
            this.errors.KH_NgaySinh = "";

            if (!this.TKKH.TKKH_Email.trim()) {
                this.errors.TKKH_Email = "Vui lòng nhập email";
            } else if (!/^\S+@\S+\.\S+$/.test(this.TKKH.TKKH_Email)) {
                this.errors.TKKH_Email = "Email không hợp lệ";
            } else if (this.Email === this.TKKH.TKKH_Email) {
                this.errors.TKKH_Email = "Email đã tồn tại tồn tại";
            }

            if (!this.pass1.trim()) {
                this.errors.pass1 = "Vui lòng nhập mật khẩu";
            }
            if (!this.pass2.trim()) {
                this.errors.pass2 = "Vui lòng nhập lại mật khẩu";
            } else if (this.pass1 != this.pass2) {
                this.errors.pass2 = "Mật khẩu không khớp";
            }
            else if (this.pass1 == this.pass2) {
                this.TKKH.TKKH_MatKhau = this.pass2;
                console.log("CapNhatMatKhau")
                console.log(this.TKKH.TKKH_MatKhau)
            }


            if (!this.TTKH.KH_HoTen.trim()) {
                this.errors.KH_HoTen = "Vui lòng nhập họ tên";
            }
            if (!this.TTKH.KH_NgaySinh.trim()) {
                this.errors.KH_NgaySinh = "Vui lòng nhập ngày sinh";
            }
            if (!this.TTKH.KH_SoDienThoai.trim()) {
                this.errors.KH_SoDienThoai = "Vui lòng nhập số điện thoại";
            }
            if (!this.DC.DC_DiaChi.trim()) {
                this.errors.DC_DiaChi = "Vui lòng nhập địa chỉ";
            }

            if (!this.DC.DC_PhuongXa.trim()) {
                this.errors.DC_PhuongXa = "Vui lòng nhập phường xã";
            }
            if (!this.DC.DC_QuanHuyen.trim()) {
                this.errors.DC_QuanHuyen = "Vui lòng nhập quận huyện";
            }

            if (!this.DC.DC_TinhTP.trim()) {
                this.errors.DC_TinhTP = "Vui lòng nhập tỉnh thành phố";
            }


            return !Object.values(this.errors).some((error) => error);
        },
        async onSubmit() {
            if (await this.validateInput()) {
                this.addKhachHang();
            }
            else {
                return;
            }

            // this.handleLogin(this.TKKH);

        },
    }
}
</script>
<template>
    <div class="bg" style="height: 1200px;">
        <div class="cardnew m-5">
            <VCard class="w-100 p-2" style="border-radius: 30px; background-color: rgba(79, 78, 78, 0.8);">
                <VCardItem class="justify-center">
                    <img src="@/assets/images/KingBookLogo(Big).png" class="img-fluid w-100">
                </VCardItem>

                <VCardText class="pt-2">
                    <h1 class="text-center text-h5 mb-1">
                        ĐĂNG KÝ
                    </h1>
                </VCardText>

                <VCardText>
                    <VRow>
                        <!-- TKNV_MaNV -->
                        <VCol cols="12">
                            <p class="text-success text-center">{{ message }}</p>
                        </VCol>
                        <VCol cols="12">
                            <VTextField autofocus v-model="TKKH.TKKH_Email" type="email" :error-messages="errors.TKKH_Email"
                                placeholder="Nhập email của bạn tại đây" label="Email" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField v-model="pass1" :error-messages="errors.pass1"
                                placeholder="Nhập mật khẩu của bạn tại đây" label="Mật khẩu" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField v-model="pass2" :error-messages="errors.pass2"
                                placeholder="Nhập lại mật khẩu của bạn tại đây" label="Nhập lại mật khẩu" />
                        </VCol>
                        <VCol cols="5">
                            <VTextField v-model="TTKH.KH_HoTen" :error-messages="errors.KH_HoTen"
                                placeholder="Nhập Họ tên của bạn tại đây" label="Họ tên" />
                        </VCol>
                        <VCol cols="4">
                            <VTextField v-model="TTKH.KH_NgaySinh" :error-messages="errors.KH_NgaySinh"
                                placeholder="Nhập Ngày sinh" type="date" label="Ngày sinh" />
                        </VCol>
                        <VCol cols="3">
                            <VTextField v-model="TTKH.KH_GioiTinh" placeholder="Nhập Giới tính" label="Giới tính" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField v-model="TTKH.KH_SoDienThoai" :error-messages="errors.KH_SoDienThoai"
                                placeholder="Nhập Số điện thoại" label="Số điện thoại" />
                        </VCol>
                        <VCol cols="6">
                            <VTextField v-model="DC.DC_DiaChi" :error-messages="errors.DC_DiaChi" placeholder="Nhập Địa chỉ"
                                label="Địa chỉ" />
                        </VCol>
                        <VCol cols="6">
                            <VTextField v-model="DC.DC_PhuongXa" :error-messages="errors.DC_PhuongXa"
                                placeholder="Nhập Phường/ Xã" label="Phường/ Xã" />
                        </VCol>
                        <VCol cols="6">
                            <VTextField v-model="DC.DC_QuanHuyen" :error-messages="errors.DC_QuanHuyen"
                                placeholder="Nhập Quận/ Huyện" label="Quận/ Huyện" />
                        </VCol>
                        <VCol cols="6">
                            <VTextField v-model="DC.DC_TinhTP" :error-messages="errors.DC_TinhTP"
                                placeholder="Nhập Tỉnh/ Thành phô" label="Tỉnh/ Thành phô" />
                        </VCol>

                        <!-- TKNV_MatKhau -->
                        <VCol cols="6">

                            <!-- remember me checkbox -->
                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">

                            </div>
                            <!-- login button -->
                            <VBtn class="w-100 bg bg-dark text-white" @click="addKhachHang()">
                                Đăng ký
                            </VBtn>
                        </VCol>
                        <VCol cols="6">

                            <!-- remember me checkbox -->
                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">

                            </div>
                            <!-- login button -->
                            <v-button class="w-100 btn btn-secondary" @click="this.$router.push('/trangchu')">
                                Hủy
                            </v-button>
                        </VCol>
                        <VCol cols="12" class="text-center">
                            <p>Nếu bạn chưa có tài khoản hãy đăng ký tại đây
                                <v-button class="btn btn-warning" @click="this.$router.push('/dangnhap')">
                                    Đăng nhập
                                </v-button>
                            </p>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>
<style>
.bg {
    display: flex;
    justify-content: center;
    /* Giữa theo chiều ngang */
    align-items: center;
    /* Giữa theo chiều dọc */
    height: 100%;
    /* Chiều cao cửa sổ trình duyệt */
    margin: 0;
}

.cardnew {
    width: 700px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(39, 39, 39, 0.3);
}
</style>