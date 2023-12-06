<script>
import { mapGetters } from "vuex";
import { handle } from "../common/promise"

export default {
    name: "DangNhap",
    data() {
        return {
            TKKH: {
                TKKH_Email: "",
                TKKH_MatKhau: "",
            },
            Email: "",
            CorrectPass: "",
            errors: {
                TKKH_Email: "",
                TKKH_MatKhau: "",
            },
            isTKNV_MatKhauVisible: ref(false),
            loading: false,
            OkeAll: ref()
            
        }
    },
    computed: {
        ...mapGetters({
            loggedInEmployee: "khachhang/loggedInEmployee",
        }),
    },
    created() {
        if (!this.loggedInkhachhang) {
            this.$router.push("/dangnhap");
        }
    },
    methods: {
        async handleLogin(KhachHang) {
            this.loading = true;
            console.log(KhachHang)
            const [error, data] = await handle(
                this.$store.dispatch("loginEmloyee", KhachHang)
            );
            if (error) {
                console.log(error);
                this.loading = false;
            } else {
                this.$router.push("/");
                console.log(data)
            }
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
        GetPass(TKKH_Email, TKKH_MatKhau) {
            axios.get(`http://localhost:3000/api/khachhang/GetPass/${TKKH_Email}/${TKKH_MatKhau}`).then(res => {
                this.CorrectPass = res.data
                console.log(this.CorrectPass)

            })
        },
        async validateInput() {
            await this.GetEmailAccount(this.TKKH.TKKH_Email)
            await this.GetPass(this.TKKH.TKKH_Email, this.TKKH.TKKH_MatKhau)
            this.errors.TKKH_Email = "";
            this.errors.TKKH_MatKhau = "";
            if (!this.TKKH.TKKH_Email.trim()) {
                this.errors.TKKH_Email = "Vui lòng nhập email";
            } else if (!/^\S+@\S+\.\S+$/.test(this.TKKH.TKKH_Email)) {
                this.errors.TKKH_Email = "Email không hợp lệ";
            } else if (this.Email !== this.TKKH.TKKH_Email) {
                this.errors.TKKH_Email = "Email không tồn tại";
            } 

            if (!this.TKKH.TKKH_MatKhau.trim()) {
                this.errors.TKKH_MatKhau = "Vui lòng nhập mật khẩu";
            } else if (this.CorrectPass === false) {
                this.errors.TKKH_MatKhau = "Mật khẩu không chính xác";
            }

            this.OkeAll = !Object.values(this.errors).some((error) => error);
        },
        async onSubmit() {

            this.validateInput() 
            if(this.OkeAll == true){
                this.handleLogin(this.TKKH);
            }
        },
    }
}
</script>
<template>
    <div class="bg" style="height: 900px;">
        <div class="cardnew m-5">
            <VCard class="w-100 p-2" style="border-radius: 30px; background-color: rgba(79, 78, 78, 0.8);">
                <VCardItem class="justify-center">
                    <img src="@/assets/images/KingBookLogo(Big).png" class="img-fluid w-100">
                </VCardItem>

                <VCardText class="pt-2">
                    <h1 class="text-center text-h5 mb-1">
                        ĐĂNG NHẬP
                    </h1>
                </VCardText>

                <VCardText>
                    <VRow>
                        <VCol cols="12">
                            <VTextField :ref="'TKKH_Email'" v-model="TKKH.TKKH_Email" label="Email" placeholder="Email"
                                type="email" :error-messages="errors.TKKH_Email" />

                        </VCol>
                        <VCol cols="12">
                            <VTextField :ref="'TKKH_MatKhau'" v-model="TKKH.TKKH_MatKhau" label="Mật khẩu"
                                placeholder="Mật khẩu" :type="isTKNV_MatKhauVisible ? 'text' : 'password'"
                                :append-inner-icon="isTKNV_MatKhauVisible ? 'bx-hide' : 'bx-show'"
                                @click:append-inner="isTKNV_MatKhauVisible = !isTKNV_MatKhauVisible"
                                :error-messages="errors.TKKH_MatKhau" />
                        </VCol>

                        <v-col cols="6">
                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"></div>
                            <v-btn class="w-100 bg bg-dark text-white" @click="onSubmit">Đăng Nhập</v-btn>
                        </v-col>
                        <v-col cols="6">
                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"></div>
                            <v-button class="w-100 btn btn-secondary" @click="this.$router.push('/trangchu')">Hủy</v-button>
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <p>Nếu bạn chưa có tài khoản hãy đăng ký tại đây
                                <v-button class="btn btn-warning" @click="this.$router.push('/dangky')">Đăng ký</v-button>
                            </p>
                        </v-col>
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
    height: 97vh;
    /* Chiều cao cửa sổ trình duyệt */
    margin: 0;
}

.cardnew {
    width: 700px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.3);
}
</style>