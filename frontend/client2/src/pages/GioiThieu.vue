<script>
import ListDichVu from '@/components/ListDichVu.vue';
import CarcousleDangGia from '@/components/CarcousleDangGia.vue';
import LoginSmall from '@/components/LoginSmall.vue';
import moment from 'moment';
export default {
    name: "GioiThieu",
    components: {
        ListDichVu,
        CarcousleDangGia,
        LoginSmall
    },
    data() {
        return {
            LastID3: "",
            NewID3: "",
            So3: "",
            Chu3: "",
            NoidungDanhGia: "",
            tab: 'option-1',
            TenCuaHang: "",
            Logo: "",
            GioiThieu: ` Kingbook là một chuỗi cửa hàng sách uy tín hàng đầu tại Việt Nam. Với sứ mệnh “Trao tri thức, nối nhịp văn hóa”, Kingbook luôn nỗ lực mang đến cho khách hàng những trải nghiệm mua sắm sách chất lượng cao với giá cả hợp lý.

Kingbook hiện có hơn 100 cửa hàng trải dài khắp cả nước, từ thành thị đến nông thôn. Tại Kingbook, khách hàng có thể tìm thấy đầy đủ các loại sách từ sách giáo khoa, sách tham khảo, sách văn học, sách kỹ năng, sách thiếu nhi,... với hơn 1 triệu đầu sách.

Kingbook không chỉ là một địa chỉ mua sắm sách, mà còn là một không gian văn hóa dành cho mọi người. Tại Kingbook, khách hàng có thể tham gia các buổi giao lưu, tọa đàm với các tác giả, nhà văn, nhà thơ,... hoặc tham gia các câu lạc bộ sách để cùng chia sẻ và học hỏi.`,
            SuMenh: `
            Sứ mệnh của Kingbook là “Trao tri thức, nối nhịp văn hóa”. Để thực hiện sứ mệnh này, Kingbook cần cung cấp đầy đủ các loại sách từ sách giáo khoa, sách tham khảo, sách văn học, sách kỹ năng, sách thiếu nhi,... để đáp ứng nhu cầu của mọi đối tượng khách hàng. Kingbook cũng cần nhập khẩu các đầu sách mới, sách hay từ các nước trên thế giới để mang đến cho khách hàng những lựa chọn phong phú.

Ngoài ra, Kingbook cần tổ chức các hoạt động văn hóa, giáo dục nhằm khuyến khích mọi người đọc sách. Các hoạt động này có thể bao gồm: các buổi giao lưu, tọa đàm với các tác giả, nhà văn, nhà thơ; các câu lạc bộ sách; các cuộc thi đọc sách,...

Để tạo ra một không gian văn hóa lành mạnh, bổ ích, Kingbook cần thiết kế không gian mua sắm thân thiện, gần gũi, tạo cảm giác thoải mái cho khách hàng khi đến mua sắm và tham gia các hoạt động văn hóa, giáo dục.

Với những hoạt động cụ thể này, Kingbook mong muốn góp phần thúc đẩy phát triển văn hóa đọc tại Việt Nam, nâng cao dân trí, phát triển xã hội.`,
            TamNhin: `
            Kingbook phấn đấu trở thành chuỗi cửa hàng sách hàng đầu tại Việt Nam, là điểm đến tin cậy của mọi đối tượng khách hàng.

Tầm nhìn của Kingbook thể hiện khát vọng trở thành một doanh nghiệp dẫn đầu trong lĩnh vực kinh doanh sách tại Việt Nam. Với tầm nhìn này, Kingbook cam kết mang đến cho khách hàng những trải nghiệm mua sắm sách tốt nhất, đáp ứng mọi nhu cầu của khách hàng, từ học tập, nghiên cứu đến giải trí, thư giãn.

Để đạt được tầm nhìn này, Kingbook cần không ngừng nỗ lực phát triển, mở rộng quy mô kinh doanh, đồng thời nâng cao chất lượng sản phẩm, dịch vụ. Kingbook cũng cần xây dựng một đội ngũ nhân viên chuyên nghiệp, tận tâm, mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời.`,

            danhgia: [
                { MaKH: "KBKH002", sosao: 5, Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: 5, Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: 5, Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: 5, Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: 5, Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: 5, Noidung: "Tốt" },

            ],
            RateStar: 0,
            DGs: [],
            DaDanhGia: false,
            nvv: "",
            DGMessage: "",
            DGMessageSuccess: "",
            DanhGiaXong: false,
        }
    },
    mounted() {
        this.getNV()
        this.GetLastID3()
        this.GetDG()
        this.CheckKH1(this.nvv.TKKH_MaKH)

    },
    methods: {
        getNV() {
            if (JSON.parse(localStorage.getItem("khachhang")) != null) {
                this.nvv = JSON.parse(localStorage.getItem("khachhang"))
            }
            console.log(this.nvv);
        },

        CheckKH(KH_Ma) {
            axios.get(`http://localhost:3000/api/danhgiacuahang/checkKH/` + KH_Ma)
                .then(res => {
                    this.DaDanhGia = res.data
                    this.GetDG()

                })
                .catch(err => {
                    console.log(err)
                })
        },
        CheckKH1(KH_Ma) {
            axios.get(`http://localhost:3000/api/danhgiacuahang/checkKH/` + KH_Ma)
                .then(res => {
                    this.DaDanhGia = res.data
                    if(res.data == true){
                        this.DGMessage = "Bạn đã đánh giá cho cửa hàng trước đó, bạn không thể đáng giá thêm"
                    }
                    this.GetDG()

                })
                .catch(err => {
                    console.log(err)
                })
        },
        SetStar(SoSao) {
            this.RateStar = SoSao
        },
        GetDG() {
            axios.get(`http://localhost:3000/api/danhgiacuahang`)
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
            axios.get(`http://localhost:3000/api/danhgiacuahang/getid/getlastdgma`).then(res => {
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
            let [Text, result] = this.LastID3.split("DGCH");
            this.So3 = result;
            this.Chu3 = Text1;
        },
        DanhGiaCH() {
            const data = {
                DG_Ma: this.NewID3,
                DG_MaKH: this.nvv.TKKH_MaKH,
                DG_NoiDung: this.NoidungDanhGia,
                DG_SoSao: this.RateStar,
                DG_NgayTao: moment().format("DD-MM-YYYY")
            }
            if (this.DaDanhGia == false) {
                axios.post(`http://localhost:3000/api/danhgiacuahang`, data)
                    .then(res => {
                        this.GetDG()
                        this.DanhGiaXong = true
                        this.DGMessageSuccess ="Bạn đã đáng thành công cho cửa hàng, chúc bạn một ngày mua sắm vui vẻ!"
                        this.CheckKH(data.DG_MaKH)
                        console.log("Đánh giá thành công")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        },
        CheckValueDG() {
            if (this.RateStar == 0) {
                this.DGMessage = "Bạn chưa chọn số sao muốn đánh giá"
                return false;
            }
            if (this.NoidungDanhGia == "") {
                this.DGMessage = "Bạn chưa nhập nội dung muốn đánh giá"
                return false;
            }
            this.DanhGiaCH()
        }

    },

}
</script>
<template>
    <VContainer>
        <VRow>
            <v-tabs v-model="tab" direction="vertical" color="success">
                <v-tab value="option-1">

                    Về chúng tôi
                </v-tab>
                <v-tab value="option-2">

                    Tầm nhìn
                </v-tab>
                <v-tab value="option-3">


                    Sứ mệnh
                </v-tab>
            </v-tabs>
            <VCol cols="10">
                <v-window v-model="tab">
                    <v-window-item value="option-1">
                        <VCard style="background-color: rgba(0, 255, 125, 0.5);; border-radius:10px ;" class="p-4 m-1  ">
                            <div class="row w-100">
                                <div class="col-12 text-start text-white">
                                    <VCardTitle class="text-center h4"> VỀ CHÚNG TÔI</VCardTitle>
                                    <VCardText class="h5"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ GioiThieu }}</VCardText>
                                </div>
                            </div>
                        </VCard>
                    </v-window-item>
                    <v-window-item value="option-2">
                        <VCard style="background-color: rgba(0, 255, 125, 0.5);; border-radius:10px ;"
                            class="p-4 m-1 text-white">

                            <div class=" text-start text-white">
                                <VCardTitle class="text-center h4"> TẦM NHÌN</VCardTitle>

                                <VCardText class="h5"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ TamNhin }}</VCardText>
                            </div>
                        </VCard>
                    </v-window-item>
                    <v-window-item value="option-3">
                        <VCard style="background-color: rgba(0, 255, 125, 0.5);; border-radius:10px ;"
                            class="p-4 m-1 text-white ">

                            <div class=" text-start text-white">
                                <VCardTitle class="text-center h4">SỨ MỆNH</VCardTitle>

                                <VCardText class="h5">
                                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ SuMenh }}
                                </VCardText>
                            </div>
                        </VCard>
                    </v-window-item>
                </v-window>
            </VCol>
        </VRow>
        <!-- Nav tabs -->

    </VContainer>

    <VRow class="mt-2">
        <VCol cols="10 mx-auto">
            <VCard style="background-color: rgba(0, 255, 4, 0.2); border-radius:50px ;">
                <VCardTitle class="text-white text-center h5">CÁC DỊCH VỤ</VCardTitle>
                <VRow>
                    <ListDichVu />
                </VRow>
            </VCard>
        </VCol>
    </VRow>
    <VRow class="bggt">
        <VCol cols="12" v-if="nvv!=''" >
            <VCard style="background-color: rgba(0, 255, 4, 0);">
                <VCardTitle class="text-center">
                    <h4>ĐÁNH GIÁ CỬA HÀNG</h4>
                    <!-- <p class="text-success text-center" v-if="DanhGiaXong == true">{{ DGMessageSuccess }}</p> -->
                    <p class="text-danger text-center" v-if="DaDanhGia == true || RateStar == 0 || NoidungDanhGia == '' ">{{ DGMessage }}</p>
                </VCardTitle >
                <div class="row w-100">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <!-- Hiển thị số sao hiện tại -->
                        <!-- Hiển thị các nút đánh giá sao -->
                        <div class="row w-100">
                            <!-- <button v-for="star in 5" class="mx-auto col" :key="star" @click="rateProduct(star)">
                               <h3 :class="{ starbutton: star <= 5 }"> <font-awesome-icon :icon="['fas', 'star']" /></h3>
                            </button> -->
                            <div class="rating-stars">
                                <input type="radio" @click="SetStar(1)" name="rating" id="rs0"><label class="starlabel"
                                    for="rs0"></label>
                                <input type="radio" @click="SetStar(2)" name="rating" id="rs1"><label class="starlabel"
                                    for="rs1"></label>
                                <input type="radio" @click="SetStar(3)" name="rating" id="rs2" checked><label
                                    class="starlabel" for="rs2"></label>
                                <input type="radio" @click="SetStar(4)" name="rating" id="rs3"><label class="starlabel"
                                    for="rs3"></label>
                                <input type="radio" @click="SetStar(5)" name="rating" id="rs4"><label class="starlabel"
                                    for="rs4"></label>
                                <span class="number"></span>
                            </div>
                        </div>

                        <!-- Hiển thị đánh giá từ người dùng -->
                        <!-- <div class="mt-3">
                                        <div class="alert alert-info" v-for="(review, index) in reviews" :key="index">
                                            {{ review.rating }} ★ - {{ review.comment }}
                                        </div>
                                    </div> -->
                    </div>
                    <div class="col-3"></div>
                </div>
                <VRow class="mt-2 text-dark">
                    <VCol cols="2"></VCol>
                    <VCol cols="7">
                        <VTextField v-model="NoidungDanhGia" label="Nội dung đánh giá" class="bg bg-white"
                            placeholder="Nhập nội dung đánh giá tại đây"></VTextField>
                    </VCol>
                    <VCol cols="1">
                        <v-button @click="CheckValueDG()" style="background-color: rgba(0, 255, 4, 1);" class="btn h-100 w-100 text-white ">
                            <h4 class="my-auto" >Gửi
                            </h4>
                        </v-button>
                    </VCol>
                </VRow>
            </VCard>
        </VCol>
        <VCol cols="7" class="mx-auto" v-if="nvv==''" >
                <LoginSmall/>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="8" class="mx-auto">
            <CarcousleDangGia :danhgia="DGs" />
        </VCol>
    </VRow>
