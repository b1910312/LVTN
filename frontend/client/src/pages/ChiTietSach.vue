<script>
import SPCarcousleBanner from '@/components/SPCarcousleBanner.vue';
import ListSanPham_NgangVue from '@/components/ListSanPham_Ngang.vue';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    name: "ChiTietSach",
    data() {
        return {
            Sach: {},
            BinhLuan: [
                {

                    id: "1",
                    name: "Thanh Tín ",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 1",
                    ReplyId: "",


                },
                {

                    id: "2",
                    name: "Thanh Tín",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 2",
                    ReplyId: "1",

                }, {
                    id: "3",
                    name: "Thanh Tín",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 3",
                    ReplyId: "",


                }, {
                    id: "4",
                    name: "Thanh Tín",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 4",
                    ReplyId: "1",

                },

            ],
            currentRating: 0,  // Số sao hiện tại
            reviews: [],
            TB: [],
            SoLuong: 1,
            CTGH: {
                CTGH_Ma: "",
                CTGH_MaGH: "",
                CTGH_MaSach: "",
                CTGH_SoLuong: "",
                CTGH_NgayTao: "",
                CTGH_NgayCapNhat: ""
            },
            nvv: "",
            //Xử lý mã chi tiết giỏ hàng
            LastID1: "",
            NewID1: "",
            So1: "",
            Chu1: "",
            //Xử lý mã đơn hàng
            LastID: "",
            NewID: "",
            So: "",
            Chu: "",
            message: "",

        }
    },
    components: {
    SPCarcousleBanner,
    ListSanPham_NgangVue,
    FontAwesomeIcon
},
    mounted() {
        this.GetLastID1()
        this.GetLastID()
        this.getSach(this.$route.params.id)
        this.GetHinhAnh()
    },
    created() {

    },
    props: {

    },
    methods: {
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
                                    this.CTGH.CTGH_SoLuong = this.SoLuong
                                    this.CTGH.CTGH_NgayTao = moment().format("DD-MM-YYYY")
                                    axios.post(`http://localhost:3000/api/chitietgiohang`, this.CTGH).then(res => {
                                        console.log("Thêm chi tiết giỏ hàng thành công")
                                    })
                                    this.message = " Thêm thành công sản phẩm vào giỏ hàng"
                                    // console.log("CTGH")
                                    // console.log(this.CTGH)

                                }
                                else {
                                    this.CTGH = res.data
                                    let SL = parseInt(this.CTGH.CTGH_SoLuong)
                                    this.CTGH.CTGH_SoLuong = SL + this.SoLuong
                                    this.CTGH.CTGH_NgayCapNhat = moment().format("DD-MM-YYYY")
                                    axios.put(`http://localhost:3000/api/chitietgiohang/` + this.CTGH.CTGH_Ma, this.CTGH).then(res => {
                                        console.log("Cập nhật số lượng chi tiết giỏ hàng thành công")
                                    })
                                    this.message = " Thêm thành công sản phẩm vào giỏ hàng"


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
        GetLastID1() {
            axios.get(`http://localhost:3000/api/donhang/getid/getlastdhma`).then(res => {
                this.LastID1 = res.data
                this.TachKBS1()
                this.Increase1()
                this.LastID1 = this.NewID1
                console.log('NewID')
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
            let [Text, result] = this.LastID1.split("DH");
            this.So1 = result;
            console.log(result);
            this.Chu1 = Text1;
            console.log(Text1);
        },
        GetLastID() {
            axios.get(`http://localhost:3000/api/chitietgiohang/getid/getlastctghma`).then(res => {
                this.LastID = res.data
                this.TachKBS()
                this.Increase()
                this.LastID = this.NewID
                console.log('NewID')
                console.log(this.NewID)
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
            let [Text, result] = this.LastID.split("GH");
            this.So = result;
            console.log(result);
            this.Chu = Text1;
            console.log(Text1);
        },
        TangSL() {
            if (this.SoLuong <= this.Sach.S_SoLuong) {
                this.SoLuong++
            }
        },
        GiamSL() {
            if (this.SoLuong > 1) {
                this.SoLuong--
            }
        },
        GetHinhAnh() {
            this.TB.push(this.GetThumNail(this.$route.params.id))
            for (let i = 0; i < 4; i++) {
                this.TB.push(this.GetHMM(this.$route.params.id, i + 1))
            }

        },
        GetThumNail(S_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
            return logo;
        },
        GetHMM(S_Ma, STT) {
            const logo = "http://localhost:3000/api/thumbnail/image/HMH/HMH/" + S_Ma + "/" + STT
            return logo;
        },
        hientraloi(id) {
            const vInputDetails = document.getElementById(id);
            vInputDetails.style.display = "contents"; // Ẩn phần tử
        },
        antraloi(id) {
            const vInputDetails = document.getElementById(id);
            vInputDetails.style.display = "none"; // Ẩn phần tử
        },
        rateProduct(rating) {
            // Cập nhật số sao hiện tại
            this.currentRating = rating;

            // Thêm đánh giá từ người dùng vào mảng
            this.reviews.push({
                rating: rating,
                comment: "Mô tả đánh giá"  // Thay thế bằng nội dung thực tế từ người dùng
            });
        },
        getSach(S_MaSach) {
            // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
            axios.get(`http://localhost:3000/api/sach/${S_MaSach}`).then(res => {
                this.Sach = res.data
                console.log(this.Sach)
            })
        },
    }
}
</script>
<template>
    <VRow>
        <VCol cols="6" class="my-auto">
            <SPCarcousleBanner :img="TB" />
        </VCol>
        <VCol cols="6">
            <VCard :title="Sach.name" style="border-radius: 15px;">
                <h3 class="text-start ms-5 px-5 mt-3">[{{ Sach.S_Ma }}]&nbsp;&nbsp;{{ Sach.S_Ten }}</h3>

                <v-table theme="dark" class="p-4">
                    <tbody class="text-start">
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Tên sách:</td>
                            <td class="col-7">{{ Sach.S_Ten }}</td>


                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Tác giả:</td>
                            <td class="col-7">{{ Sach.S_TacGia }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Nhà xuất bản:</td>
                            <td class="col-7">{{ Sach.S_NXB }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Thể loại:</td>
                            <td class="col-7">{{ Sach.S_TheLoai }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Giá:</td>
                            <td class="col-7">{{ Sach.S_Gia }} VNĐ</td>
                        </tr>
                        <tr class="row w-100 my-2 py-2">
                            <td class="col-1"></td>
                            <td class="col-4">Số lượng:</td>
                            <td class="col-4">
                                <div class="d-flex" style="vertical-align: middle;">
                                    <v-button class="mx-5 btn h-25 text-white" @click="TangSL()">
                                        <h3>+</h3>
                                    </v-button>
                                    &nbsp; &nbsp; &nbsp;
                                    <!-- <v-text-field height="10" style="width: 300px;" v-model="SoLuong"></v-text-field> -->
                                    <input type="text" class="mt-2 form-control text-center" v-model="SoLuong"
                                        style="height: 30px; width: 100px;">
                                    &nbsp; &nbsp; &nbsp;
                                    <v-button class="mx-5 btn h-25 text-white" @click="GiamSL()">
                                        <h3>-</h3>
                                    </v-button>
                                </div>
                            </td>
                        </tr>
                        <tr class="row w-100 mt-5   ">
                            <td class="col-12 text-center text-success  " v-if="message != ''">{{ message }}</td>
                            <!-- <td class="col-6"> <v-button class="btn btn-primary w-100">Mua ngay</v-button></td> -->
                            <td class="col-12"> <v-button class="btn btn-success w-100"
                                    @click="ThemChiTietGioHang(Sach.S_Ma)">Thêm vào giỏ hàng</v-button></td>
                        </tr>
                    </tbody>
                </v-table>
            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="12">
            <VCard>
                <!-- Nav tabs -->


                <!-- Tab panes -->
                <h3 class="mt-3 text-start ms-5">ĐÁNH GIÁ</h3>

                <p>Rating: 
                    <span class="star-rating">
                        <label for="rate-1" style="--i:1"><font-awesome-icon :icon="['fas', 'star']" /></label>
                        <input type="radio" name="rating" id="rate-1" value="1">
                        <label for="rate-2" style="--i:2"><font-awesome-icon :icon="['fas', 'star']" /></label>
                        <input type="radio" name="rating" id="rate-2" value="2" checked>
                        <label for="rate-3" style="--i:3"><font-awesome-icon :icon="['fas', 'star']" /></label>
                        <input type="radio" name="rating" id="rate-3" value="3">
                        <label for="rate-4" style="--i:4"><font-awesome-icon :icon="['fas', 'star']" /></label>
                        <input type="radio" name="rating" id="rate-4" value="4">
                        <label for="rate-5" style="--i:5"><font-awesome-icon :icon="['fas', 'star']" /></label>
                        <input type="radio" name="rating" id="rate-5" value="5">
                    </span></p>
                <h3 class=" text-start ms-5 mt-3">BÌNH LUẬN</h3>
                <Vcard class=" text-white ">
                    <!-- <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-1">
                                <VCol cols="1">
                                    <img :src="Sach.img" style="border-radius: 50px;"
                                        class="img-fluid" alt="">
                                </VCol>
                                <VCol cols="9 " class="ms-3 text-start">
                                    <p>xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin
                                        chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin
                                        chafo xin chafo xin chafo xin chafo xin chafo </p>
                                </VCol>
                                <VCol cols="1">
                                    <VBtn class="bg bg-primary"> Trả lời</VBtn>
                                </VCol>
                                <VCol cols="1"> </VCol>
                                <VCol cols="10">
                                    <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-1">
                                        <VCol cols="1">
                                            <img :src="Sach.img"
                                                style="border-radius: 50px;"
                                                class="img-fluid" alt="">
                                        </VCol>
                                        <VCol cols="9" class="ms-3 text-start">
                                            <p>xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin
                                                chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo
                                                xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo </p>
                                        </VCol>

                                    </VRow>
                                </VCol>
                            </VRow> -->
                    <VRow v-for="binhluan in BinhLuan" :key="binhluan.name"
                        style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-1">
                        <VCol v-if="binhluan.ReplyId === ''" cols="1">
                            <img :src="binhluan.img" style="border-radius: 50px;" class="img-fluid" alt="">
                        </VCol>
                        <VCol v-if="binhluan.ReplyId === ''" cols="9 " class="ms-3 text-start">
                            <p>{{ binhluan.NoiDung }} </p>
                        </VCol>
                        <VCol v-if="binhluan.ReplyId === ''" cols="1">
                            <VBtn class="bg bg-primary" @click="hientraloi(binhluan.id)"> Trả lời</VBtn>
                        </VCol>
                        <VCol cols="12" v-if="binhluan.ReplyId === ''">
                            <VRow v-for="reply in BinhLuan" :key="reply.name">
                                <VCol v-if="reply.ReplyId === binhluan.id" cols="1"> </VCol>
                                <VCol v-if="reply.ReplyId === binhluan.id" cols="10">
                                    <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="mb-1">
                                        <VCol cols="1">
                                            <img :src="reply.img" style="border-radius: 50px;" class="img-fluid" alt="">
                                        </VCol>
                                        <VCol cols="9" class="ms-3 text-start">
                                            <p>{{ reply.NoiDung }} </p>
                                        </VCol>
                                    </VRow>
                                </VCol>
                            </VRow>
                        </VCol>
                        <VRow v-if="binhluan.ReplyId === ''" :id="binhluan.id" style="display: none;">
                            <VCol cols="11">
                                <VCard class="mb-4 ms-5">
                                    <VTextarea rows="1" class=" w-100" placeholder="Nhập bình luận tại đây">
                                    </VTextarea>
                                </VCard>
                            </VCol>
                            <VCol cols="1">
                                <VBtn class="btn btn-primary" @click="antraloi(binhluan.id)">Gửi</VBtn>
                            </VCol>
                        </VRow>
                    </VRow>
                </Vcard>
                <VRow>
                    <VCol cols="11">
                        <VCard class="mb-4 ms-5">
                            <VTextarea rows="1" class=" w-100" placeholder="Nhập bình luận tại đây"></VTextarea>
                        </VCard>
                    </VCol>
                    <VCol cols="1">
                        <VBtn class="btn btn-primary">Gửi</VBtn>
                    </VCol>
                </VRow>

            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <ListSanPham_NgangVue />
    </VRow>
</template>

<style>
.star-rating {
	white-space: nowrap;
}
.star-rating [type="radio"] {
	appearance: none;
}
.star-rating i {
	font-size: 1.2em;
	transition: 0.3s;
}

.star-rating label:is(:hover, :has(~ :hover)) i {
	transform: scale(1.35);
	color: #fffdba;
	animation: jump 0.5s calc(0.3s + (var(--i) - 1) * 0.15s) alternate infinite;
}
.star-rating label:has(~ :checked) i {
	color: #faec1b;
	text-shadow: 0 0 2px #ffffff, 0 0 10px #ffee58;
}

@keyframes jump {
	0%,
	50% {
		transform: translatey(0) scale(1.35);
	}
	100% {
		transform: translatey(-15%) scale(1.35);
	}
}

.product-review {
    margin-bottom: 20px;
}

.product-review-header {
    background-color: #f5f5f5;
    padding: 10px;
}

.product-review-summary {
    margin-top: 10px;
}

.product-review-rating {
    font-size: 18px;
    font-weight: bold;
}

.product-review-count {
    font-size: 14px;
}

.product-review-list {
    margin-top: 20px;
}

.product-review-item {
    margin-bottom: 10px;
}

.product-review-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.product-review-content {
    margin-left: 60px;
}

.product-review-author {
    font-size: 16px;
    font-weight: bold;
}

.product-review-date {
    font-size: 14px;
}

.product-review-text {
    font-size: 14px;
}

.product-review-rating {
    display: flex;
    justify-content: center;
}

.product-review-star {
    width: 20px;
    height: 20px;
    background-color: #ff0000;
    border-radius: 50%;
}

.product-review-pagination {
    text-align: center;
}
</style>