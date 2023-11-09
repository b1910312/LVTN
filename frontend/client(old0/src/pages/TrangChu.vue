<script>
import CarcousleBanner from '../components/CarcousleBanner.vue'
import LoginSmall from '../components/LoginSmall.vue'
import ListSanPham_Ngang from '../components/ListSanPham_Ngang.vue'

export default {
    name: "TrangChu",
    components: {
        CarcousleBanner,
        LoginSmall,
        ListSanPham_Ngang
    },
    data() {
        return {}
    }
}
</script>
<template>
    <v-row class="mt-3">
        <v-col cols="8" class="mx-auto">
            <CarcousleBanner />
        </v-col>
        <v-col cols="4" class="mx-auto">
            <LoginSmall />
        </v-col>
    </v-row>
    <v-row class="mt-3">
        <ListSanPham_Ngang />
    </v-row>
    <v-row class="mt-3">
        <CarcousleBanner />
    </v-row>
    <v-row class="mt-3">
        <ListSanPham_Ngang />
    </v-row>
</template>