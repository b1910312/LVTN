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
            tb: [],
            TLS: [],
            
        }
    },
    components: {
        ListSanPham_Ngang,
        ListSanPham_Doc
    },
    created() {
        this.GetSach()
        this.GetTL()
        
    },
    methods: {
        GetSach() {
            axios.get('http://localhost:3000/api/sach')
                .then((response) => {
                    this.sachs = response.data;
                    console.log(response);
                    console.log(this.sachs);
                    alert(this.sachs.length)
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
        GetTL() {
            axios.get('http://localhost:3000/api/theloai')
                .then((response) => {
                    this.TLS = response.data;
                    console.log(response);
                    console.log(this.TLS);
                    alert(this.TLS.length)
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        },
        layhinh(mang) {
            for (var i = 0; i < mang.length; i++) {
                console.log(mang[i]);
            }
        },
        GetThumNail(S_Ma) {
            const logo = "http://localhost:3000/api/thumbnail/image/TB/" + S_Ma
            // console.log(logo)
            return logo
        },
    }
})
</script>
<template>
    <VRow>
        <ListSanPham_Ngang />
    </VRow>
    <VRow>
        <div class="col-3">
            <VCard class="bg bg-white mt-3">
                <Vrow>
                    <VCol cols="12">
                        <VTextField rows="2" class="bg bg-white " label="Tìm kiếm" placeholder="Tìm sách" />
                    </VCol>
                </Vrow>
            </VCard>
            <VCard class="bg bg-white mt-3">
                <h3 class="mt-2">Danh mục Sách</h3>
                <VBtn class="item" v-for="danhmuc in DanhMuc" :key="danhmuc.name">{{ danhmuc.name }}</VBtn>
            </VCard>
        </div>
        <!-- <div v-for="s in sachs" :key="s.S_Ma"> -->
            <!-- <img  :src="GetThumNail(s.S_Ma)"> -->
            <img  src="http://localhost:3000/api/thumbnail/image/TB/KBS001">
            <img  src="http://localhost:3000/api/thumbnail/image/TB/KBS002">

        <!-- </div> -->
        <VCol cols="9">
            <ListSanPham_Doc :sach="sachs" />
        </VCol>

    </VRow>
</template>