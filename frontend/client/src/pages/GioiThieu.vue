<script>
import ListDichVu from '@/components/ListDichVu.vue';
import CarcousleDangGia from '@/components/CarcousleDangGia.vue';
export default {
    name: "GioiThieu",
    components: {
        ListDichVu,
        CarcousleDangGia
    },
    data() {
        return {
            tab: 'option-1',
            TenCuaHang: "",
            Logo: "",
            GioiThieu: ` Kingbook là một chuỗi cửa hàng sách uy tín hàng đầu tại Việt Nam. Với sứ mệnh “Trao tri thức, nối nhịp văn hóa”, Kingbook luôn nỗ lực mang đến cho khách hàng những trải nghiệm mua sắm sách chất lượng cao với giá cả hợp lý.

Kingbook hiện có hơn 100 cửa hàng trải dài khắp cả nước, từ thành thị đến nông thôn. Tại Kingbook, khách hàng có thể tìm thấy đầy đủ các loại sách từ sách giáo khoa, sách tham khảo, sách văn học, sách kỹ năng, sách thiếu nhi,... với hơn 1 triệu đầu sách.

Kingbook không chỉ là một địa chỉ mua sắm sách, mà còn là một không gian văn hóa dành cho mọi người. Tại Kingbook, khách hàng có thể tham gia các buổi giao lưu, tọa đàm với các tác giả, nhà văn, nhà thơ,... hoặc tham gia các câu lạc bộ sách để cùng chia sẻ và học hỏi.`,
            SuMenh: `
            Sứ mệnh của Kingbook là “Trao tri thức, nối nhịp văn hóa”. Để thực hiện sứ mệnh này, Kingbook cần cung cấp đầy đủ các loại sách từ sách giáo khoa, sách tham khảo, sách văn học, sách kỹ năng, sách thiếu nhi,... để đáp ứng nhu cầu của mọi đối tượng khách hàng. Kingbook cũng cần nhập khẩu các đầu sách mới, sách hay từ các nước trên thế giới để mang đến cho khách hàng những lựa chọn phong phú.

Ngoài ra, Kingbook cần tổ chức các hoạt động văn hóa, giáo dục nhằm khuyến khích mọi người đọc sách. Các hoạt động này có thể bao gồm: các buổi giao lưu, tọa đàm với các tác giả, nhà văn, nhà thơ; các câu lạc bộ sách; các cuộc thi đọc sách,...

Để tạo ra một không gian văn hóa lành mạnh, bổ ích, Kingbook cần thiết kế không gian mua sắm thân thiện, gần gũi, tạo cảm giác thoải mái cho khách hàng khi đến mua sắm và tham gia các hoạt động văn hóa, giáo dục.

Với những hoạt động cụ thể này, Kingbook mong muốn góp phần thúc đẩy phát triển văn hóa đọc tại Việt Nam, nâng cao dân trí, phát triển xã hội.`,
            TamNhin: `
            Kingbook phấn đấu trở thành chuỗi cửa hàng sách hàng đầu tại Việt Nam, là điểm đến tin cậy của mọi đối tượng khách hàng.

Tầm nhìn của Kingbook thể hiện khát vọng trở thành một doanh nghiệp dẫn đầu trong lĩnh vực kinh doanh sách tại Việt Nam. Với tầm nhìn này, Kingbook cam kết mang đến cho khách hàng những trải nghiệm mua sắm sách tốt nhất, đáp ứng mọi nhu cầu của khách hàng, từ học tập, nghiên cứu đến giải trí, thư giãn.

Để đạt được tầm nhìn này, Kingbook cần không ngừng nỗ lực phát triển, mở rộng quy mô kinh doanh, đồng thời nâng cao chất lượng sản phẩm, dịch vụ. Kingbook cũng cần xây dựng một đội ngũ nhân viên chuyên nghiệp, tận tâm, mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời.`,

            danhgia: [
                { MaKH: "KBKH002", sosao: "5", Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: "5", Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: "5", Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: "5", Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: "5", Noidung: "Tốt" },
                { MaKH: "KBKH002", sosao: "5", Noidung: "Tốt" },

            ]
        }
    }
}
</script>
<template>
    <VContainer>
        <VRow>
            <v-tabs v-model="tab" direction="vertical" color="success">
                <v-tab value="option-1">

                    Về chúng tôi
                </v-tab>
                <v-tab value="option-2">

                    Tầm nhìn
                </v-tab>
                <v-tab value="option-3">


                    Sứ mệnh
                </v-tab>
            </v-tabs>
            <VCol cols="10">
                <v-window v-model="tab">
                    <v-window-item value="option-1">
                        <VCard style="background-color: rgba(0, 255, 125, 0.5);; border-radius:10px ;" class="p-4 m-1  ">
                            <div class="row w-100">
                                <div class="col-12 text-start text-white">
                                    <VCardTitle class="text-center h4"> VỀ CHÚNG TÔI</VCardTitle>
                                    <VCardText class="h5"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ GioiThieu }}</VCardText>
                                </div>
                            </div>
                        </VCard>
                    </v-window-item>
                    <v-window-item value="option-2">
                        <VCard style="background-color: rgba(0, 255, 125, 0.5);; border-radius:10px ;"
                            class="p-4 m-1 text-white">

                            <div class=" text-start text-white">
                                <VCardTitle class="text-center h4"> TẦM NHÌN</VCardTitle>

                                <VCardText class="h5"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ TamNhin }}</VCardText>
                            </div>
                        </VCard>
                    </v-window-item>
                    <v-window-item value="option-3">
                        <VCard style="background-color: rgba(0, 255, 125, 0.5);; border-radius:10px ;"
                            class="p-4 m-1 text-white ">

                            <div class=" text-start text-white">
                                <VCardTitle class="text-center h4">SỨ MỆNH</VCardTitle>

                                <VCardText class="h5">
                                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ SuMenh }}
                                </VCardText>
                            </div>
                        </VCard>
                    </v-window-item>
                </v-window>
            </VCol>
        </VRow>
        <!-- Nav tabs -->

    </VContainer>

    <VRow class="mt-2">
        <VCol cols="10 mx-auto">
            <VCard style="background-color: rgba(0, 255, 4, 0.2); border-radius:50px ;">
                <VCardTitle class="text-white text-center h5">CÁC DỊCH VỤ</VCardTitle>
                <VRow>
                    <ListDichVu />
                </VRow>
            </VCard>
        </VCol>
    </VRow>
    <VRow class="bggt">
        <VCol cols="12">
            <VCard style="background-color: rgba(0, 255, 4, 0);">
                <VCardTitle class="text-center">ĐÁNH GIÁ CỬA HÀNG</VCardTitle>
                <div class="row w-100">
                    <div class="col-5"></div>
                    <div class="col-4">
                        <!-- Hiển thị số sao hiện tại -->
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
                    <div class="col-3"></div>
                </div>
                <VRow class="mt-2 text-dark">
                    <VCol cols="2"></VCol>
                    <VCol cols="7">
                        <VTextField label="Nội dung đánh giá" class="bg bg-white" placeholder="Nhập nội dung đánh giá tại đây"></VTextField>
                    </VCol>
                    <VCol cols="1">
                        <v-button class="btn btn-info h-100 w-100"><h4>Gửi</h4></v-button>
                    </VCol>
                </VRow>
            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="8" class="mx-auto">
            <CarcousleDangGia :danhgia="danhgia"/>
        </VCol>
    </VRow>
</template>
<style>
.bggt {
    background-image: url("@/assets/images/bggt.png");
    background-size: cover;
}
</style>