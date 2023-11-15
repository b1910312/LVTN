<template>
    <div class="scroll">
        <div v-for="pr in sach" :key="pr.S_Ma">
           <div class="item" v-if="pr.S_SoLuong >0">
            <div class="card text-white" style="    border-radius: 30px;border: 1px solid rgb(70, 194, 70); background-color: rgba(0, 0, 0, 0.4  );
">
                <div class="card-head p-3">
                    <img :src="GetThumNail(pr.S_Ma)" style="border-radius: 30px; " class="img-fluid imgcard" alt="">
                </div>
                <div class="card-body text-start">
                    <h5>{{ pr.S_Ten }}</h5>
                    <p>Giá: {{ pr.S_Gia }} VNĐ</p>
                    <VRow>
                        <VCol cols="8">
                            <button style="background-color: rgb(0, 255, 4);" class="  mx-auto btn btn-success w-100"
                                @click="this.$router.push(`/chitietsach/` + pr.S_Ma)">Chi tiết</button>
                        </VCol>
                        <VCol cols="4">
                            <v-button class=" text-white btn btn-info w-100" @click="ThemChiTietGioHang(pr.S_Ma)">
                                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                            </v-button>

                        </VCol>
                    </VRow>
                </div>
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
        }
    },
    props: {
        sach: {
            type: Array, // Kiểu dữ liệu là một mảng
        },
    },
    mounted() {
        this.GetLastID1()
        console.log(":!2313")
        console.log(this.sach)
    },
    methods: {
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