<template>
    <v-row class="px-2 ">
        <v-col cols="2 my-auto"><img src="../../assets/images/KingBookLogo(Big).png" class="img-fluid w-100" alt="" @click="this.$router.push(`/trangchu`)"></v-col>
        <v-col cols="3">
            <v-text-field label="Tìm kiếm" class=""></v-text-field>
        </v-col>
        <v-col cols="7">
            <div class="row justify-content-center  my-auto">
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100 active" aria-current="page" @click="this.$router.push('/trangchu')">Trang
                        chủ</button>
                </div>
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100" @click="this.$router.push('/gioithieu')">Giới thiệu</button>
                </div>
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100 " @click="this.$router.push('/cuahang')">Cửa hàng</button>
                </div>
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100 " @click="this.$router.push('/lienhe')">Liên hệ</button>
                </div>
            </div>
        </v-col>

    </v-row>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>


export default {
    name: 'NavBar1',
    data() {
        return {}
    },
   
}
</script>
<style>

.navbar {
    background-color: rgba(0, 0, 0, 0.37);
}

.navlink {
    color: rgb(0, 255, 0);

    font-weight: bolder;
    border-radius: 10px;

}

.button {
    padding: 10px 10px;
}

.navlink:hover {
    background-color: rgb(0, 255, 4);
    color: white;
}
</style>