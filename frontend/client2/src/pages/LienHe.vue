<script>
import mapComponent from "../components/mapComponent.vue"
import moment from "moment"
export default {
    name: "LienHe",
    data() {
        return {
            message: "",
            LastID: "",
            NewID: "",
            Chu: "",
            So: "",
            lienhe: {
                LH_Ma: "",
                LH_Ho: "",
                LH_Ten: "",
                LH_Email: "",
                LH_ChuDe: "",
                LH_NoiDung: "",
                LH_NgayTao: ""
            },
            errors: {
                LH_Ho: "",
                LH_Ten: "",
                LH_Email: "",
                LH_ChuDe: "",
                LH_NoiDung: ""
            },
        }
    },
    components: {
        mapComponent
    },
    mounted(){
        this.GetLastID()
    },
    methods: {
        GetLastID() {
            axios.get(`http://localhost:3000/api/lienhe/getid/getlastlhma`).then(res => {
                this.LastID = res.data
                this.TachKBS()
                this.Increase()
                this.lienhe.LH_Ma = this.NewID
                console.log( this.lienhe.LH_Ma)
            })
        },
        Increase() {
            // Chuyển đổi chuỗi thành số nguyên
            let SoNguyen = parseInt(this.So);

            // Tăng giá trị của số nguyên
            SoNguyen += 1;

            // Chuyển đổi số nguyên thành chuỗi
            this.So = String(SoNguyen).padStart(3, "0");
            this.NewID = this.Chu + this.So;
            console.log(this.NewID)
        },
        TachKBS() {
            let [Text1, result1] = this.LastID.split("0");
            let [Text, result] = this.LastID.split("H");
            this.So = result;
            console.log(result);
            this.Chu = Text1;
            console.log(Text1);
        },
        addLH() {
            const now = moment();
            this.lienhe.LH_NgayTao = now.format("DD-MM-YYYY");
            // Gọi API thêm dữ liệu
            axios.post('http://localhost:3000/api/lienhe', this.lienhe)
                .then((response) => {
                    // Nếu API trả về thành công
                    if (response.status === 200) {
                        // Thông báo thành công
                        this.message = "Gửi liên hệ thành công, vui lòng chờ phản hồi từ email"
                        this.lienhe = ""
                    }
                })
                .catch((error) => {
                    // Nếu API trả về lỗi
                    console.log(error)
                })

        },
        validateInput() {
            this.errors.LH_Ho = "";
            this.errors.LH_Ten = "";
            this.errors.LH_Email = "";
            this.errors.LH_ChuDe = "";
            this.errors.LH_NoiDung = "";

            const requiredFields = ["LH_Ho", "LH_Ten", "LH_Email", "LH_ChuDe", "LH_NoiDung"];

            for (const field of requiredFields) {
                if (!this.lienhe[field].trim()) {
                    switch (field) {
                        case "LH_Ho":
                            this.errors.LH_Ho = "Vui lòng nhập họ";
                            break;
                        case "LH_Ten":
                            this.errors.LH_Ten = "Vui lòng nhập tên";
                            break;
                        case "LH_Email":
                            this.errors.LH_Email = "Vui lòng nhập email";
                            break;
                        case "LH_ChuDe":
                            this.errors.LH_ChuDe = "Vui lòng nhập chủ đề";
                            break;
                        case "LH_NoiDung":
                            this.errors.LH_NoiDung = "Vui lòng nhập nội dung";
                            break
                    }
                }
            }

            if (this.lienhe.LH_Email.trim()) {
                if (!/^\S+@\S+\.\S+$/.test(this.lienhe.LH_Email)) {
                    this.errors.LH_Email = "Email không hợp lệ";
                }
            }

            return !Object.values(this.errors).some((error) => error);
        },
        submitForm() {
            if (!this.validateInput()) {
               return;
            }
            else{
                this.addLH()
                
            }
            // Submit the form here
        },
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
                                    <table class="table table-dark text-white">
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
                        <VCard title="Liên hệ" class="p-3 m-1" style="border-radius: 50px; border: 2px solid black;">
                            <VForm>
                                <VCardText>
                                    <!-- 👉 Current Password -->

                                    <!-- 👉 New Password -->
                                    <VRow>
                                        <div class="col-12">
                                            <p class="text-center text-success">{{ message }}</p>
                                        </div>
                                        <VCol cols="4">
                                            <VTextField :ref="'LH_Ho'" v-model="lienhe.LH_Ho" label="Họ" placeholder="Họ"
                                                type="text" :error-messages="errors.LH_Ho" />

                                        </VCol>
                                        <VCol cols="4">
                                            <VTextField :ref="'LH_Ten'" v-model="lienhe.LH_Ten" label="Tên"
                                                placeholder="Tên" type="text" :error-messages="errors.LH_Ten" />
                                        </VCol>
                                        <VCol cols="4">
                                            <VTextField :ref="'LH_Email'" v-model="lienhe.LH_Email" label="Email"
                                                placeholder="Email" type="email" :error-messages="errors.LH_Email" />

                                        </VCol>
                                        <VCol cols="12">
                                            <VTextField :ref="'LH_ChuDe'" v-model="lienhe.LH_ChuDe" label="Chủ đề"
                                                placeholder="Chủ đề" type="text" :error-messages="errors.LH_ChuDe" />
                                        </VCol>
                                        <VCol cols="12">
                                            <VTextarea :ref="'LH_NoiDung'" v-model="lienhe.LH_NoiDung" label="Nội dung"
                                                placeholder="Nội dung" rows="3" :error-messages="errors.LH_NoiDung" />
                                        </VCol>
                                    </VRow>
                                </VCardText>



                                <!-- 👉 Action Buttons -->
                                <VCardText class="d-flex flex-wrap gap-4">
                                    <div class="row w-100 mb-3">
                                        <div class="col-10">

                                        </div>
                                        <div class=col-2>
                                            <VBtn class="bg bg-primary" @click="submitForm()">
                                                Gửi
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
    border-color: var(--bs-table-border-color);
}
</style>