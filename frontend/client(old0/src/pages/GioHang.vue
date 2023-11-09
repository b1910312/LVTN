<script>
export default {
    name: "GioHang",
    data() {
        return {
            products: [
                { name: "Sách 1", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "120000" },
                { name: "Sách 2", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "25", gia: "150000" },
                { name: "Sách 3", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "1030000" },
                { name: "Sách 4", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "23", gia: "102000" },
                { name: "Sách 5", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "22", gia: "106000" },
                { name: "Sách 6", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "12", gia: "108000" },
                { name: "Sách 1", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "120000" },
                { name: "Sách 2", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "25", gia: "150000" },
                { name: "Sách 3", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "42", gia: "1030000" },
                { name: "Sách 4", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "23", gia: "102000" },
                { name: "Sách 5", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "22", gia: "106000" },
                { name: "Sách 6", img: "https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg", soluong: "12", gia: "108000" }
            ],
            productsThanhToan: [],
        }
    },
    methods: {
        addThanhToan(id) {
            if (this.productsThanhToan.indexOf(id)) {
                this.productsThanhToan.push(id)

            }
            else {
                this.productsThanhToan.splice(id, 1);
            }

        },

        showThanhToan() {
            alert(this.productsThanhToan)
        }
    }
}
</script>
<template>
    <VRow>
        <VCol cols="12">
            <VCard class="mb-2">
                <h3 class="mt-3">GIỎ HÀNG </h3>
            </VCard>
            <VCard>
                <v-table fixed-header height="500px">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Calories
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in products" :key="item.name">
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" @click=" addThanhToan(item.name)" type="checkbox"
                                        value="" id="">
                                    <label class="form-check-label" for="">
                                    </label>
                                </div>

                            </td>
                            <td><img :src="item.img" class="img-fluid" style="width: 100px; height: 100px;" alt="" srcset=""></td>
                            <td>{{ item.name }}</td>
                            <td>
                                <div class="d-flex">
                                    <button>+</button>
                                    &nbsp; &nbsp; &nbsp;
                                    {{ item.soluong }}
                                    &nbsp; &nbsp; &nbsp;
                                    <button>-</button>

                                </div>
                            </td>
                            <td>{{ item.gia }}</td>
                            <td>
                                <VBtn class="btn btn-danger">
                            <td><font-awesome-icon :icon="['fas', 'trash']" /></td>

                            </VBtn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <VRow class="my-2">
                    <VCol cols="1"></VCol>
                    <VCol cols="3" class="text-start ms-5">Tổng công: 123</VCol>
                    <VCol cols="3" class="text-start ms-5">Số lượng: 123</VCol>
                    <VCol cols="2"></VCol>
                    <VCol cols="2">
                        <VBtn class="btn btn-primary">Thanh toán</VBtn>
                    </VCol>

                </VRow>
            </VCard>
        </VCol>
    </VRow>
</template>