</template>
<style>
.bggt {
    background-image: url("@/assets/images/bggt.png");
    background-size: cover;
}

/* .starbutton {
    color: white
}

.starbutton:hover {
    color: gold;
} */

.rating-stars {
    display: block;
    width: 65vmin;

    border-radius: 5vmin;
    position: relative;
    display: flex;
    justify-content: center;
    transform: rotateX(15deg);
}

input {
    display: none;
}

label.starlabel {
    width: 10vmin;
    height: 10vmin;
    cursor: pointer;
    margin: 0.5vmin 1.5vmin;
    transition: var(--tran);
    transition-delay: 0s;
    position: relative;
}

label.starlabel:before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "\2605";
    z-index: 2;
    font-size: 11vmin;
    line-height: 11vmin;
    color: #f2f1be;
    text-align: center;
    transform: translateY(0vmin);
    transition: var(--tran);
    text-shadow:
        1px 1px 1px var(--tb),
        -1px -1px 1px var(--tb),
        -1px 0px 1px var(--tb),
        1px 0px 1px var(--tb),
        0vmin 0.1vmin 1px #ffeb3b,
        0vmin 0.1vmin 1px #ffeb3b,
        0vmin 0.2vmin 1px #ffd700,
        0vmin 0.2vmin 1px #ffd700,
        0vmin 0.3vmin 1px #ffd700,
        0vmin 0.3vmin 1px #ffd700,
        0vmin 0.4vmin 1px #ffd700,
        0vmin 0.4vmin 1px #ffd700,
        0vmin 0.5vmin 1px #ffd700,
        0vmin 0.5vmin 1px #ffd700,
        0vmin 0.6vmin 1px #ffd700,
        0vmin 0.6vmin 1px #ffd700,
        0vmin 0.7vmin 1px #ffd700,
        0vmin 0.7vmin 1px #ffd700,
        0vmin 0.8vmin 1px #ffd700,
        0vmin 0.8vmin 1px #ffd700,
        0vmin 0.9vmin 1px #ffd700,
        0vmin 0.9vmin 1px #ffd700,
        0vmin 1.0vmin 1px #ffd700,
        0vmin 1.1vmin 1px #ffd700,
        0vmin 1.1vmin 1px #ffd700,
        0vmin 1.2vmin 1px #ffd700,
        0vmin 1.2vmin 1px #ffd700,
        0vmin 1.3vmin 1px #ffd700,
        0vmin 1.3vmin 1px #ffd700,
        0vmin 1.4vmin 1px #ffd700,
        0vmin 1.4vmin 1px #ffd700,
        0vmin 1.5vmin 1px #ffd700,
        0vmin 1.5vmin 1px #ffd700,
        0vmin 1.6vmin 1px #ffd700,
        0vmin 1.6vmin 1px #ffd700,
        0vmin 1.6vmin 3px #ffeb3b;

    filter: drop-shadow(0px 5px 10px #f2ff00) drop-shadow(0px 5px 30px #ddff00);
}

