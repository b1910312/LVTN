<script>
export default {
    name: "DonHang",
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
        }
    }
}
</script>
<template>
    <VRow>
        <VCol cols="12">
            <VCard class="mb-2">
                <h3 class="mt-3">Đơn hàng {{ this.$route.params.id }} </h3>
            </VCard>
            <VCard class="mb-2">
                <VRow>
                    <VCol cols="6">
                        <VCard title="Thông tin người nhận">

                            <VCardText>
                                <VRow>
                                    <VCol cols="12">
                                        <VTextField label="Họ tên" placeholder="Họ tên" type="password" />

                                    </VCol>
                                    <VCol cols="12">
                                        <VTextField label="Số điện thoại" placeholder="Số điện thoại" type="password" />
                                    </VCol>

                                </VRow>
                            </VCardText>




                        </VCard>
                    </VCol>
                    <VCol cols="6">
                        <VCard title="Địa chỉ nhận hàng">

                            <VCardText>
                                <!-- 👉 Current Password -->

                                <!-- 👉 New Password -->
                                <VRow>
                                    <VCol cols="6">
                                        <VTextField label="Địa chỉ" placeholder="Địa chỉ" type="password" />

                                    </VCol>
                                    <VCol cols="6">
                                        <VTextField label="Phường/Xã" placeholder="Phường/Xã" type="password" />
                                    </VCol>
                                    <VCol cols="6">
                                        <VTextField label="Quận/Huyện" placeholder="Quận/Huyện" type="password" />
                                    </VCol>
                                    <VCol cols="6">
                                        <VTextField label="Tỉnh/TP" placeholder="Tỉnh/TP" type="password" />
                                    </VCol>
                                </VRow>
                            </VCardText>
                        </VCard>
                    </VCol>
                </VRow>

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
                        <tr v-for="item,i in products" :key="item.name">
                            <td>
                              {{ i+1 }}
                            </td>
                            <td><img :src="item.img" class="img-fluid" style="width: 100px; height: 100px;" alt=""
                                    srcset=""></td>
                            <td>{{ item.name }}</td>
                            <td>
                                {{ item.soluong }}
                            </td>
                            <td>{{ item.gia }}</td>
                            
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