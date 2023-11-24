<template>
    <v-carousel cycle hide-delimiter-background show-arrows="hover" style="border-radius: 50px;" height="380"
        cycleInterval="1000" v-model="activeIndex">
        <v-carousel-item v-for="item in danhgia" :key="item.DG_Ma" auto>
            <VContainer class="bg bg-white h-100">
                <section class="l-card__user mb-5 mx-5">
                    <div class="l-card__userImage">
                        <img :src="GetThumNail(item.DG_MaKH)" alt="Naruto">
                    </div>
                    <div class="l-card__userInfo px-5">
                        <h3>{{ getKHName(item.DG_MaKH) }}</h3>
                        <div class="d-flex ">
                            <h5 style="color: gold;" v-for="i of item.DG_SoSao" :key="i">
                                <font-awesome-icon :icon="['fas', 'star']" />
                            </h5>
                        </div>
                    </div>
                </section>
                <section class="l-card__text w-75 mx-auto">
                    <p>
                        {{ item.DG_NoiDung }}
                    </p>
                </section>

            </VContainer>
        </v-carousel-item>
    </v-carousel>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>

import { defineComponent } from 'vue';

export default defineComponent(
    {
        name: 'CarcousleBanner',
        data() {
            return {
                activeIndex: 0,
                NguoiDungs: "",
                image: [
                    { name: 'image1', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                    { name: 'image2', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                    { name: 'image3', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                    { name: 'image4', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                ],
            }
        },
        mounted() {
            this.getNguoiDung()
        },
        props: {
            danhgia: {
                type: Array, // Kiểu dữ liệu là một mảng
            },
        },
        methods: {
            GetThumNail(S_Ma) {
                const logo = "http://localhost:3000/api/thumbnail/image/KH/" + S_Ma
                return logo;
            },
            getKHName(BL_MaKH) {
                // return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;

                return this.NguoiDungs.find(item => item.KH_MaKH === BL_MaKH).KH_HoTen;


            },
            getNguoiDung() {
                // Sử dụng tính năng fetch() để chỉ gọi dữ liệu một lần
                axios.get(`http://localhost:3000/api/thongtinkhachhang`).then(res => {
                    this.NguoiDungs = res.data;
                    console.log(this.NguoiDungs);
                });
            },
        },

    }
)

</script>
<style>
img {
    width: 100%;
    height: auto;
}

.l-card {
    width: auto;
    min-width: 360px;
    max-width: 480px;
    height: auto;
    background: #f5f5f5;
    color: #272727;
    padding: 50px;
    box-shadow: 0px 7px 24px rgba(100, 100, 100, 0.4);
}

.l-card__text p {
    font-size: 30px;
    font-family: "Vollkorn", serif;
    font-weight: 400;
    color: #3f3f55;
    margin: auto;
    vertical-align: middle;
    text-align: center;
}

.l-card__text p::after {
    content: "\201D";
    display: inline;
    color: #999;
}

.l-card__text p::before {
    content: "\201C";
    display: inline;
    color: #999;
}

.l-card__user {
    display: flex;
    flex-direction: row;
    padding-top: 24px;
    margin-top: 12px;
    /* border-top: 1px solid #c1c1c1; */
    align-items: center;
}

.l-card__userImage {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
}

.l-card__userImage img {
    width: 100%;
    height: 100%;
    object-filt: cover;
}

.l-card__userInfo {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
}

.l-card__userInfo span:nth-child(1) {
    font-weight: bold;
    font-family: sans-serif;
    font-size: 14px;
    color: #3f3f55;
}

.l-card__userInfo span:nth-child(2) {
    color: #adada6;
    font-family: sans-serif;
    font-size: 12px;
    margin-top: 2px;
}
</style>