<template>
    <v-row class="px-2 navbar">
        <v-col cols="2 my-auto"><img src="../../src/assets/KingBookLogo(Big).png" class="img-fluid w-100" alt=""></v-col>
        <v-col cols="2">
            <v-text-field label="Tìm kiếm" class="bg bg-white"></v-text-field>
        </v-col>
        <v-col cols="6">
            <div class="row justify-content-center  my-auto">
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100 active" href="#" aria-current="page">Trang chủ</button>
                </div>
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100" href="#">Giới thiệu</button>
                </div>
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100 " href="#">Cửa hàng</button>
                </div>
                <div class=" mx-auto navlink col-3">
                    <button class="button  w-100 " href="#">Liên hệ</button>
                </div>
            </div>
        </v-col>
        <v-col cols="1 me-2">
            <VAvatar class="cursor-pointer" color="primary" variant="tonal">
                <!-- <VImg :src="GetLogo(NV.NV_MaNV)" /> -->
                <VImg src="https://vapa.vn/wp-content/uploads/2022/12/anh-dai-dien-dep-001.jpg" />

                <!-- SECTION Menu -->
                <VMenu activator="parent" width="230" location="bottom end" offset="14px">
                    <VList>
                        <!-- 👉 User Avatar & Name -->
                        <VListItem class="">
                            <template #prepend>
                                <VListItemAction start>
                                    <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                                        <VAvatar color="primary" variant="tonal">
                                            <!-- <VImg :src="GetLogo(NV.NV_MaNV)" /> -->
                                            <VImg src="https://vapa.vn/wp-content/uploads/2022/12/anh-dai-dien-dep-001.jpg" />

                                        </VAvatar>
                                    </VBadge>
                                </VListItemAction>
                            </template>

                            <VListItemTitle class="font-weight-semibold">
                                <!-- {{ NV.NV_HoTen }} -->
                                Nguyễn Thanh Tín
                            </VListItemTitle>
                            <VListItemSubtitle class>
                                <!-- {{ VT.VT_TenVaiTro }} -->
                                Hạng mức: Vàng
                            </VListItemSubtitle>
                        </VListItem>
                        <VDivider class="my-2" />

                        <!-- 👉 Profile -->
                        <VListItem @click="profile()">
                            <template #prepend>
                                <font-awesome-icon class="me-4 p-2" style="font-size: 22;" :icon="['fas', 'circle-user']"></font-awesome-icon>
                            </template>

                            <VListItemTitle>Profile</VListItemTitle>
                        </VListItem>
                        <!-- Divider -->
                        <VDivider class="my-2" />

                        <!-- 👉 Logout -->
                        <VListItem @click="logout()">
                            <template #prepend>
                                
                                <font-awesome-icon class="me-4 p-2" style="font-size: 22;" :icon="['fas', 'door-open']"></font-awesome-icon>
                            </template>
                            <VListItemTitle>Logout</VListItemTitle>
                        </VListItem>
                    </VList>
                </VMenu>
                <!-- !SECTION -->
            </VAvatar>
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
    mounted() {
        this.hide()
    },
    methods: {
        hide() {
            const vInputDetails = document.querySelector(".v-input__details");
            vInputDetails.style.display = "none"; // Ẩn phần tử
        }
    }
}
</script>
<style>
.v-input {
    border-radius: 10px;
}

.navbar {
    background-color: rgba(0, 0, 0, 0.37);
}

.navlink {
    color: gold;
    font-weight: bolder;
    border-radius: 10px;

}

.button {
    padding: 10px 10px;
}

.navlink:hover {
    background-color: rgb(224, 255, 47);
    color: white;
}
</style>