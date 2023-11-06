<template>
    <v-row class="px-2 navbar">
        <v-col cols="4 my-auto">
            <img src="../../src/assets/KingBookLogo(Big).png" class="img-fluid w-100" alt="">
            <div class="text-start mt-4 text-white">
                <div class="table-responsive">
                    <table class="table text-white">

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

        <v-col cols="3" class="text-white">
            <h4 class="text-uppercase" style="color:gold">Liên kết</h4>
            <div class="footer-link my-3 ">
                <button class="footer-btn">Trang chủ</button>
            </div>
            <div class="footer-link my-3 ">
                <button class="footer-btn">Giới thiệu</button>
            </div>
            <div class="footer-link my-3 ">
                <button class="footer-btn">Cửa hàng</button>
            </div>
            <div class="footer-link my-3 ">
                <button class="footer-btn">Liên hệ</button>
            </div>
            <div class="footer-link my-3 ">
                <button class="footer-btn">Trò chuyện</button>
            </div>

        </v-col>

        <v-col cols="4">
            <h4 class="text-uppercase" style="color:gold">Liên hệ</h4>

            <VCard class="p-2" style="background-color: rgba(255,255,255,0.4);">
                <VRow>

                    <VCol cols="6">
                        <VTextField class="bg bg-white" label="Email" placeholder="" type="password" />

                    </VCol>
                    <VCol cols="6">
                        <VTextField class="bg bg-white" label="Chủ đề" placeholder="" type="password" />
                    </VCol>
                    <VCol cols="12">
                        <VTextarea rows="2" class="bg bg-white" label="Nội dung" placeholder="" type="password" />
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
    background-color: gold;

}
.v-input__details{
     display: none;
}
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