<template>
    <div class="w-100 card p-1 m-2" style="background-color: rgba(0, 0, 0, 0.1);">
       
        <div style=" height: 600px; overflow-y: auto;" class="ps-5 ">
            <div class="row w-100 ">
                <div v-for="pr in sach" :key="pr.S_Ma" class=" card col-12 col-md-3 p-3 mt-2 text-white" style="border-radius: 30px; border: 1px solid rgb(0, 255, 0); background-color: rgba(0, 0, 0, 0.4  );">
                    <img :src="GetThumNail(pr.S_Ma)" class="img-fluid imgcard" alt="">
                    <div style="height: 30px;">
                        <h5 class="text-start mt-3 mb-3">{{ pr.S_Ten }}</h5>
                    </div>
                    <div>
                        <p class="text-start mt-3 mb-3">Giá: {{ pr.S_Gia }} VNĐ</p>
                        <!-- <p class="text-start mt-3 mb-3">Thể loại: {{ GetThumNail(pr.S_TheLoai) }} VNĐ</p> -->
                    </div>
                    <VRow>
                        <VCol cols="8"> <button class=" col-6 mx-auto btn btn-success w-100" @click="this.$router.push(`/chitietsach/`+pr.S_Ma)">Chi tiết</button>
                        </VCol>
                        <VCol cols="4"> <button class=" col-2 btn btn-info w-100">+</button>
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

export default defineComponent(
    {
        name: 'ListSanPham_Ngang',
        data() {
            return {
                products: [
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
        methods: {
            GetThumNail(S_Ma) {
                const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
                // console.log(logo)
                return logo
            },

        }
    }
)
</script>
<style>
.scroll {
    display: flex;
    overflow-y: scroll;
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