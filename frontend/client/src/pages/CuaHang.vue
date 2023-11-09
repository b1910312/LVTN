<script>
import ListSanPham_Ngang from '@/components/ListSanPham_Ngang.vue';
import ListSanPham_Doc from '@/components/ListSanPham_Doc.vue';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CuaHang",
    data() {
        return {
            DanhMuc: [
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
            ],
            sachs: [],
            BestSale: [],
            TLs: {},

        }
    },
    components: {
        ListSanPham_Ngang,
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


    }
})
</script>
<template>
    <VRow>
        <VCol cols="12">
            <VCard class="mt-3 text-white  text-center" style="background-color: rgb(0, 255, 4);">
                <h3 class="mt-2">BestSaler</h3>
            </VCard>
            <VCard>
                <ListSanPham_Ngang :sach="BestSale" />
            </VCard>
        </VCol>
    </VRow>
    <VRow>
        <div  class="col-3">
            <VCard class=" mt-1 text-white text-center" >
                <VCard>
                    <h3 class="mt-2 p-2" style="background-color: rgb(0, 255, 4); border-radius: 10px;"  >Danh mục Sách</h3>
                </VCard>
                <v-button class="item w-100 btn navlink" v-for="danhmuc in TLs" :key="danhmuc.TL_Ma">{{ danhmuc.TL_Ten }}</v-button>
            </VCard>
        </div>
        <!-- </div> -->
        <VCol cols="9">
            <v-row>
                <v-col cols="12">
                    <v-card class="" style="border-radius: 10px; font-weight: bolder; background-color: rgb(0, 255, 4); ">
                        <h2 class="mt-2 ms-4 text-center text-white" >Danh sách sản phẩm</h2>
                    </v-card>

                </v-col>
            </v-row>
            <ListSanPham_Doc :sach="sachs" />
        </VCol>

    </VRow>
</template>