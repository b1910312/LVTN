<template>
    <div class="scroll">
        <div v-for="pr in sach" :key="pr.S_Ma">
            <div class="item mt-2" v-if="pr.S_Ma">
                <div class="card text-white" style="    border-radius: 30px;border: 1px solid rgb(70, 194, 70); background-color: rgba(0, 0, 0, 0.4  );
">
                    <v-img cover height="250" class="mt-5 mx-4" :src="GetThumNail(pr.S_Ma)"></v-img>
                    <v-card-item>
                        <v-card-title>{{ pr.S_Ten }}</v-card-title>
                        <v-card-subtitle>
                            <span class="me-1">{{ pr.S_TacGia }}</span>
                        </v-card-subtitle>
                    </v-card-item>
                    <v-card-item>
                        <h5>Giá: {{ pr.S_Gia }} VNĐ</h5>
                    </v-card-item>

                    <v-divider class="mx-4 mb-1"></v-divider>


                    <v-card-actions>
                        <v-btn v-if="nvv.TKKH_TrangThai !== 1" class="w-100 btn btn-success" color="deep-green-lighten-1" variant="text"
                            @click="GoCTS(pr.S_Ma)">
                            Chi tiết
                        </v-btn>
                        <v-btn v-if="nvv.TKKH_TrangThai !== '' && nvv.TKKH_TrangThai == 1" class="w-50 btn btn-success" color="deep-green-lighten-1" variant="text"
                            @click="GoCTS(pr.S_Ma)">
                            Chi tiết
                        </v-btn>
                        <v-btn v-if="nvv.TKKH_TrangThai !== '' && nvv.TKKH_TrangThai == 1" class="w-50 btn btn-success" color="deep-green-lighten-2" variant="text"
                            @click="ThemChiTietGioHang(pr.S_Ma)">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                        </v-btn>
                    </v-card-actions>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>

import { defineComponent } from 'vue';
import moment from 'moment';
export default defineComponent({
    name: 'ListSanPham_Ngang',
    data() {
        return {
            CTGH: {
                CTGH_Ma: "",
                CTGH_MaGH: "",
                CTGH_MaSach: "",
                CTGH_SoLuong: "",
                CTGH_NgayTao: "",
                CTGH_NgayCapNhat: ""
            },
            nvv: "",
            LastID1: "",
            NewID1: "",
            So1: "",
            Chu1: "",
            nvv: ""
        }
    },
    props: {
        sach: {
            type: Array, // Kiểu dữ liệu là một mảng
        },
    },
    mounted() {
        this.getNV()
        this.GetLastID1()
        console.log(":!2313")
        console.log(this.sach)
    },
    methods: {
        getNV() {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvv = JSON.parse(localStorage.getItem("khachhang"))
            }
            console.log(this.nvv);
        },
        GoCTS(S_Ma) {
            this.$router.push(`/chitietsach/` + S_Ma)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        GetThumNail(S_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
            // console.log(logo)
            return logo
        },

        ThemChiTietGioHang(MaSach) {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvv = JSON.parse(localStorage.getItem("khachhang"))
                axios.get(`http://localhost:3000/api/giohang/getGH/` + this.nvv.TKKH_MaKH)
                    .then(res => {
                        this.CTGH.CTGH_MaGH = res.data
                        axios.get(`http://localhost:3000/api/chitietgiohang/getbysach/` + MaSach + `/` + this.CTGH.CTGH_MaGH)
                            .then(res => {
                                if (res.data == "") {

                                    this.CTGH.CTGH_Ma = this.NewID1
                                    this.CTGH.CTGH_MaSach = MaSach
                                    this.CTGH.CTGH_SoLuong = '1'
                                    this.CTGH.CTGH_NgayTao = moment().format("DD-MM-YYYY")
                                    axios.post(`http://localhost:3000/api/chitietgiohang`, this.CTGH).then(res => {
                                        this.CapNhatLastID()
                                        console.log("Thêm chi tiết giỏ hàng thành công")
                                    })
                                    // console.log("CTGH")
                                    // console.log(this.CTGH)

                                }
                                else {
                                    this.CTGH = res.data
                                    let SL = parseInt(this.CTGH.CTGH_SoLuong)
                                    this.CTGH.CTGH_SoLuong = SL + 1
                                    this.CTGH.CTGH_NgayCapNhat = moment().format("DD-MM-YYYY")
                                    axios.put(`http://localhost:3000/api/chitietgiohang/` + this.CTGH.CTGH_Ma, this.CTGH).then(res => {
                                        console.log("Cập nhật số lượng chi tiết giỏ hàng thành công")
                                    })

                                }
                            })
                            .catch((error) => {
                                // handle error
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    })



            }


        },
        CapNhatLastID() {
            this.TachKBS1()
            this.Increase1()
            this.LastID1 = this.NewID1
            console.log('NewID1')
            console.log(this.NewID1)
        },
        GetLastID1() {
            axios.get(`http://localhost:3000/api/chitietgiohang/getid/getlastctghma`).then(res => {
                this.LastID1 = res.data
                this.TachKBS1()
                this.Increase1()
                this.LastID1 = this.NewID1
                console.log('NewID1')
                console.log(this.NewID1)
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
            console.log(result);
            this.Chu1 = Text1;
            console.log(Text1);
        },

    }

})
</script>
<style>
.scroll {
    display: flex;
    overflow-x: scroll;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.item {
    min-width: 300px;
    max-width: 300px;
    margin: 10px 10px;
}
</style>