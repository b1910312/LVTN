<script>
import CarcousleBanner from '@/components/CarcousleBanner.vue';
import ListSanPham_NgangVue from '@/components/ListSanPham_Ngang.vue';
export default {
    name: "ChiTietSach",
    data() {
        return {
            Sach: {
                name: "hello",
                img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                gia: 20000,
                soluong: 100
            },
            BinhLuan: [
                {

                    id: "1",
                    name: "Thanh Tín ",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 1",
                    ReplyId: "",


                },
                {

                    id: "2",
                    name: "Thanh Tín",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 2",
                    ReplyId: "1",

                }, {
                    id: "3",
                    name: "Thanh Tín",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 3",
                    ReplyId: "",


                }, {
                    id: "4",
                    name: "Thanh Tín",
                    img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg",
                    NoiDung: "Xin chào tôi là Thanh Tín 4",
                    ReplyId: "1",

                },

            ],
            currentRating: 0,  // Số sao hiện tại
            reviews: [],

        }
    },
    components: {
        CarcousleBanner,
        ListSanPham_NgangVue
    },
    mounted() {

    },
    created() {

    },
    props: {
        // rating: {
        //     type: Number,
        //     default: 0,
        // },
        // count: {
        //     type: Number,
        //     default: 0,
        // },
        // reviews: {
        //     type: Array,
        //     default: () => [],
        // },
    },
    methods: {
        hientraloi(id) {
            const vInputDetails = document.getElementById(id);
            vInputDetails.style.display = "contents"; // Ẩn phần tử
        },
        antraloi(id) {
            const vInputDetails = document.getElementById(id);
            vInputDetails.style.display = "none"; // Ẩn phần tử
        },
        rateProduct(rating) {
            // Cập nhật số sao hiện tại
            this.currentRating = rating;

            // Thêm đánh giá từ người dùng vào mảng
            this.reviews.push({
                rating: rating,
                comment: "Mô tả đánh giá"  // Thay thế bằng nội dung thực tế từ người dùng
            });
        }
    }
}
</script>
<template>
    <VRow>
        <VCol cols="6" class="my-auto">
            <CarcousleBanner />
        </VCol>
        <VCol cols="6">
            <VCard :title="Sach.name">
                <v-table theme="light">
                    <tbody class="text-start">
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Tên sách:</td>
                            <td class="col-7">{{ Sach.name }}</td>


                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Tác giả:</td>
                            <td class="col-7">{{ Sach.gia }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Nhà xuất bản:</td>
                            <td class="col-7">{{ Sach.gia }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Thể loại:</td>
                            <td class="col-7">{{ Sach.gia }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Giá:</td>
                            <td class="col-7">{{ Sach.gia }}</td>
                        </tr>
                        <tr class="row w-100">
                            <td class="col-1"></td>
                            <td class="col-4">Số lượng:</td>
                            <td class="col-7">{{ Sach.soluong }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="12">
            <VCard>
                <!-- Nav tabs -->
               

                <!-- Tab panes -->
                <h3 class="mt-3 text-start ms-5">ĐÁNH GIÁ</h3>

                <div class="row">
                    <div class="col-4">
                        <!-- Hiển thị số sao hiện tại -->
                        <p>Số sao hiện tại: {{ currentRating }}</p>
                        <!-- Hiển thị các nút đánh giá sao -->
                        <div>
                            <button v-for="star in 5" :key="star" @click="rateProduct(star)" class="btn btn-warning">
                                {{ star }} ★
                            </button>
                        </div>

                        <!-- Hiển thị đánh giá từ người dùng -->
                        <!-- <div class="mt-3">
                                        <div class="alert alert-info" v-for="(review, index) in reviews" :key="index">
                                            {{ review.rating }} ★ - {{ review.comment }}
                                        </div>
                                    </div> -->
                    </div>
                </div>
                <h3 class=" text-start ms-5 mt-3">BÌNH LUẬN</h3>
                <Vcard class=" text-dark">
                    <!-- <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-1">
                                <VCol cols="1">
                                    <img :src="Sach.img" style="border-radius: 50px;"
                                        class="img-fluid" alt="">
                                </VCol>
                                <VCol cols="9 " class="ms-3 text-start">
                                    <p>xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin
                                        chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin
                                        chafo xin chafo xin chafo xin chafo xin chafo </p>
                                </VCol>
                                <VCol cols="1">
                                    <VBtn class="bg bg-primary"> Trả lời</VBtn>
                                </VCol>
                                <VCol cols="1"> </VCol>
                                <VCol cols="10">
                                    <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-1">
                                        <VCol cols="1">
                                            <img :src="Sach.img"
                                                style="border-radius: 50px;"
                                                class="img-fluid" alt="">
                                        </VCol>
                                        <VCol cols="9" class="ms-3 text-start">
                                            <p>xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin
                                                chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo
                                                xin chafo xin chafo xin chafo xin chafo xin chafo xin chafo </p>
                                        </VCol>

                                    </VRow>
                                </VCol>
                            </VRow> -->
                    <VRow v-for="binhluan in BinhLuan" :key="binhluan.name"
                        style="border: 1px solid rgba(164, 164, 164, 0.3);" class="m-1">
                        <VCol v-if="binhluan.ReplyId === ''" cols="1">
                            <img :src="binhluan.img" style="border-radius: 50px;" class="img-fluid" alt="">
                        </VCol>
                        <VCol v-if="binhluan.ReplyId === ''" cols="9 " class="ms-3 text-start">
                            <p>{{ binhluan.NoiDung }} </p>
                        </VCol>
                        <VCol v-if="binhluan.ReplyId === ''" cols="1">
                            <VBtn class="bg bg-primary" @click="hientraloi(binhluan.id)"> Trả lời</VBtn>
                        </VCol>
                        <VCol cols="12" v-if="binhluan.ReplyId === ''">
                            <VRow v-for="reply in BinhLuan" :key="reply.name">
                                <VCol v-if="reply.ReplyId === binhluan.id" cols="1"> </VCol>
                                <VCol v-if="reply.ReplyId === binhluan.id" cols="10">
                                    <VRow style="border: 1px solid rgba(164, 164, 164, 0.3);" class="mb-1">
                                        <VCol cols="1">
                                            <img :src="reply.img" style="border-radius: 50px;" class="img-fluid" alt="">
                                        </VCol>
                                        <VCol cols="9" class="ms-3 text-start">
                                            <p>{{ reply.NoiDung }} </p>
                                        </VCol>
                                    </VRow>
                                </VCol>
                            </VRow>
                        </VCol>
                        <VRow v-if="binhluan.ReplyId === ''" :id="binhluan.id" style="display: none;">
                            <VCol cols="11">
                                <VCard class="mb-4 ms-5">
                                    <VTextarea rows="1" class=" w-100" placeholder="Nhập bình luận tại đây">
                                    </VTextarea>
                                </VCard>
                            </VCol>
                            <VCol cols="1">
                                <VBtn class="btn btn-primary" @click="antraloi(binhluan.id)">Gửi</VBtn>
                            </VCol>
                        </VRow>
                    </VRow>
                </Vcard>
                <VRow>
                    <VCol cols="11">
                        <VCard class="mb-4 ms-5">
                            <VTextarea rows="1" class=" w-100" placeholder="Nhập bình luận tại đây"></VTextarea>
                        </VCard>
                    </VCol>
                    <VCol cols="1">
                        <VBtn class="btn btn-primary">Gửi</VBtn>
                    </VCol>
                </VRow>

            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <ListSanPham_NgangVue/>
    </VRow>
</template>

<style>
.product-review {
    margin-bottom: 20px;
}

.product-review-header {
    background-color: #f5f5f5;
    padding: 10px;
}

.product-review-summary {
    margin-top: 10px;
}

.product-review-rating {
    font-size: 18px;
    font-weight: bold;
}

.product-review-count {
    font-size: 14px;
}

.product-review-list {
    margin-top: 20px;
}

.product-review-item {
    margin-bottom: 10px;
}

.product-review-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.product-review-content {
    margin-left: 60px;
}

.product-review-author {
    font-size: 16px;
    font-weight: bold;
}

.product-review-date {
    font-size: 14px;
}

.product-review-text {
    font-size: 14px;
}

.product-review-rating {
    display: flex;
    justify-content: center;
}

.product-review-star {
    width: 20px;
    height: 20px;
    background-color: #ff0000;
    border-radius: 50%;
}

.product-review-pagination {
    text-align: center;
}
</style>