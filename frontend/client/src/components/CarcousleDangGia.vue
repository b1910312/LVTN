<template>
    <v-carousel cycle hide-delimiter-background show-arrows="hover" style="border-radius: 50px;" height="380"
        cycleInterval="1000" v-model="activeIndex">
        <v-carousel-item v-for="item in danhgia" :key="item.name" auto>
            <VCard class="h-100" style="background-color: rgba(0, 255,125,0.5);">
                <VRow class="mx-auto my-auto">
                    <VCol cols="12">
                        <VCard class="m-5 " style="background-color: rgba(0, 255,125,0);">

                            <div class=" row w-100">
                                <div class="col-4">
                                    <img :src="GetThumNail(item.MaKH)"
                                        style="border-radius: 15px; height: 200px; width: 200px;" class="img-fluid" alt="">
                                </div>
                                <div class="col-8 py-5">
                                    <VRow>
                                        <h3>Nguyễn Thanh Tín</h3>
                                    </VRow>
                                    <VRow>
                                        <h3>Số sao: {{ item.sosao }}</h3>
                                    </VRow>
                                    <VRow>
                                        <h3>{{ item.Noidung }}</h3>
                                    </VRow>
                                </div>
                            </div>
                        </VCard>
                    </VCol>
                </VRow>
            </VCard>
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
                image: [
                    { name: 'image1', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                    { name: 'image2', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                    { name: 'image3', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                    { name: 'image4', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                ],
            }
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
        },

    }
)

</script>
<style>
.v-input {
    border-radius: 10px;
}
</style>