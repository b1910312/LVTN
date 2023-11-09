<script>
import ListDichVu from '@/components/ListDichVu.vue';
export default {
    name: "GioiThieu",
    components:{
        ListDichVu
    },
    data() {
        return {
            TenCuaHang: "",
            Logo: "",
            GioiThieu: ` KingBook Store là một hệ thống nhà sách bao gồm 12 cửa
                            hàng phân bố trên địa bàn các tỉnh
                            Đồng
                            bằng sông Cửu
                            Long, chúng tôi cung cấp dịch vụ trong lĩnh vực mua bán sách, KingBook luôn đặt chất lượng
                            lên
                            hàng đầu và
                            sự hài lòng của quý khách là động lực giúp chúng tôi ngày càng phát triển`,
            SuMenh: `KingBook mang sứ mệnh là người vận chuyển, bảo vệ nền tảng tri thức cho người Việt. Chúng tôi luôn mang trên vai trách nhiệm của người mang tri thức đến mọi người qua từng quyển sách`,
            TamNhin: `KingBook đặt cho mình một mục tiêu phát triển mở rộng chuỗi cửa hàng trải rộng toàn quốc, mang đến cho mỗi khách hàng một đơn vị gần nhất, dù bạn có ở đâu thì bạn vẫn có KingBook đồng hành trên từng quyển sách`,
            dichvu: [
                { name: "1231", icon: "12313" }
            ],
            danhgia: [
                { MaKH: "", sosao: "", Noidung: "" }
            ]
        }
    }
}
</script>
<template>
    <VRow>
        <Vcol cols="12">
            <VCard style="background-color: rgba(0, 0, 0, 0.4); border-radius:50px ;" class="p-4 m-3  ">
                <div class="row w-100">
                    <div class="col-4">
                        <img src="https://lephuongdung.com/wp-content/uploads/2022/02/doc-sach.jpg" class="img-fluid" alt=""
                            srcset="">
                    </div>
                    <div class="col-8 text-start mt-3 text-white">
                        <VCardTitle class="text-center h4"> VỀ CHÚNG TÔI</VCardTitle>
                        <VCardText class="h5"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ GioiThieu }}</VCardText>
                    </div>
                </div>
            </VCard>
        </Vcol>

    </VRow>
    <VRow>
        <VCol cols="6">
            <VCard  style="background-color: rgba(0, 0, 0, 0.4); border-radius:50px ;" class="p-4 m-3 text-white">

                <div class=" text-start mt-3 text-white">
                    <VCardTitle class="text-center h4"> TẦM NHÌN</VCardTitle>

                    <VCardText class="h5"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ TamNhin }}</VCardText>
                </div>
            </VCard>
        </VCol>
        <VCol cols="6">
            <VCard  style="background-color: rgba(0, 0, 0, 0.4); border-radius:50px ;" class="p-4 m-3 text-white ">

                <div class=" text-start mt-3 text-white">
                    <VCardTitle class="text-center h4">SỨ MỆNH</VCardTitle>

                   <VCardText class="h5">
                   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ SuMenh }}
                   </VCardText>
                </div>
            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="12">
            <VCard  style="background-color: rgba(0, 0, 0, 0.4); border-radius:50px ;">
                <VCardTitle class="text-white h5">CÁC DỊCH VỤ</VCardTitle>
                <VRow>
                    <ListDichVu/>
                </VRow>
            </VCard>
        </VCol>
    </VRow>
</template>