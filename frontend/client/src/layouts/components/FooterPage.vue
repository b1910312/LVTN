<template>
    <VCard>
        <v-row class="p-2 m-5">

            <v-col cols="4 my-auto">
                <img src="../../assets/images/KingBookLogo(Big).png" class="img-fluid w-100" alt="">
                <div class="text-start mt-4 text-white">
                    <div class="table-responsive">
                        <table class="table table-dark">

                            <tbody>
                                <tr class="row w-100 ps-4">
                                    <th class="col-1"><font-awesome-icon :icon="['fas', 'map-location-dot']" /></th>
                                    <td class="col-11">271, Võ Thị Sáu, Quận 3, TP Hồ Chí Minh</td>
                                </tr>
                                <tr class="row w-100 ps-4">
                                    <th class="col-1"><font-awesome-icon :icon="['fas', 'phone']" /></th>
                                    <td class="col-11">0984442145</td>
                                </tr>
                                <tr class="row w-100 ps-4">
                                    <th class="col-1"><font-awesome-icon :icon="['fas', 'envelope']" /></th>
                                    <td class="col-11">kingbook.store@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </v-col>

            <v-col cols="4" class="text-white text-center">
                <h4 class="text-uppercase" style="color:gold">Liên kết</h4>
                <div class="footer-link my-3 ">
                    <button class="footer-btn" @click="this.$router.push('/trangchu')">Trang chủ</button>
                </div>
                <div class="footer-link my-3 ">
                    <button class="footer-btn">Giới thiệu</button>
                </div>
                <div class="footer-link my-3 ">
                    <button class="footer-btn" @click="this.$router.push('/cuahang')">Cửa hàng</button>
                </div>
                <div class="footer-link my-3 ">
                    <button class="footer-btn" @click="this.$router.push('/lienhe')">Liên hệ</button>
                </div>
                <div class="footer-link my-3 ">
                    <button class="footer-btn" @click="this.$router.push('/trochuyen')">Trò chuyện</button>
                </div>

            </v-col>

            <v-col cols="4">
                <h4 class="text-uppercase" style="color:gold">Liên hệ</h4>
                <VCard class="p-2" style="background-color: rgba(65, 65, 65, 0.4);">
                    <VRow>

                        <VCol cols="6">
                            <VTextField class="" label="Email" placeholder="" type="password" />

                        </VCol>
                        <VCol cols="6">
                            <VTextField class="" label="Chủ đề" placeholder="" type="password" />
                        </VCol>
                        <VCol cols="12">
                            <VTextarea rows="2" class="" label="Nội dung" placeholder="" type="password" />
                        </VCol>
                    </VRow>
                    <!-- 👉 Action Buttons -->
                    <div class="row w-100 mt-3">
                        <div class="col-9">
                        </div>

                        <div class=col-3>
                            <VBtn class="bg bg-primary">
                                Gửi
                            </VBtn>
                        </div>
                    </div>
                </VCard>
            </v-col>
        </v-row>

    </VCard>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>

export default {
    name: 'FooterPage',
    data() {
        return {}
    },
    created() {
        this.hide()
    },
    methods: {
        hide() {
            const vInputDetails = document.querySelector(".v-input__details");
            if (vInputDetails) {
                vInputDetails.style.display = "none"; // Ẩn phần tử
            }
        }
    }
}
</script>
<style>
.footer-btn {
    padding: 2px 40px;
    border-radius: 30px;
    color: white;
}

.footer-btn:hover {
    background-color: rgb(0, 255, 4);

}

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
    border-color: var(--bs-table-border-color);
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
    color: white;
}
</style>