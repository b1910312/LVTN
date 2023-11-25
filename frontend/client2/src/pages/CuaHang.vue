<script>
import ListSanPham_Doc from '@/components/ListSanPham_Doc.vue';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CuaHang",
    data() {
        return {
            sachs: [],
            BestSale: [],
            TLs: {},
            FitlerSachs: "",
            DanhMucSelect: "",
            GiaTu: 0,
            GiaDen: 1000000
        }
    },
    computed: {
        filteredSachs() {
            return this.sachs.filter((item) => {
                return (
                    (item.S_Ma.toLowerCase().includes(this.FitlerSachs.toLowerCase()) ||
                        item.S_Ten.toLowerCase().includes(this.FitlerSachs.toLowerCase()) ||
                        item.S_TacGia.toLowerCase().includes(this.FitlerSachs.toLowerCase())) &&
                    (this.DanhMucSelect === "" || item.S_TheLoai === this.DanhMucSelect) &&
                    // Thêm điều kiện lọc theo giá
                    (this.GiaTu === 0 || item.S_Gia >= this.GiaTu) &&
                    (this.GiaDen === 1000000 || item.S_Gia <= this.GiaDen)
                );
            });
        },
    },
    components: {
        ListSanPham_Doc
    },
    created() {
        this.GetSach()
        this.GetTL()
        this.GetSachBS()
    },
    methods: {
        GetSachBS() {
            axios.get('http://localhost:3000/api/sach/BestSale')
                .then((response) => {
                    this.BestSale = response.data;
                    console.log("1231");
                    console.log(this.BestSale);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
        GetSach() {
            axios.get('http://localhost:3000/api/sach')
                .then((response) => {
                    this.sachs = response.data;
                    console.log(response);
                    console.log(this.sachs);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
        GanTL() {
            this.DanhMuc = this.TLs;
        },
        GetTL() {
            axios.get('http://localhost:3000/api/theloai')
                .then((response) => {
                    this.TLs = response.data;
                    console.log(response);
                    console.log(this.TLs);

                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
        LamTron(number, decimals) {
            let precision = 10 ** decimals;
            return Math.round(number * precision) / precision;
        },

    }
})
</script>
<template>
    <VRow>
        <div class="col-3">
            <VCard class=" mt-1 text-white text-center">
                <VCard>
                    <h5 class="mt-2 p-2" style="background-color: rgba(0, 255, 4,0.6); border-radius: 10px;">Tìm kiếm</h5>
                </VCard>
                <VTextField v-model.trim="FitlerSachs" placeholder="Nhập tên sách dể tìm kiếm"></VTextField>
            </VCard>
            <VCard class=" mt-1 text-white text-center">
                <VCard>
                    <h5 class="mt-2 p-2" style="background-color: rgba(0, 255, 4,0.6); border-radius: 10px;">Tìm kiếm theo giá
                    </h5>
                </VCard>
                <VRow class="mt-2">
                    <VCol cols="2">
                        <h6 class="text-white">Giá thấp nhất</h6>
                    </VCol>
                    <VCol cols="7">
                        <v-slider color="success" max="1000000" v-model="GiaTu"></v-slider>
                    </VCol>
                    <Vcol cols="2" class="my-auto">
                        <h6>{{ LamTron(GiaTu, 0) }} VNĐ</h6>
                    </Vcol>
                    <VCol cols="2">
                        <h6 class="text-white">Giá cao nhất</h6>
                    </VCol>
                    <VCol cols="7">
                        <v-slider color="success" max="1000000" v-model="GiaDen"></v-slider>
                    </VCol>
                    <Vcol cols="2" class="my-auto">
                        <h6>{{ LamTron(GiaDen, 0) }} VNĐ</h6>
                    </Vcol>
                </VRow>
            </VCard>
            <VCard class=" mt-1 text-white text-center">
                <VCard>
                    <h5 class="mt-2 p-2" style="background-color: rgba(0, 255, 4,0.6); border-radius: 10px;">Danh mục Sách</h5>
                </VCard>
                <v-button class="item text-start w-100 btn navlink" @click="DanhMucSelect = ''">Tất cả</v-button>
                <v-button class="item text-start w-100 btn navlink" v-for="danhmuc in TLs" @click="DanhMucSelect = danhmuc.TL_Ma"
                    :key="danhmuc.TL_Ma">{{ danhmuc.TL_Ten
                    }}</v-button>
            </VCard>

        </div>
        <!-- </div> -->
        <VCol cols="9">
            <v-row>
                <v-col cols="12">

                    <v-card class="" style="border-radius: 10px; font-weight: bolder; color: rgba(0, 255, 4, 0.8); ">
                        <h2 class="mt-2 ms-4 text-center ">Danh sách sản phẩm</h2>
                    </v-card>
                    <v-card class="mx-auto text-center py-12 mt-2" v-if="filteredSachs == ''">
                        <h3> không có sản phẩm phù hợp</h3>
                    </v-card>
                </v-col>
            </v-row>
                <ListSanPham_Doc :sach="filteredSachs" />

        </VCol>

    </VRow>
</template>