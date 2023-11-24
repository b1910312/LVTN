<script>
import SPCarcousleBanner from '@/components/SPCarcousleBanner.vue';
import ListSanPham_GoiY from '@/components/ListSanPham_GoiY.vue';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
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
            imageSach: "",
            currentRating: 0,  // Số sao hiện tại
            reviews: [],
            TB: [],
            SoLuong: 1,
            menu: false,
            CTGH: {
                CTGH_Ma: "",
                CTGH_MaGH: "",
                CTGH_MaSach: "",
                CTGH_SoLuong: "",
                CTGH_NgayTao: "",
                CTGH_NgayCapNhat: ""
            },
            name: "",
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

            LastID2: "",
            NewID2: "",
            So2: "",
            Chu2: "",


            LastID3: "",
            NewID3: "",
            So3: "",
            Chu3: "",

            DaDanhGia: "",
            BL: "",
            BLMoi: {
                BL_Ma: "",
                BL_MaKH: "",
                BL_MaSach: "",
                BL_NoiDung: "",
                BL_ReplyId: "",
                BL_TrangThai: 1,
                BL_NgayTao: "",
                BL_NgayCapNhat: ""
            },
            BLReply: {
                BL_Ma: "",
                BL_MaKH: "",
                BL_MaSach: "",
                BL_NoiDung: "",
                BL_ReplyId: "",
                BL_TrangThai: 1,
                BL_NgayTao: "",
                BL_NgayCapNhat: ""
            },
            TenKH: [
                { maKH: "", Ten: "" }
            ],
            NguoiDungs: "",
            DGs: [],
            SachGoiY: [],
            NXBName: "",
            TheLoaiName: ""
        }
    },
    components: {
        SPCarcousleBanner,
        ListSanPham_GoiY,
        FontAwesomeIcon
    },

    mounted() {
        this.getNV()
        this.GetLastID1()
        this.GetLastID()
        this.GetLastID2()
        this.GetLastID3()
        this.getNguoiDung()
    },
    created() {

        this.interval = setInterval(() => {
            // Call the API

            if (this.$route.params.id) {
                this.imageSach = "http://localhost:3000/api/thumbnail/image/TB/" + this.$route.params.id
                this.GetDG()
                this.CheckKH(this.$route.params.id, this.nvv.TKKH_MaKH)
                this.getSach(this.$route.params.id)
                this.GetHinhAnh()
                this.GetBL()
                this.GetSachGoiY()
            }

            if (this.SoLuong > this.Sach.S_SoLuong) {
                this.SoLuong = this.Sach.S_SoLuong
            }
        }, 2000)
    },
    props: {

    },
    methods: {
        GetNXBName() {
            axios.get(`http://localhost:3000/api/nxb/` + this.Sach.S_NXB)
                .then(res => {
                    this.NXBName = res.data
                })
                .catch(err => {
                    console.log(err)
                })
            axios.get(`http://localhost:3000/api/theloai/` + this.Sach.S_TheLoai)
                .then(res => {
                    this.TheLoaiName = res.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        GetSachGoiY() {
            axios.get(`http://localhost:5000/recommend?product_id=` + this.$route.params.id)
                .then(res => {
                    this.SachGoiY = res.data
                    console.log("Sách gợi ý")
                    console.log(this.SachGoiY)
                })
                .catch(err => {
                    console.log(err)
                })

        },
        average(array, field) {
            return array.reduce((total, item) => total + item[field], 0) / array.length;
        },
        GetDG() {
            axios.get(`http://localhost:3000/api/danhgia/GetBySach/` + this.$route.params.id)
                .then(res => {
                    this.DGs = res.data
                    console.log("Đánh giá")
                    console.log(this.DGs)
                })
                .catch(err => {
                    console.log(err)
                })

        },
        CapNhatLastID3() {
            this.TachKBS3()
            this.Increase3()
            this.LastID3 = this.NewID3
            console.log('NewID3')
            console.log(this.NewID3)
        },
        GetLastID3() {
            axios.get(`http://localhost:3000/api/danhgia/getid/getlastdgma`).then(res => {
                this.LastID3 = res.data
                this.TachKBS3()
                this.Increase3()
                console.log(this.LastID3)
                console.log("ID NEW" + this.NewID3)
                console.log(this.So3)
                console.log(this.Chu3)
            })
        },
        Increase3() {
            // Chuyển đổi chuoi thành số nguyên
            let SoNguyen = parseInt(this.So3);

            // Tăng giá trị của số nguyên
            SoNguyen += 1;

            // Chuyển đổi số nguyên thành chuoi
            this.So3 = String(SoNguyen).padStart(3, "0");
            this.NewID3 = this.Chu3 + this.So3;
            console.log(this.NewID3)
        },
        TachKBS3() {
            let [Text1, result1] = this.LastID3.split("0");
            let [Text, result] = this.LastID3.split("DG");
            this.So3 = result;
            this.Chu3 = Text1;
        },

        DanhGiaSP(SoSao) {
            const data = {
                DG_Ma: this.NewID3,
                DG_MaKH: this.nvv.TKKH_MaKH,
                DG_MaSach: this.$route.params.id,
                DG_SoSao: SoSao,
                DG_NgayTao: moment().format("DD-MM-YYYY")
            }
            if (this.DaDanhGia == false) {
                axios.post(`http://localhost:3000/api/danhgia`, data)
                    .then(res => {
                        this.CheckKH(data.DG_MaSach, data.DG_MaKH)

                        console.log("Đánh giá thành công")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        },
        CheckKH(S_Ma, KH_Ma) {
            axios.get(`http://localhost:3000/api/danhgia/checkKH/` + S_Ma + `/` + KH_Ma)
                .then(res => {
                    this.DaDanhGia = res.data
                    this.GetDG()

                })
                .catch(err => {
                    console.log(err)
                })
        },
        ThemBinhLuan() {
            const now = moment();
            this.BLMoi.BL_Ma = this.NewID2
            this.BLMoi.BL_MaKH = this.nvv.TKKH_MaKH
            this.BLMoi.BL_MaSach = this.$route.params.id
            this.BLMoi.BL_NgayTao = now.format("DD-MM-YYYY"),
                console.log(this.BLMoi)
            this.addBL()
        },
        BLTraloi(MaBL) {
            const now = moment();
            this.BLReply.BL_Ma = this.NewID2
            this.BLReply.BL_MaKH = this.nvv.TKKH_MaKH
            this.BLReply.BL_MaSach = this.$route.params.id
            this.BLReply.BL_ReplyId = MaBL
            this.BLReply.BL_NgayTao = now.format("DD-MM-YYYY"),
                console.log(this.BLReply)
            this.ReplyBL()
        },
        addBL() {
            axios.post('http://localhost:3000/api/binhluan', this.BLMoi)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        this.GetBL()

                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })
            this.BLMoi.BL_NoiDung = "";
            this.CapNhatLastID2()
        },
        ReplyBL() {
            axios.post('http://localhost:3000/api/binhluan', this.BLReply)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        this.GetBL()
                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })
            this.BLReply.BL_NoiDung = "";
            this.CapNhatLastID2()

        },
        AnBL(id) {
            const now = moment();
            let data = {
                BL_NgayCapNhat: now.format("DD-MM-YYYY"),
                BL_TrangThai: 2
            }
            // Gọi API để cập nhật sản phẩm
            axios.put("http://localhost:3000/api/binhluan/capnhattrangthai/" + id, data).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo
                console.log(data)
                // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
                this.GetBL();
            }).catch(error => {
                alert(error);
            });
        },
        getNV() {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvv = JSON.parse(localStorage.getItem("khachhang"))
            }
            console.log(this.nvv);
        },

        getNguoiDung() {
            // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
            axios.get(`http://localhost:3000/api/thongtinkhachhang`).then(res => {
                this.NguoiDungs = res.data;
                console.log(this.NguoiDungs);
            });
        },

        CapNhatLastID2() {
            this.TachKBS2()
            this.Increase2()
            this.LastID2 = this.NewID2
            console.log('NewID2')
            console.log(this.NewID2)
        },
        GetLastID2() {
            axios.get(`http://localhost:3000/api/binhluan/getid/getlastblma`).then(res => {
                this.LastID2 = res.data
                this.TachKBS2()
                this.Increase2()
                console.log(this.LastID2)
                console.log("ID NEW" + this.NewID2)
                console.log(this.So2)
                console.log(this.Chu2)
            })
        },
        Increase2() {
            // Chuyển đổi chuoi thành số nguyên
            let SoNguyen = parseInt(this.So2);

            // Tăng giá trị của số nguyên
            SoNguyen += 1;

            // Chuyển đổi số nguyên thành chuoi
            this.So2 = String(SoNguyen).padStart(3, "0");
            this.NewID2 = this.Chu2 + this.So2;
            console.log(this.NewID2)
        },
        TachKBS2() {
            let [Text1, result1] = this.LastID2.split("0");
            let [Text, result] = this.LastID2.split("L");
            this.So2 = result;
            this.Chu2 = Text1;
        },
        GetBL() {
            axios.get(`http://localhost:3000/api/binhluan/getbymasach/` + this.$route.params.id)
                .then(res => {
                    this.BL = res.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getKHName(BL_MaKH) {
            // return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;

            return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;


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
        GetAVT(KH_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/KH/" + KH_Ma
            return logo;
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
                this.GetNXBName()
                console.log(this.Sach)
            })
        },
    }
}
</script>
<template>
    <VRow>
        <VCol cols="6" class="my-auto mx-auto text-center">
            <img :src="imageSach" class="img-fluid w-50" alt="" srcset="">
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
                            <td class="col-7">{{ NXBName.NXB_Ten }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Thể loại:</td>
                            <td class="col-7">{{ TheLoaiName.TL_Ten }}</td>
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
                <h3 class="mt-3 mb-3 text-start ms-5">ĐÁNH GIÁ: {{ average(DGs, "DG_SoSao") }}<font-awesome-icon
                        style="color:gold" :icon="['fas', 'star']" />({{ DGs.length }} lượt đánh giá)</h3>

                <div>
                    <div class="star-wrapper">
                        <a @click="DanhGiaSP(5)" class="s1"><font-awesome-icon :icon="['fas', 'star']" /></a>
                        <a @click="DanhGiaSP(4)" class="s2"><font-awesome-icon :icon="['fas', 'star']" /></a>
                        <a @click="DanhGiaSP(3)" class="s3"><font-awesome-icon :icon="['fas', 'star']" /></a>
                        <a @click="DanhGiaSP(2)" class="s4"><font-awesome-icon :icon="['fas', 'star']" /></a>
                        <a @click="DanhGiaSP(1)" class="s5"><font-awesome-icon :icon="['fas', 'star']" /></a>
                    </div>

                </div>

                <h3 class=" text-start ms-5 mt-3">BÌNH LUẬN</h3>
                <Vcard class=" text-white ">
                    <div class=" overflow-container">
                        <div v-for=" binhluan in BL" :key="binhluan.BL_Ma">
                            <VRow v-if="binhluan.BL_ReplyId === '' && binhluan.BL_TrangThai === 1"
                                style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-2">
                                <VCol v-if="binhluan.BL_ReplyId === '' && binhluan.BL_TrangThai === 1" cols="1">
                                    <img :src="GetAVT(binhluan.BL_MaKH)" style="border-radius: 10px;" class="img-fluid"
                                        alt="">
                                </VCol>
                                <VCol v-if="binhluan.BL_ReplyId === '' && binhluan.BL_TrangThai === 1" cols="10"
                                    class=" text-start">
                                    <h5>{{ getKHName(binhluan.BL_MaKH) }}
                                        <v-menu location="right">
                                            <template v-slot:activator="{ props }">
                                                <v-button class="btn text-white" color="primary" dark v-bind="props">
                                                    <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                                                </v-button>
                                            </template>

                                            <v-list class="bg bg-white p-1">
                                                <div>
                                                    <v-button class="btn btn-primary w-100  mb-1"
                                                        @click="hientraloi(binhluan.BL_Ma)"> Trả lời
                                                    </v-button>
                                                </div>
                                                <div>
                                                    <v-button v-if="binhluan.BL_MaKH === nvv.TKKH_MaKH"
                                                        class="btn btn-danger w-100 mb-1" @click="AnBL(binhluan.BL_Ma)">
                                                        Xóa bình luận
                                                    </v-button>
                                                </div>
                                            </v-list>
                                        </v-menu>
                                    </h5>
                                    <p>{{ binhluan.BL_NoiDung }} </p>
                                </VCol>

                                <VCol cols="12" v-if="binhluan.BL_ReplyId === '' && binhluan.BL_TrangThai === 1">
                                    <VRow v-for="reply in BL" :key="reply.BL_Ma">
                                        <VCol v-if="reply.BL_ReplyId === binhluan.BL_Ma && reply.BL_TrangThai === 1"
                                            cols="1"> </VCol>
                                        <VCol v-if="reply.BL_ReplyId === binhluan.BL_Ma && reply.BL_TrangThai === 1"
                                            cols="10">
                                            <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="mb-1">
                                                <VCol cols="1">
                                                    <img :src="GetAVT(reply.BL_MaKH)" style="border-radius: 10px;"
                                                        class="img-fluid" alt="">
                                                </VCol>
                                                <VCol cols="9" class="ms-3 text-start">
                                                    <h5>{{ getKHName(reply.BL_MaKH) }}
                                                        <v-menu location="right">
                                                            <template v-slot:activator="{ props }">
                                                                <v-button class="btn text-white" color="primary" dark
                                                                    v-bind="props">
                                                                    <font-awesome-icon
                                                                        :icon="['fas', 'ellipsis-vertical']" />
                                                                </v-button>
                                                            </template>

                                                            <v-list class="bg bg-white p-1">
                                                                <div>
                                                                    <div>
                                                                        <v-button class="btn btn-primary w-100  mb-1"
                                                                            @click="hientraloi(reply.BL_ReplyId)"> Trả lời
                                                                        </v-button>
                                                                    </div>
                                                                    <v-button v-if="reply.BL_MaKH === nvv.TKKH_MaKH"
                                                                        class="btn btn-danger w-100 mb-1"
                                                                        @click="AnBL(reply.BL_Ma)">
                                                                        Xóa bình luận
                                                                    </v-button>
                                                                </div>
                                                            </v-list>
                                                        </v-menu>
                                                    </h5>

                                                    <p>{{ reply.BL_NoiDung }} </p>
                                                </VCol>
                                            </VRow>
                                        </VCol>
                                    </VRow>
                                </VCol>
                                <VRow v-if="binhluan.BL_ReplyId === '' && binhluan.BL_TrangThai === 1" :id="binhluan.BL_Ma"
                                    style="display: none;">
                                    <VCol cols="1" class="mx-auto">
                                        <img :src="GetAVT(nvv.TKKH_MaKH)" style="border-radius: 10px; height:100px"
                                            class="img-fluid mx-auto" alt="">
                                    </VCol>
                                    <VCol cols="9" class="my-auto">
                                        <VCard class="mb-4 ms-5">
                                            <VTextField rows="1" class=" w-100" v-model="BLReply.BL_NoiDung"
                                                placeholder="Nhập bình luận tại đây">
                                            </VTextField>
                                        </VCard>
                                    </VCol>
                                    <VCol cols="2" class="my-auto">
                                        <VBtn class="btn btn-primary w-50" @click="BLTraloi(binhluan.BL_Ma)">Gửi</VBtn>
                                        <v-button class="btn btn-secondary w-50"
                                            @click="antraloi(binhluan.BL_Ma)">Hủy</v-button>

                                    </VCol>
                                </VRow>
                            </VRow>
                        </div>
                    </div>

                </Vcard>
                <VRow>
                    <VCol cols="1" class="ms-5">
                        <img :src="GetAVT(nvv.TKKH_MaKH)" style="border-radius: 10px; height:100px" class="img-fluid"
                            alt="">
                    </VCol>
                    <VCol cols="9" class=my-auto>
                        <VCard class="mb-4 ms-5">
                            <VTextField rows="1" class=" w-100" v-model="BLMoi.BL_NoiDung"
                                placeholder="Nhập bình luận tại đây">
                            </VTextField>
                        </VCard>
                    </VCol>
                    <VCol cols="1" class="my-auto">
                        <VBtn class="btn btn-primary" @click="ThemBinhLuan()">Gửi</VBtn>
                    </VCol>
                </VRow>

            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <VCardText class="text-success">
            <h1>Sách tương tự</h1>
        </VCardText>
        <ListSanPham_GoiY :sach="SachGoiY" />
    </VRow>
</template>

<style>
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

.overflow-container {
    max-height: 500px;
    /* Set your desired max height */
    overflow-y: auto;
    /* Enable vertical scrolling */
}

.star-wrapper {

    transform: translate(-78%, -20%);
    position: relative;
    direction: rtl;
}

.star-wrapper a {
    font-size: 3em;
    color: #fffcbc;
    text-decoration: none;
    transition: all 0.5s;
    margin: 4px;
}

.star-wrapper a:hover {
    color: gold;
    transform: scale(1.3);
}

.s1:hover~a {
    color: gold;
}

.s2:hover~a {
    color: gold;
}

.s3:hover~a {
    color: gold;
}

.s4:hover~a {
    color: gold;
}

.s5:hover~a {
    color: gold;
}

.wraper {
    position: absolute;
    bottom: 30px;
    right: 50px;
}
</style>