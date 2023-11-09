<script>
import CarcousleBanner from "@/components/CarcousleBanner.vue"
import LoginSmall from "@/components/LoginSmall.vue"
import ListSanPham_Ngang from "@/components/ListSanPham_Ngang.vue"

export default {
    name: "TrangChu",
    components: {
        CarcousleBanner,
        LoginSmall,
        ListSanPham_Ngang
    },
    data() {
        return {
            BestSale: [],
            News: [],
            Banner: []
        }
    },
    created() {
        this.GetSachBS()
        this.GetSachNew()
        this.GetBanner()
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
        GetBanner() {
            axios.get('http://localhost:3000/api/banner')
                .then((response) => {
                    this.Banner = response.data;
                    console.log("banner");
                    console.log(this.Banner);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
        GetSachNew() {
            axios.get('http://localhost:3000/api/sach/New')
                .then((response) => {
                    this.News = response.data;
                    console.log("1231");
                    console.log(this.News);
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
    }
}
</script>
<template>
    <v-row class="mt-3">
        <v-col cols="8" class="mx-auto">
            <CarcousleBanner :img="Banner" />
        </v-col>
        <v-col cols="4" class="mx-auto">
            <LoginSmall />
        </v-col>
    </v-row>
    <v-row class="mt-3">
        <div class="w-100 card p-1 m-2" style="background-color: rgba(255, 255, 255, 0.05  );">

            <v-row>
                <v-col cols="3">
                    <v-card class=" text-center"
                        style="border-radius: 30px; font-weight: bold; background-color: rgb(0, 255, 0)">
                        <h5 class="mt-2 text-white"><b>Sản phẩm nổi bật</b></h5>
                    </v-card>
                </v-col>
                <v-col cols="9"></v-col>

            </v-row>
            <ListSanPham_Ngang :sach="BestSale" />

        </div>
    </v-row>
    <v-row class="mt-3">
        <CarcousleBanner :img="Banner" />
    </v-row>
    <v-row class="mt-3">
        <div class="w-100 card p-1 m-2" style="background-color: rgba(255, 255, 255, 0.05  );">

            <v-row>
                <v-col cols="3">
                    <v-card class=" text-center"
                        style="border-radius: 30px; font-weight: bold; background-color: rgb(0, 255, 0)">
                        <h5 class="mt-2 text-white"><b>Sản phẩm mới</b></h5>
                    </v-card>
                </v-col>
                <v-col cols="9"></v-col>

            </v-row>
            <ListSanPham_Ngang :sach="News" />
        </div>
    </v-row>
</template>