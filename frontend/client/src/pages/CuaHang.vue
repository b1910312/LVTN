<script>
import ListSanPham_Ngang from '@/components/ListSanPham_Ngang.vue';
import ListSanPham_Doc from '@/components/ListSanPham_Doc.vue';

export default {
    name: "CuaHang",
    data() {
        return {
            DanhMuc: [
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
                { name: " Sách giáo khoa", Value: "1" },
            ]
        }
    },
    components: {
        ListSanPham_Ngang,
        ListSanPham_Doc
    }
}
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
                        <VTextField rows="2" class="bg bg-white " label="Tìm kiếm" placeholder="Tìm sách"  />
                    </VCol>
                </Vrow>
            </VCard>
            <VCard class="bg bg-white mt-3">
                <h3 class="mt-2">Danh mục Sách</h3>
                <VBtn class="item" v-for="danhmuc in DanhMuc" :key="danhmuc.name">{{ danhmuc.name }}</VBtn>
            </VCard>
        </div>
        <VCol cols="9">
            <ListSanPham_Doc />
        </VCol>

    </VRow>
</template>