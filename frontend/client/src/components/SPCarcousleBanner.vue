<template>
    <v-carousel cycle hide-delimiter-background show-arrows="hover" style="border-radius: 50px;" height="380"
        cycleInterval="1000" v-model="activeIndex">
        <v-carousel-item v-for="item in img" :key="item" :src="item" auto></v-carousel-item>
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
            img: {
                type: Array, // Kiểu dữ liệu là một mảng
            },
        },
        methods: {},

    }
)

</script>
<style>
.v-input {
    border-radius: 10px;
}
</style>