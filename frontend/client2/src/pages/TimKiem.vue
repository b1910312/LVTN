<script>
import moment from 'moment'
import ListSanPham_Doc from '@/components/ListSanPham_Doc.vue'
import axios from 'axios'
export default {
    name: "ThanhToanThanhCong",
    data() {
        return {
            NoiDung: "",
            Sachs: [],
        }
    },
    components: {
        ListSanPham_Doc,
    },
    mounted() {
        this.GetNoiDung()
        this.TimKiem()
    },
    methods: {
        GetNoiDung() {
            this.NoiDung = this.$route.params.noidung
        },
        TimKiem() {
            axios.get(`http://localhost:3000/api/sach/timkiem/` + this.NoiDung)
                .then(res => {
                    this.Sachs = res.data
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
<template style="">
    <VCard>
        <VRow class="my-1">
            <VCol cols="3">
                <VCardTitle>KẾT QUẢ TÌM KIẾM</VCardTitle>
            </VCol>
            <VCol cols="8">
                <VRow>
                    <VCol cols="10">
                        <VTextField v-model="NoiDung" @change="TimKiem"></VTextField>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VCard>
    <VCard class="mt-2">
            <ListSanPham_Doc v-if="Sachs != ''" :sach="Sachs"></ListSanPham_Doc>
             <VRow v-if="Sachs == ''">
                <VCol cols="12">
                    <h1 class="text-center">Không có kết quả phù hợp</h1>
                </VCol>
             </VRow>
    </VCard>
</template>
<style>
.table-dark {
    --bs-table-color: #fff;
    --bs-table-bg: rbga(0, 0, 0, 0);
    --bs-table-border-color: #4d5154;
    --bs-table-striped-bg: #2c3034;
    --bs-table-striped-color: #fff;
    --bs-table-active-bg: #373b3e;
    --bs-table-active-color: #fff;
    --bs-table-hover-bg: #323539;
    --bs-table-hover-color: #fff;
    color: var(--bs-table-color);
    border-color: rgba(0, 0, 0, 0);
}
</style>