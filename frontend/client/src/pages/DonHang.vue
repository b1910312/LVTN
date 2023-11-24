<script>
import moment from 'moment'
export default {
    name: "DonHang",
    data() {
        return {
            DH: {
                DH_Ma: "",
                DH_MaKH: "",
                DH_Ho: "",
                DH_Ten: "",
                DH_SoDienThoai: "",
                DH_DiaChi: "",
                DH_PhuongXa: "",
                DH_QuanHuyen: "",
                DH_TinhTP: "",
                DH_TrangThai: "",
                DH_NgayTao: "",
            },
            CTDH: {
                CTDH_Ma: "",
                CTDH_MaDH: "",
                CTDH_MaSach: "",
                CTDH_TenSach: "",
                CTDH_SoLuong: "",
                CTDH_Gia: "",
                CTDH_ThanhTien: "",
                CTDH_NgayTao: ""
            },
            Sach: "",
            nvv: "",
            MaCTGH: [],
            CTGH: [],
            KH: "",
            DC: "",
            SL: 0,
            TT: 0,
            SachName: [],
            SachSL: [],
            SachGia: [],
            VNPayData: {
                amount: 10000,
                bankCode: "",
                orderDescription: "Đơn hàng thử nghiệm",
                orderType: "Mua hàng",
                language: "vn",
                TxnRef: "",
            },
            LastID1: "",
            NewID1: "",
            So1: "",
            Chu1: "",
            message: ""


        }
    },
    mounted() {
        this.getNV()
        this.GetLastID1()
        this.Getdata()
        this.Loading()
        this.GetOneKH(this.nvv.TKKH_MaKH)
        this.GetDiaChi(this.nvv.TKKH_MaKH)
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
    methods: {
        XoaDonHang(DH_Ma) {
            axios.delete(`http://localhost:3000/api/donhang/` + DH_Ma).then(res => {
                console.log("Xóa thanh công")
                this.$router.push(`/giohang`)
            })
        },
        GetLastID1() {
            axios.get(`http://localhost:3000/api/chitietdonhang/getid/getlastctdhma`).then(res => {
                this.LastID1 = res.data
                this.TachKBS1()
                this.Increase1()
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
        ThanhToanKhiNhanHang() {
            this.DH.DH_Ma = this.$route.query.id
            this.DH.DH_MaKH = this.KH.KH_MaKH
            // Tìm vị trí của dấu cách
            let spaceIndex = this.KH.KH_HoTen.indexOf(" ");

            // Kiểm tra nếu có dấu cách trong chuỗi

            // Tách họ và tên sử dụng substring
            let ho = this.KH.KH_HoTen.substring(0, spaceIndex);
            let ten = this.KH.KH_HoTen.substring(spaceIndex + 1);

            // In kết quả
            console.log("Họ: " + ho);
            console.log("Tên: " + ten);

            this.DH.DH_Ho = ho
            this.DH.DH_Ten = ten
            this.DH.DH_SoDienThoai = this.KH.KH_SoDienThoai
            this.DH.DH_DiaChi = this.DC.DC_DiaChi
            this.DH.DH_PhuongXa = this.DC.DC_PhuongXa
            this.DH.DH_QuanHuyen = this.DC.DC_QuanHuyen
            this.DH.DH_TinhTP = this.DC.DC_TinhTP
            this.DH.DH_TrangThai = 0
            this.DH.DH_NgayTao = moment().format("DD-MM-YYYY")
            console.log("THONG TIN DON HANG")
            console.log(this.DH)
            axios.put('http://localhost:3000/api/donhang/' + this.$route.query.id, this.DH)
                .then((response) => {
                    console.log("Tạo đơn hàng thành công");

                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

            for (let i = 0; i < this.CTGH.length; i++) {

                console.log("NEW ID CTDH")
                console.log(this.NewID1)
                this.CTDH.CTDH_Ma = this.NewID1
                this.CTDH.CTDH_MaDH = this.$route.query.id
                this.CTDH.CTDH_MaSach = this.CTGH[i].CTGH_MaSach
                this.CTDH.CTDH_TenSach = this.SachName[i]
                this.CTDH.CTDH_SoLuong = this.CTGH[i].CTGH_SoLuong
                this.CTDH.CTDH_Gia = this.SachGia[i]
                this.CTDH.CTDH_ThanhTien = this.CTGH[i].CTGH_SoLuong * this.SachGia[i]
                this.CTDH.CTDH_NgayTao = moment().format("DD-MM-YYYY")

                axios.post('http://localhost:3000/api/chitietdonhang', this.CTDH)
                    .then((response) => {
                        console.log("Tạo chi tiết đơn đơn hàng thành công");
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    })
                this.CapNhatSoLuong(this.CTDH.CTDH_MaSach, this.CTDH.CTDH_SoLuong)
                let SoNguyen = parseInt(this.So1);
                // Tăng giá trị của số nguyên
                SoNguyen += 1;
                // Chuyển đổi số nguyên thành chuỗi
                this.So1 = String(SoNguyen).padStart(3, "0");
                this.NewID1 = this.Chu1 + this.So1;

            }
            this.XoaGH()
            this.message = "Bạn đã đặt hàng thành công, vui lòng vào danh sách đơn hàng để xem chi tiết"
        },
        ThanhToanVNPay() {
            this.DH.DH_Ma = this.$route.query.id
            this.DH.DH_MaKH = this.KH.KH_MaKH
            // Tìm vị trí của dấu cách
            let spaceIndex = this.KH.KH_HoTen.indexOf(" ");
            // Kiểm tra nếu có dấu cách trong chuỗi
            // Tách họ và tên sử dụng substring
            let ho = this.KH.KH_HoTen.substring(0, spaceIndex);
            let ten = this.KH.KH_HoTen.substring(spaceIndex + 1);
            // In kết quả
            console.log("Họ: " + ho);
            console.log("Tên: " + ten);

            this.DH.DH_Ho = ho
            this.DH.DH_Ten = ten
            this.DH.DH_SoDienThoai = this.KH.KH_SoDienThoai
            this.DH.DH_DiaChi = this.DC.DC_DiaChi
            this.DH.DH_PhuongXa = this.DC.DC_PhuongXa
            this.DH.DH_QuanHuyen = this.DC.DC_QuanHuyen
            this.DH.DH_TinhTP = this.DC.DC_TinhTP
            this.DH.DH_TrangThai = 0
            this.DH.DH_NgayTao = moment().format("DD-MM-YYYY")
            console.log("THONG TIN DON HANG")
            console.log(this.DH)
            axios.put('http://localhost:3000/api/donhang/' + this.$route.query.id, this.DH)
                .then((response) => {
                    console.log("Tạo đơn hàng thành công");

                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

            for (let i = 0; i < this.CTGH.length; i++) {

                console.log("NEW ID CTDH")
                console.log(this.NewID1)
                this.CTDH.CTDH_Ma = this.NewID1
                this.CTDH.CTDH_MaDH = this.$route.query.id
                this.CTDH.CTDH_MaSach = this.CTGH[i].CTGH_MaSach
                this.CTDH.CTDH_TenSach = this.SachName[i]
                this.CTDH.CTDH_SoLuong = this.CTGH[i].CTGH_SoLuong
                this.CTDH.CTDH_Gia = this.SachGia[i]
                this.CTDH.CTDH_ThanhTien = this.CTGH[i].CTGH_SoLuong * this.SachGia[i]
                this.CTDH.CTDH_NgayTao = moment().format("DD-MM-YYYY")

                axios.post('http://localhost:3000/api/chitietdonhang', this.CTDH)
                    .then((response) => {
                        console.log("Tạo chi tiết đơn đơn hàng thành công");
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    })
                this.CapNhatSoLuong(this.CTDH.CTDH_MaSach, this.CTDH.CTDH_SoLuong)
                let SoNguyen = parseInt(this.So1);
                // Tăng giá trị của số nguyên
                SoNguyen += 1;
                // Chuyển đổi số nguyên thành chuỗi
                this.So1 = String(SoNguyen).padStart(3, "0");
                this.NewID1 = this.Chu1 + this.So1;

            }
            this.XoaGH()
            this.message = "Bạn vui lòng hoàn thành thanh toán để tạo đơn hàng"
            this.createPaymentUrl()
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
        GetOneKH(id) {
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
            this.GetDiaChi(id)


        },
        getNV() {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvv = JSON.parse(localStorage.getItem("khachhang"))
            }
            console.log(this.nvv);
        },
        Loading() {
            for (let i = 0; i < this.MaCTGH.length; i++) {
                this.GetSP(this.MaCTGH[i])
                console.log("CTGH")
                console.log(this.CTGH)
            }
        },
        CapNhatSoLuong(SMa, SLBan) {
            axios.get("http://localhost:3000/api/sach/" + SMa).then(response => {
                this.Sach = response.data
                let SLBAN = parseInt(SLBan)
                let SL = parseInt(this.Sach.S_SoLuong)
                console.log('SLBAN')
                console.log(SLBAN)
                this.Sach.S_SoLuong = SL - SLBAN
                this.Sach.S_NgayCapNhat = moment().format("DD-MM-YYYY")
                axios.put("http://localhost:3000/api/sach/CapNhatSoLuong/" + this.Sach.S_Ma, this.Sach).then(response => {
                    console.log("Cập nhật thành công số lượng");
                    // Sau đó, chuyển hướng người dùng
                }).catch(error => {
                    alert(error);
                });
                // Sau đó, chuyển hướng người dùng
            }).catch(error => {
                alert(error);
            });

        },
        XoaGH() {
            for (let i = 0; i < this.MaCTGH.length; i++) {
                axios.delete("http://localhost:3000/api/chitietgiohang/" + this.MaCTGH[i]).then(response => {
                    // Nếu cập nhật thành công, thì hiển thị thông báo
                    console.log("Xóa chi tiet gio hang thành công");
                    // Sau đó, chuyển hướng người dùng
                }).catch(error => {
                    alert(error);
                });
            }
        },
        createPaymentUrl(amount, bankCode, orderDescription, orderType, language) {
            this.VNPayData.amount = this.SachGia.reduce((acc, cur, index) => acc + (cur * this.SachSL[index]), 0)
            this.VNPayData.orderDescription = "Thanh toán đơn hàng" + this.$route.query.id
            this.VNPayData.orderType = "Thanh toán đơn hàng"
            this.VNPayData.TxnRef = this.$route.query.id

            axios.post(`http://localhost:3000/api/donhang/thanhtoanVNPay`, this.VNPayData).then(res => {
                window.open(res.data)
            })
        },

        GetSP(MaCTGH) {
            axios.get(`http://localhost:3000/api/chitietgiohang/` + MaCTGH).then(res => {
                this.CTGH.push(res.data)
                this.SachSL.push(res.data.CTGH_SoLuong)
                this.GetSachName(res.data.CTGH_MaSach)
                this.GetSachGia(res.data.CTGH_MaSach)
                this.SL += res.data.CTGH_SoLuong

            })
        },


        GetSachName(S_Ma) {
            let s = '';
            axios.get(`http://localhost:3000/api/sach/` + S_Ma)
                .then(res => {
                    console.log(res.data.S_Ten);
                    s = res.data.S_Ten
                    console.log("hei")
                    console.log(s)
                    this.SachName.push(s)
                    console.log("he22i")
                    console.log(this.SachName)


                })
                .catch(error => {
                    console.log(error);
                });

        },
        GetSachGia(S_Ma) {
            let s = '';
            axios.get(`http://localhost:3000/api/sach/` + S_Ma)
                .then(res => {
                    console.log(res.data.S_Gia);
                    s = res.data.S_Gia
                    console.log("hei")
                    console.log(s)
                    this.SachGia.push(s)
                    console.log("he22i")
                    console.log(this.SachGia)


                })
                .catch(error => {
                    console.log(error);
                });

        },
        Getdata() {
            this.MaCTGH = this.$route.query.products
        },
        GetThumNail(S_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
            // console.log(logo)
            return logo
        },
    }
}
</script>
<template>
    <VRow>
        <VCol cols="6">
            <VCard class="mb-2">
                <h3 class="mt-3 ms-3">Đơn hàng <i style="color: rgba(0, 255, 125, 1);">#{{ this.$route.params.id }}</i>
                </h3>
            </VCard>
            <VCard v-if="nvv.TKKH_MaKH !== ''" class="mb-2">
                <VRow>
                    <VCol cols="12">
                        <p class="text-success mt-2 text-center" v-if="message != ''">{{ message }}</p>
                        <VCard title="Thông tin người nhận">

                            <VCardText>
                                <VRow>
                                    <VCol cols="12">
                                        <VTextField label="Họ tên" placeholder="Họ tên" v-model="KH.KH_HoTen" />

                                    </VCol>
                                
                                    <VCol cols="12">
                                        <VTextField label="Số điện thoại" placeholder="Nhập số điện thoại"
                                            v-model="KH.KH_SoDienThoai" />
                                    </VCol>


                                </VRow>
                            </VCardText>
                        </VCard>
                    </VCol>
                    <VCol cols="12">
                        <VCard title="Địa chỉ nhận hàng">

                            <VCardText>
                                <!-- 👉 Current Password -->

                                <!-- 👉 New Password -->
                                <VRow>
                                    <VCol cols="6">
                                        <VTextField label="Địa chỉ" placeholder="Địa chỉ" v-model="DC.DC_DiaChi" />

                                    </VCol>
                                    <VCol cols="6">
                                        <VTextField label="Phường/Xã" placeholder="Phường/Xã" v-model="DC.DC_PhuongXa" />
                                    </VCol>
                                    <VCol cols="6">
                                        <VTextField label="Quận/Huyện" placeholder="Quận/Huyện" v-model="DC.DC_QuanHuyen" />
                                    </VCol>
                                    <VCol cols="6">
                                        <VTextField label="Tỉnh/TP" placeholder="Tỉnh/TP" v-model="DC.DC_TinhTP" />
                                    </VCol>
                                </VRow>
                            </VCardText>
                        </VCard>
                    </VCol>
                    <VCol cols="12">
                        <VCard title="Hình thức thanh toán">
                            <VRow class="mt-2 mb-2">
                                <VCol cols="1"></VCol>
                                <VCol cols="4">
                                    <v-button class="btn btn-success" @click="ThanhToanKhiNhanHang()">Thanh toán
                                        khi
                                        nhận
                                        hàng</v-button>
                                </VCol>
                                <VCol cols="4">
                                    <v-button class="btn btn-primary" @click="ThanhToanVNPay()">Thanh toán
                                        VNPay</v-button>
                                </VCol>
                                <VCol cols="3">
                                    <v-button class="btn btn-danger" @click="XoaDonHang(this.$route.query.id)">Hủy đơn hàng</v-button>
                                </VCol>
                            </VRow>
                        </VCard>
                    </VCol>
                </VRow>

            </VCard>

        </VCol>
        <VCol cols="6">
            <VCard class="mb-2">
                <h3 class="mt-3 text-center">Chi tiết đơn hàng </h3>
            </VCard>
            <VCard class="text-center">
                <v-table fixed-header style="height: 100%;" height="520px">
                    <thead>
                        <tr>
                            <th class="">
                                STT
                            </th>
                            <th class="">
                                Hình ảnh
                            </th>
                            <th class="">
                                Tên sách
                            </th>
                            <th class="">
                                Số lượng
                            </th>
                            <th class="">
                                Đơn giá
                            </th>
                            <th class="">
                                Thành tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="item, i in CTGH" :key="item.name">
                            <td>
                                {{ i + 1 }}
                            </td>
                            <td><img :src="GetThumNail(item.CTGH_MaSach)" class="img-fluMaCTGH"
                                    style="wMaCTGHth: 100px; height: 100px;" alt="" srcset=""></td>
                            <td>{{ item.CTGH_MaSach }}</td>
                            <td>
                                {{ item.CTGH_SoLuong }}
                            </td>
                            <td>{{ SachGia[i] }}</td>
                            <td>{{ SachGia[i] * item.CTGH_SoLuong }}</td>

                        </tr>
                    </tbody>
                </v-table>
                <VRow class="my-2">
                    <VCol cols="1"></VCol>
                    <VCol cols="3" class="text-start ms-5">Tổng công: {{ SachGia.reduce((acc, cur, index) => acc + (cur *
                        SachSL[index]), 0) }}</VCol>
                    <VCol cols="3" class="text-start ms-5">Số lượng: {{ SL }}</VCol>
                    <VCol cols="2"></VCol>
                </VRow>
            </VCard>
        </VCol>
    </VRow>
</template>