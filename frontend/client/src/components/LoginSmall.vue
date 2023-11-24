<template>
    <div v-if="nvvv == ''" class="card p-2 " style="border-radius: 20px; background-color: rgba(0, 255, 4, 0.1);">
        <!-- Nav tabs -->
        <h4 class="text-white text-center">ĐĂNG NHẬP NHANH</h4>
        <!-- Tab panes -->
        <div class="tab-content  p-2 m-2" style="border-radius: 20px; background-color: rgba(0, 255, 125, 0.5);">
            <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <VRow>
                    <VCol cols="12">
                        <VTextField class="bg bg-white text-dark" :ref="'TKKH_Email'" v-model="TKKH.TKKH_Email"
                            label="Email" placeholder="Email" type="email" :error-messages="errors.TKKH_Email" />

                    </VCol>
                    <VCol cols="12">
                        <VTextField class="bg bg-white text-dark" :ref="'TKKH_MatKhau'" v-model="TKKH.TKKH_MatKhau"
                            label="Mật khẩu" placeholder="Mật khẩu" :type="isTKNV_MatKhauVisible ? 'text' : 'password'"
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
                        <v-button class="w-100 btn btn-secondary" @click="this.$router.push('/dangky')">Đăng ký</v-button>
                    </v-col>

                </VRow>
            </div>

        </div>
    </div>
    <div v-if="nvvv !== ''" class="card p-2 " style="border-radius: 20px; background-color: rgba(0, 255, 4, 0.1);">
        <!-- Nav tabs -->
        <h4 class="text-white text-center">KHÁCH HÀNG</h4>
        <!-- Tab panes -->
        <div class="tab-content  p-2 m-2" style="border-radius: 20px; background-color: rgba(0, 255, 125, 0.5);">
           <div class="table-responsive">
            <table class="table table-dark">
                <tbody>
                    <tr class="">
                        <th class="col-4">Họ Tên</th>
                        <td class="col-8">{{ KH_Name }}</td>
                    </tr>
                    <tr class="">
                        <th >Email</th>
                        <td>{{ nvvv.TKKH_Email }}</td>
                    </tr>
                    
                    <tr class="">
                        <th >Hạng mức</th>
                        <td>{{KH_HangMuc.HM_TenHangMuc }}</td>
                    </tr>
                </tbody>
            </table>
           </div>
           
        </div>
    </div>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>

import { mapGetters } from "vuex";
import { handle } from "../common/promise"
import axios from "axios";

export default {
    name: 'LoginSmall',
    mounted() {
        this.getNV()
        this.GetNameKH()
    },
    created() {
        this.interval = setInterval(() => {
            this.getNV()
        }, 5000)
    },
    data() {
        return {
            TKKH: {},
            Email: "",
            KH_Name : "",
            CorrectPass: "",
            errors: {
                TKKH_Email: "",
                TKKH_MatKhau: "",
            },
            isTKNV_MatKhauVisible: ref(false),
            loading: false,
            nvvv: '',
            KH_HangMuc: "",
        }
    },
    computed: {
        ...mapGetters({
            loggedInEmployee: "khachhang/loggedInEmployee",
        }),
    },
    methods: {
        GetNameKH(){
            axios.get(`http://localhost:3000/api/thongtinkhachhang/GetName/`+this.nvvv.TKKH_MaKH)
            .then(res=>{
                this.KH_Name = res.data
            })
            .catch(err=>{
                console.log(err)
            })
            axios.get(`http://localhost:3000/api/hangmuc/`+this.nvvv.TKKH_HangMuc)
            .then(res=>{
                this.KH_HangMuc = res.data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        
        getNV() {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvvv = JSON.parse(localStorage.getItem("khachhang"))
            }
            console.log(this.nvvv);
        },
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
                window.location.reload()
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

            return !Object.values(this.errors).some((error) => error);
        },
        async onSubmit() {

            if (this.validateInput() == false) {
                return;
            }
            this.handleLogin(this.TKKH);

        },
    }
}
</script>
<style>
.navitem .active {
    background-color: rgb(0, 255, 0);
    color: white;
}

.navlinks {
    color: gray;
}

.form-label {
    color: white;
}

.navitem:hover {
    background-color: rgb(146, 238, 146);
    color: white;
}
</style>