<template>
    <v-carousel style="border-radius: 50px;" height="300">
        <v-carousel-item v-for="(item, index) in image" :key="index" :src="item.srcc" auto></v-carousel-item>
    </v-carousel>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>


export default {
    name: 'CarcousleBanner',
    data() {
        return {
            image: [
                { name: 'image1', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                { name: 'image2', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                { name: 'image3', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
                { name: 'image4', srcc: 'https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg' },
            ],
        }
    },
    mounted() {
        this.hide()
    },
    methods: {
        hide() {
            const vInputDetails = document.querySelector(".v-input__details");
            vInputDetails.style.display = "none"; // Ẩn phần tử
        }
    }
}
</script>
<style>
.v-input {
    border-radius: 10px;
}
</style>