label.starlabel:hover:before {
    color: #e8fb36;
    filter: drop-shadow(0px 5px 15px #b1ddff) drop-shadow(0px 5px 30px #b1ddff);
}




/*** unchecked:before ***/
input:checked+label.starlabel~label.starlabel:before,
input:checked+label.starlabel~label.starlabel:hover:active:before {
    transition: var(--tran);
    color: rgb(242, 255, 0);
    color: #18242f;
    transform: translateY(1.5vmin);
    filter: none;
    text-shadow:
        1px 1px 1px var(--tbh),
        -1px -1px 1px var(--tbh),
        -1px 0px 1px var(--tbh),
        1px 0px 1px var(--tbh),
        0vmin 0.1vmin 1px #ffeb3b,
        0vmin 0.1vmin 1px #ffeb3b,
        0vmin 0.2vmin 1px #ffd700,
        0vmin 0.2vmin 1px #ffd700,
        0vmin 0.3vmin 1px #ffd700,
        0vmin 0.3vmin 1px #ffd700,
        0vmin 0.4vmin 1px #ffd700,
        0vmin 0.4vmin 1px #ffd700,
        0vmin 0.5vmin 1px #ffd700,
        0vmin 0.5vmin 1px #ffd700,
        0vmin 0.6vmin 1px #ffd700,
        0vmin 0.6vmin 1px #ffd700,
        0vmin 0.7vmin 1px #ffd700,
        0vmin 0.7vmin 1px #ffd700,
        0vmin 0.8vmin 1px #ffd700,
        0vmin 0.8vmin 1px #ffd700,
        0vmin 0.9vmin 1px #ffd700,
        0vmin 0.9vmin 1px #ffd700,
        0vmin 1.0vmin 1px #ffd700,
        0vmin 1.1vmin 1px #ffd700,
        0vmin 1.1vmin 1px #ffd700,
        0vmin 1.2vmin 1px #ffd700,
        0vmin 1.2vmin 1px #ffd700,
        0vmin 1.3vmin 1px #ffd700,
        0vmin 1.3vmin 1px #ffd700,
        0vmin 1.4vmin 1px #ffd700,
        0vmin 1.4vmin 1px #ffd700,
        0vmin 1.5vmin 1px #ffd700,
        0vmin 1.5vmin 1px #ffd700,
        0vmin 1.6vmin 1px #ffd700,
        0vmin 1.6vmin 1px #ffd700,
        0vmin 1.6vmin 3px #ffeb3b;

}



/*** unchecked:hover:before ***/
input:checked+label.starlabel~label.starlabel:hover:before,
label.starlabel~label.starlabel:hover:active:before {
    color: #f2ff00;
    transform: translateY(1vmin);
    text-shadow:
        1px 1px 1px var(--tbh),
        -1px -1px 1px var(--tbh),
        -1px 0px 1px var(--tbh),
        1px 0px 1px var(--tbh),
        0vmin 0.1vmin 1px #ffeb3b,
        0vmin 0.1vmin 1px #ffeb3b,
        0vmin 0.2vmin 1px #ffd700,
        0vmin 0.2vmin 1px #ffd700,
        0vmin 0.3vmin 1px #ffd700,
        0vmin 0.3vmin 1px #ffd700,
        0vmin 0.4vmin 1px #ffd700,
        0vmin 0.4vmin 1px #ffd700,
        0vmin 0.5vmin 1px #ffd700,
        0vmin 0.5vmin 1px #ffd700,
        0vmin 0.6vmin 1px #ffd700,
        0vmin 0.6vmin 1px #ffd700,
        0vmin 0.7vmin 1px #ffd700,
        0vmin 0.7vmin 1px #ffd700,
        0vmin 0.8vmin 1px #ffd700,
        0vmin 0.8vmin 1px #ffd700,
        0vmin 0.9vmin 1px #ffd700,
        0vmin 0.9vmin 1px #ffd700,
        0vmin 1.0vmin 1px #ffd700,
        0vmin 1.1vmin 1px #ffd700,
        0vmin 1.1vmin 1px #ffd700,
        0vmin 1.2vmin 1px #ffd700,
        0vmin 1.2vmin 1px #ffd700,
        0vmin 1.3vmin 1px #ffd700,
        0vmin 1.3vmin 1px #ffd700,
        0vmin 1.4vmin 1px #ffd700,
        0vmin 1.4vmin 1px #ffd700,
        0vmin 1.5vmin 1px #ffd700,
        0vmin 1.5vmin 1px #ffd700,
        0vmin 1.6vmin 1px #ffd700,
        0vmin 1.6vmin 1px #ffd700,
        0vmin 1.6vmin 3px #ffeb3b;

}


label.starlabel[for=rs1]:before {
    transition-delay: 0.05s;
}

label.starlabel[for=rs2]:before {
    transition-delay: 0.1s;
}

label.starlabel[for=rs3]:before {
    transition-delay: 0.15s;
}

label.starlabel[for=rs4]:before {
    transition-delay: 0.2s;
}

label.starlabel[for=rs5]:before {
    transition-delay: 0.25s;
}
</style>