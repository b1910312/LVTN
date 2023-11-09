<template>
    <div class="w-100 card p-1 m-2" style="background-color: rgba(255, 255, 255, 0.4  );">
        <div class="scroll">
            <div class="item" v-for="product in products" :key="product.name">
                <div class="card" style="    border-radius: 30px;
">
                    <div class="card-head p-3">
                        <img :src="product.imageUrl" style="border-radius: 30px;" class="img-fluid" alt="">
                    </div>
                    <div class="card-body text-start">
                        <h5>{{ product.name }}</h5>
                        <p>Giá: {{ product.price }} VNĐ</p>
                        <div class="row w-100">
                                <button class=" col-7 mx-auto btn btn-success w-100">Chi tiết</button>
                                <div class="col-1 "></div>
                                <button class=" col-3 btn btn-info w-100">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>


export default {
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
    methods: {
        hide() {
            const vInputDetails = document.querySelector(".v-input__details");
            vInputDetails.style.display = "none"; // Ẩn phần tử
        }
    }
}
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

.v-input {
    border-radius: 10px;
}
</style>