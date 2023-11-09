<template>
    <div class="scroll">
        <div class="item" v-for="pr in sach" :key="pr.S_Ma">
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
                            <button class=" text-white btn btn-info w-100">
                                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                            </button>
                            
                        </VCol>
                    </VRow>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ListSanPham_Ngang',
    data() {
        return {
            prs: [
                {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                },
                {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                },
                {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                }, {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                }, {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                },
                {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                }, {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                }, {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                }, {
                    name: "Đừng để em cô đơn",
                    price: 120000,
                    imageUrl: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg"
                },
                // Thêm thông tin của các sản phẩm khác ở đây
            ]
        }
    },
    props: {
        sach: {
            type: Array, // Kiểu dữ liệu là một mảng
        },
    },
    mounted() {
        console.log(":!2313")
        console.log(this.sach)
    },
    methods: {
        GetThumNail(S_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
            // console.log(logo)
            return logo
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