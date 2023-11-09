<template>
    <div class="w-100 card p-1 m-2" style="background-color: rgba(255, 255, 255, 0.4  );">
        <v-row>
            <v-col cols="12">
                <v-card class="" style="border-radius: 30px; font-weight: bolder; ">
                    <h5 class="mt-2"><b>Danh sách sản phẩm</b></h5>
                </v-card>

            </v-col>


        </v-row>
        <div style=" height: 600px; overflow-y: auto;" class="ps-5 ">
            <div class="row w-100 ">
                <div v-for="pr in sach" :key="pr.S_Ma" class=" card col-12 col-md-3 p-3 mt-2 " style="border-radius: 30px;">
                    <!-- <img :src="`http://localhost:3000/api/thumbnail/image/TB/`+pr.S_Ma" class="img-fluid" alt=""> -->
                    <div style="height: 30px;">
                        <h5 class="text-start mt-3 mb-3">{{ pr.S_Ten }}</h5>
                    </div>
                    <div>
                        <p class="text-start mt-3 mb-3">Giá: {{ pr.S_Gia }} VNĐ</p>
                        <p class="text-start mt-3 mb-3">Thể loại: {{ GetThumNail(pr.S_TheLoai) }} VNĐ</p>
                    </div>
                    <div class="row w-100">
                        <div class="col-1"></div>
                        <button class=" col-6 mx-auto btn btn-success w-100">Chi tiết</button>
                        <div class="col-1 "></div>
                        <button class=" col-2 btn btn-info w-100">+</button>
                    </div>
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
    mounted() {
        this.hide()
    },
    props: {
        sach: {
            type: Array, // Kiểu dữ liệu là một mảng
        },
    },
    methods: {
        hide() {
            const vInputDetails = document.querySelector(".v-input__details");
            vInputDetails.style.display = "none"; // Ẩn phần tử
        },
        showSach() {
            alert(JSON.stringify(this.sach));
        },
        GetThumNail(TL_Ma) {
            const logo = "http://localhost:3000/api/theloai/" + TL_Ma
          
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

.v-input {
    border-radius: 10px;
}
</style>