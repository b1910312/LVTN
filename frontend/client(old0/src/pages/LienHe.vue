<script>
import mapComponent from "../components/mapComponent.vue"
export default {
    name: "LienHe",
    components: {
        mapComponent
    }
}
</script>
<template>
    <VRow>
        <VCol cols="12">
            <VCard style="background-color: rgba(255, 255, 255, 0.3);" class="p-4">
                <VRow>
                    <VCol cols="12">
                        <VCard class="p-4 m-1" style="border-radius: 50px; border: 2px solid black;">
                            <mapComponent></mapComponent>
                        </VCard>
                    </VCol>
                    <VCol cols="6">
                        <VCard title="Thông tin cửa hàng" class="p-5 m-1"
                            style="border-radius: 50px; border: 2px solid black;">
                            <div class="text-start mt-4 text-dark">
                                <div class="table-responsive">
                                    <table class="table text-dark">
                                        <tbody>
                                            <tr class="row w-100 ps-4">
                                                <th class="col-2"><font-awesome-icon :icon="['fas', 'house']" /></th>
                                                <td class="col-10">Cửa hàng phân phối sách KingBook</td>
                                            </tr>
                                            <tr class="row w-100 ps-4">
                                                <th class="col-2">MST</th>
                                                <td class="col-10">0123456789</td>
                                            </tr>
                                            <tr class="row w-100 ps-4">
                                                <th class="col-2"><font-awesome-icon :icon="['fas', 'map-location-dot']" />
                                                </th>
                                                <td class="col-10">271, Võ Thị Sáu, Quận 3, TP Hồ Chí Minh</td>
                                            </tr>
                                            <tr class="row w-100 ps-4">
                                                <th class="col-2">
                                                </th>
                                                <td class="col-10">171, Hoàng Văn Thụ, Quận 1, TP Hồ Chí Minh</td>
                                            </tr>
                                            <tr class="row w-100 ps-4">
                                                <th class="col-2"><font-awesome-icon :icon="['fas', 'phone']" /></th>
                                                <td class="col-10">0984442145</td>
                                            </tr>
                                            <tr class="row w-100 ps-4">
                                                <th class="col-2"><font-awesome-icon :icon="['fas', 'envelope']" /></th>
                                                <td class="col-10">kingbook.store@gmail.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </VCard>
                    </VCol>
                    <VCol cols="6">
                        <VCard title="Liên hệ" class="p-3 m-1"
                            style="border-radius: 50px; border: 2px solid black;">
                            <VForm>
                                <VCardText>
                                    <!-- 👉 Current Password -->

                                    <!-- 👉 New Password -->
                                    <VRow>
                                        <div class="col-12">
                                            <p class="text-center text-success"></p>
                                        </div>
                                        <VCol cols="4">
                                            <VTextField  label="Họ"
                                                placeholder="Họ" type="password" />

                                        </VCol>
                                        <VCol cols="4">
                                            <VTextField  label="Tên"
                                                placeholder="Tên" type="password" />
                                        </VCol>
                                        <VCol cols="4">
                                            <VTextField  label="Email"
                                                placeholder="Email" type="password" />

                                        </VCol>
                                        <VCol cols="12">
                                            <VTextField  label="Chủ đề"
                                                placeholder="Chủ đề" type="password" />
                                        </VCol>
                                        <VCol cols="12">
                                            <VTextarea rows="3" label="Nội dung"
                                                placeholder="Nội dung" type="password" />
                                        </VCol>
                                    </VRow>
                                </VCardText>

                             

                                <!-- 👉 Action Buttons -->
                                <VCardText class="d-flex flex-wrap gap-4">
                                    <div class="row w-100 mb-3">
                                        <div class="col-9">

                                        </div>
                                        <div class=col-3>
                                            <VBtn class="bg bg-primary" >
                                                Tạo mật khẩu
                                            </VBtn>
                                        </div>
                                    </div>
                                </VCardText>
                            </VForm>
                        </VCard>
                    </VCol>
                </VRow>
            </VCard>
        </VCol>
    </VRow>
</template>