<template>
    <div class="w-100 card p-1 m-2" style="background-color: rgba(255, 255, 255, 0.4  ); height: 200px;">
        <div class="scroll">
            <div class="item" >
                <div class="card text-white" style="    border-radius: 30px; border: 1px solid rgb(0, 255, 0); background-color: rgba(0, 0, 0, 0.4  );
">

                    <div class="card-body text-center">
                       <h1 class=""><font-awesome-icon :icon="['fas', 'book']" /></h1>
                        <h5>Phân phối sách </h5>
                    </div>
                </div>
            </div>
            <div class="item" >
                <div class="card text-white" style="    border-radius: 30px; border: 1px solid rgb(0, 255, 0); background-color: rgba(0, 0, 0, 0.4  );
">

                    <div class="card-body text-center">
                       <h1 class=""><font-awesome-icon :icon="['fas', 'notes-medical']" /></h1>
                        <h5>Phục hồi sách </h5>
                    </div>
                </div>
            </div>
            <div class="item" >
                <div class="card text-white" style="    border-radius: 30px; border: 1px solid rgb(0, 255, 0); background-color: rgba(0, 0, 0, 0.4  );
">

                    <div class="card-body text-center">
                       <h1 class=""><font-awesome-icon :icon="['fas', 'truck-fast']" /></h1>
                        <h5>Giao hàng tận nơi </h5>
                    </div>
                </div>
            </div>
            <div class="item" >
                <div class="card text-white" style="    border-radius: 30px; border: 1px solid rgb(0, 255, 0); background-color: rgba(0, 0, 0, 0.4  );
">

                    <div class="card-body text-center">
                       <h1 class=""><font-awesome-icon :icon="['fas', 'book-bookmark']" /></h1>
                        <h5>Đặt hàng sách </h5>
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
        },
        methods: {

        }
    }
)
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
    min-width: 280px;
    max-width: 200px;
    margin: 10px 10px;
}
</style>