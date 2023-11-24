<script>
import moment from 'moment'

export default {
    name: "GioHang",
    data() {
        return {
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
            count: [],
            nvv: "",
            productsThanhToan: [],
            SachName: [],
            SachGia: [],
            updatefile: {
                CTGH_SoLuong: "",
                CTGH_NgayCapNhat: ""
            },
            DH: {
                DH_Ma: "",
                DH_MaKH: "NaN",
                DH_Ho: "NaN",
                DH_Ten: "NaN",
                DH_SoDienThoai: "NaN",
                DH_DiaChi: "NaN",
                DH_PhuongXa: "NaN",
                DH_QuanHuyen: "NaN",
                DH_TinhTP: "NaN",
                DH_TrangThai: "NaN",
                DH_NgayTao: "NaN",
            },
            SoLuong: 0,
            ThanhTien: 0,
            LastID1: "",
            NewID1: "",
            So1: "",
            Chu1: "",

        }
    },
    mounted() {
        this.getNV()
        this.CountGH()
        this.GetLastID1()
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

        DeleteCTGH(id) {
            axios.delete(`http://localhost:3000/api/chitietgiohang/` + id).then(res => {

            })
            this.CountGH()
        },
        GetLastID1() {
            axios.get(`http://localhost:3000/api/donhang/getid/getlastdhma`).then(res => {
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
        GetThumNail(S_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
            // console.log(logo)
            return logo
        },
        TangSL(Ma, SL) {
            const now = moment()
            SL++;
            this.updatefile.CTGH_SoLuong = SL;
            this.updatefile.CTGH_NgayCapNhat = now.format("DD-MM-YYYY");
            axios.put(`http://localhost:3000/api/chitietgiohang/capnhatsoluong/` + Ma, this.updatefile)
            this.CountGH()
            this.CountGH()


        },
        GiamSL(Ma, SL) {
            const now = moment()
            SL--;
            this.updatefile.CTGH_SoLuong = SL;
            this.updatefile.CTGH_NgayCapNhat = now.format("DD-MM-YYYY");
            axios.put(`http://localhost:3000/api/chitietgiohang/capnhatsoluong/` + Ma, this.updatefile)
            if (SL == 0) {
                this.DeleteCTGH(Ma);
            }
            this.CountGH()
            this.CountGH()


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

        toThanhToan() {
            this.DH.DH_Ma = this.NewID1
            axios.post('http://localhost:3000/api/donhang', this.DH)
                .then((response) => {
                    console.log("Tạo đơn hàng thành công");
                    this.$router.push({
                        path: '/donhang/' + this.NewID1,
                        query: {
                            id: this.NewID1,
                            products: this.productsThanhToan
                        }

                    });

                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })

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
                for (let i = 0; i < this.count.length; i++) {
                    this.GetSachName(this.count[i].CTGH_MaSach)
                    this.GetSachGia(this.count[i].CTGH_MaSach)
                }
                console.log("newid")
                console.log(this.count)
            })
        },
        addThanhToan(id, sl, gia) {
            
            if (this.productsThanhToan.includes(this.count[id].CTGH_Ma)) {
                this.productsThanhToan.splice(this.productsThanhToan.indexOf(this.count[id].CTGH_Ma), 1);
                this.SoLuong = this.SoLuong - sl;
                this.ThanhTien -= (gia * sl);
            }
            else {
                this.productsThanhToan.push(this.count[id].CTGH_Ma)
                this.SoLuong = this.SoLuong + sl;
                this.ThanhTien += (gia * sl);

            }

        },

        showThanhToan() {
            // Display the content in an alert
            alert(this.productsThanhToan);
        }
    }
}
</script>
<template>
    <VRow>
        <VCol cols="12">
            <VCard class="mb-2">
                <h3 class="mt-3">GIỎ HÀNG </h3>
            </VCard>
            <VCard>
                <v-table fixed-header height="500px">
                    <thead>
                        <tr class="text-start">
                            <th class="">
                                Chọn
                            </th>
                            <th class="">
                                Hình ảnh
                            </th>
                            <th class="">
                                Tên sách
                            </th>
                            <th class="">
                                Giá
                            </th>
                            <th class="">
                                Số lượng
                            </th>
                            <th class="">
                                Thành tiền
                            </th>
                            <th class="">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-white">
                        <tr v-for="(item, index) in count" :key="item.MaSach">
                            <td>
                                <input type="checkbox"  @change="addThanhToan(index, item.CTGH_SoLuong, SachGia[index])"  name="" id="">
                  


                            </td>
                            <td><img :src="GetThumNail(item.CTGH_MaSach)" class="img-fluid"
                                    style="width: 100px; height: 100px;" alt="" srcset=""></td>
                            <td>{{ SachName[index] }}</td>

                            <td>{{ SachGia[index] }}</td>
                            <td>
                                <div class="d-flex">
                                    <button @click="TangSL(item.CTGH_Ma, item.CTGH_SoLuong)">+</button>
                                    &nbsp; &nbsp; &nbsp;
                                    {{ item.CTGH_SoLuong }}
                                    &nbsp; &nbsp; &nbsp;
                                    <button @click="GiamSL(item.CTGH_Ma, item.CTGH_SoLuong)">-</button>

                                </div>
                            </td>
                            <td>{{ SachGia[index] * item.CTGH_SoLuong }}</td>
                            <td>
                                <v-button @click="DeleteCTGH(item.CTGH_Ma)" class="btn btn-danger">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                </v-button>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <VRow class="my-2">
                    <VCol cols="1"></VCol>
                    <VCol cols="3" class="text-start ms-5">
                        <h4>Tổng cộng: {{ ThanhTien }}</h4>
                    </VCol>
                    <VCol cols="3" class="text-start ms-5">
                        <h4>Số lượng: {{ SoLuong }}</h4>
                    </VCol>
                    <VCol cols="2"></VCol>
                    <VCol cols="2">
                        <!-- <VBtn class="btn btn-primary" @click="showThanhToan">Thanh toán</VBtn> -->

                        <v-button class="btn w-100 btn-success" @click="toThanhToan">Thanh toán</v-button>
                    </VCol>

                </VRow>
            </VCard>
        </VCol>
    </VRow>
</template>