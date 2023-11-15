<script>
import moment from 'moment'
export default {
    name: "ThanhToanThanhCong",
    data() {
        return {
            MaDH: "",
            VNPayData: {
                amount: 0,
                bankCode: "",
                orderDescription: "Đơn hàng",
                orderType: "Mua hàng",
                language: "vn",
                TxnRef: "",
            },
        }
    },
    mounted() {
        this.GetValue()
        this.CapNhatThanhToan()
    },
    methods: {
        CapNhatThanhToan(){
            if (this.$route.query.vnp_TransactionStatus == '00'){
                this.CapNhatTrangThai()
            }
        },
        CapNhatTrangThai() {
            const now = moment();
            let data = {
                DH_NgayCapNhat: now.format("DD-MM-YYYY"),
                DH_TrangThai: 2
            }
            // Gọi API để cập nhật sản phẩm
            axios.put("http://localhost:3000/api/donhang/capnhattrangthai/" + this.MaDH[0], data).then(response => {
                // Nếu cập nhật thành công, thì hiển thị thông báo
                console.log(data)
                // Sau đó, chuyển hướng người dùng về trang danh sách sản phẩm
            }).catch(error => {
                alert(error);
            });

        },
        createPaymentUrl() {
            this.VNPayData.amount = this.$route.query.vnp_Amount / 100
            this.VNPayData.orderDescription = "Thanh toán đơn hàng" + this.$route.query.id
            this.VNPayData.orderType = "Thanh toán đơn hàng"
            this.VNPayData.TxnRef = this.MaDH[0]

            axios.post(`http://localhost:3000/api/donhang/thanhtoanVNPay`, this.VNPayData).then(res => {
                window.open(res.data)
            })
        },
        GetValue() {
            this.MaDH = this.$route.query.vnp_TxnRef.split('_')
        }
    }
}
</script>
<template>
    <VContainer class="my-2">
        <VCard class="p-3">
            <VCardTitle class="mb-5">THÔNG TIN THANH TOÁN ĐƠN HÀNG: <i class="text-success">#{{ MaDH[0] }}</i></VCardTitle>
            <VCardTitle class="text-center my-5" v-if="this.$route.query.vnp_TransactionStatus == '00'">
                <p class="text-success mb-5" style="font-size: 100px;"><font-awesome-icon :icon="['fas', 'circle-check']" />
                </p>
                THANH TOÁN THÀNH CÔNG
            </VCardTitle>
            <VCardTitle class="text-center my-5" v-if="this.$route.query.vnp_TransactionStatus !== '00'">
                <p class="text-danger mb-5" style="font-size: 100px;"><font-awesome-icon
                        :icon="['fas', 'circle-exclamation']" />
                </p>
                THANH TOÁN KHÔNG THÀNH CÔNG
            </VCardTitle>
            <VCard class="m-5" style="background-color: rgba(0, 0, 0, 0.2);">
                <VCardText class="text-center">
                    <h5>THÔNG TIN THANH TOÁN</h5>
                </VCardText>
                <VRow>
                    <VCol cols="1"></VCol>
                    <VCol cols="10">
                        <div class="table-responsive p-3">
                            <table class="table table-dark">

                                <tbody>
                                    <tr class="row w-100">
                                        <th class="col-3 ms-4 text-end">Mã dơn hàng</th>
                                        <td class="col-8">{{ MaDH[0] }}</td>
                                    </tr>
                                    <tr class="row w-100">
                                        <th class="col-3 ms-4 text-end">Giá trị đơn hàng</th>
                                        <td class="col-8">{{ this.$route.query.vnp_Amount / 100 }} VNĐ</td>
                                    </tr>
                                    <tr class="row w-100">
                                        <th class="col-3 ms-4 text-end">Ngân hàng thanh toán</th>
                                        <td class="col-8">{{ this.$route.query.vnp_BankCode }}</td>
                                    </tr>
                                    <tr class="row w-100" v-if="this.$route.query.vnp_TransactionStatus == '00'">
                                        <th class="col-3 ms-4 text-end">Trạng thái thanh toán</th>
                                        <td class="col-8 text-success">Thanh toán thành công</td>
                                    </tr>
                                    <tr class="row w-100" v-if="this.$route.query.vnp_TransactionStatus !== '00'">
                                        <th class="col-3 ms-4 text-end">Trạng thái thanh toán</th>
                                        <td class="col-8 text-danger">Thanh toán không thành công</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </VCol>
                </VRow>
            </VCard>
            <VRow v-if="this.$route.query.vnp_TransactionStatus == '00'">
                <VCol cols="2"></VCol>
                <VCol cols="4">
                    <v-button class="btn w-100 btn-primary" @click="this.$router.push(`/cuahang`)">Tiếp tục mua
                        sắm</v-button>
                </VCol>
                <VCol cols="4">
                    <v-button class="btn w-100 btn-secondary" @click="this.$router.push(`/trangchu`)">Trờ về trang
                        chủ</v-button>
                </VCol>
                <VCol cols="2"></VCol>

            </VRow>
            <VRow v-if="this.$route.query.vnp_TransactionStatus !== '00'">
                <VCol cols="2"></VCol>
                <VCol cols="8">
                    <v-button class="btn w-100 btn-success" @click="createPaymentUrl()">Thanh toán lại</v-button>
                </VCol>

                <VCol cols="2"></VCol>

            </VRow>
        </VCard>
    </VContainer>
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