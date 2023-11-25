<script setup>
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'

// 👉 Images
import chart from '@images/cards/chart-success.png'
import wallet from '@images/cards/wallet-info.png'
import axios from 'axios'
import moment from 'moment'
</script>

<script>
export default {
  components: {
    AnalyticsFinanceTabs,
  },
  data() {
    return {
      SachDaBan: [],
      SachSauKhiLoc: [],
      TongDoanhSo: 0,
      SoLuongBanRa: 0,
      SachNhapKho: 0,
      LoiNhuan: 0,
      TongGiaNhapKho: 0,

      CurrentSachDaBan: [],
      CurrentSachSauKhiLoc: [],
      CurrentSachSauKhiLoc: [],
      CurrentSachDaBan: [],
      CurrentTongDoanhSo: 0,
      CurrentSoLuongBanRa: 0,
      CurrentSachNhapKho: [],
      CurrentLoiNhuan: 0,
      CurrentTongGiaNhapKho: 0,

      LastMonthSachDaBan: [],
      LastMonthSachSauKhiLoc: [],
      LastMonthSachSauKhiLoc: [],
      LastMonthSachDaBan: [],
      LastMonthTongDoanhSo: 0,
      LastMonthSoLuongBanRa: 0,
      LastMonthSachNhapKho: 0,
      LastMonthLoiNhuan: 0,
      LastMonthTongGiaNhapKho: 0,

      GIANK: 0,

      DGCHs: [],
      DGCH_TichCuc: 0,
      DGCH_TieuCuc: 0,
      DGCH_1_sao: 0,
      DGCH_2_sao: 0,
      DGCH_3_sao: 0,
      DGCH_4_sao: 0,
      DGCH_5_sao: 0,


      GiaNK: 0,
      SoSPBan: 0,
      ThanhTienNhapKho: 0,

      filteredOrders: [], // Dữ liệu sau khi lọc theo tháng
      CurrentfilteredOrders: [], // Dữ liệu sau khi lọc theo tháng
      LastMonth: "",
      selectedMonth: "", // Tháng bạn muốn lọc

      monthlyData: {},
      DoanhSothis: [0,0,0,0,0,0,0,0,0,0,0,0,0],
      LoiNhuanthis: [0,0,0,0,0,0,0,0,0,0,0,0,0],
      SoLuongthis: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      NhapKhothis: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

      SachGanHet: [],

    }
  },
  mounted() {
    this.GetThangHienTai()
    this.sachdaban()
    this.GetDGCH()
    this.GetSapBanHet()
  },

  methods: {
    GetSapBanHet() {
      axios.get(`http://localhost:3000/api/sach/sapbanhet`)
        .then(res => {
          this.SachGanHet = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    GetDGCH() {
      axios.get(`http://localhost:3000/api/danhgiacuahang`)
        .then(res => {
          this.DGCHs = res.data
          for (let i = 0; i <= this.DGCHs.length; i++) {
            if (this.DGCHs[i].DG_SoSao == 1) {
              this.DGCH_1_sao += 1
              console.log("Dang gia 1")
              console.log(this.DGCH_1_sao)

            }
            if (this.DGCHs[i].DG_SoSao == 2) {
              this.DGCH_2_sao += 1
              console.log("Dang gia 2")
              console.log(this.DGCH_2_sao)

            }
            if (this.DGCHs[i].DG_SoSao == 3) {
              this.DGCH_3_sao += 1
              console.log("Dang gia 3")
              console.log(this.DGCH_3_sao)

            }
            if (this.DGCHs[i].DG_SoSao == 4) {
              this.DGCH_4_sao += 1
              console.log("Dang gia 4")
              console.log(this.DGCH_4_sao)

            }
            if (this.DGCHs[i].DG_SoSao == 5) {
              this.DGCH_5_sao += 1
              console.log("Dang gia 5")
              console.log(this.DGCH_5_sao)

            }
            axios.post(`http://localhost:5000/predict`, { comment: this.DGCHs[i].DG_NoiDung })
              .then(res => {
                if (res.data == 0) {
                  console.log("PhanTichDanhGia")
                  console.log(res.data)
                  this.DGCH_TichCuc += 1;
                  console.log("PhanTichDanhGiaTichCuc")
                  console.log(this.DGCH_TichCuc)

                }

                else {
                  console.log("PhanTichDanhGia")
                  console.log(res.data)
                  this.DGCH_TieuCuc += 1;
                }
              })
              .catch(err => {
                console.log("PhanTichDanhGia")
                console.log(err)
              })


          }
          console.log("Lấy thành công đánh giá cửa hàng")
        })
        .catch(err => {
          console.log(err)
        })
    },
    LamTron(number, decimals) {
      let precision = 10 ** decimals;
      return Math.round(number * precision) / precision;
    },
    GetThangHienTai() {
      const now = moment();
      this.LastMonth = now.month();
      this.selectedMonth = Number(this.LastMonth) + 1;
      console.log("Thang " + this.selectedMonth)
    },
    // filterOrdersByMonth(month) {
    //   // Sử dụng JavaScript để lọc dữ liệu theo tháng
    //   // this.filteredOrders = this.SachDaBan.filter((order) => Date(order.CTDH_NgayTao).getMonth()  === Number(this.selectedMonth));
    //   this.SachSauKhiLoc = this.SachDaBan.filter((order) => Number(order.CTDH_NgayTao.split("-")[1]) === month);
    //   console.log("Mang 1")
    //   console.log(this.SachSauKhiLoc)
    //   this.CurrentTongDoanhSo =  this.CongTien(this.SachSauKhiLoc);
    //   this.SLDaBan(this.SachSauKhiLoc);
    //   // this.SLSPBan(this.SachDaBan)
    //   this.GetSachNhapKHo()

    // },
    filterOrdersByMonth(month) {
      this.SachSauKhiLoc = this.SachDaBan.filter((order) => Number(order.CTDH_NgayTao.split("-")[1]) === Number(month));
      this.CurrentTongDoanhSo = this.CongTien(this.SachSauKhiLoc);
      this.SLDaBan(this.SachSauKhiLoc);

      // Thêm các tính toán khác ở đây nếu cần
    },
    calculateDataFor12Months() {
      for (let month = 1; month <= 12; month++) {
        const monthDataKey = `${month}`;
        this.monthlyData[monthDataKey] = {};
        this.DoanhSothis[0] = 0
        this.filterOrdersByMonth(month);

        this.monthlyData[monthDataKey].SachSauKhiLoc = this.SachSauKhiLoc;
        this.DoanhSothis[monthDataKey] = this.CurrentTongDoanhSo;
        this.SoLuongthis[monthDataKey] = this.CurrentSoLuongBanRa;
        // alert(this.GiaNK)
        this.GetSachNhapKHo(month, this.CurrentTongDoanhSo);


        // Thêm các tính toán khác ở đây nếu cần
      }
    },
    // filterOrdersCurrentMonth() {
    //   // Sử dụng JavaScript để lọc dữ liệu theo tháng
    //   // this.filteredOrders = this.SachDaBan.filter((order) => Date(order.CTDH_NgayTao).getMonth()  === Number(this.selectedMonth));
    //   this.CurrentSachSauKhiLoc = this.SachDaBan.filter((order) => Number(order.CTDH_NgayTao.split("-")[1]) === this.selectedMonth);
    //   console.log("Mang 1")
    //   console.log(this.CurrentSachSauKhiLoc)
    //   this.CurrentTongDoanhSo =  this.CongTien(this.CurrentSachSauKhiLoc);
    //   this.SLDaBan(this.CurrentSachSauKhiLoc);
    //   // this.SLSPBan(this.SachDaBan)
    //   this.GetSachNhapKHo(this.CurrentSachSauKhiLoc)

    // },
    // filterOrdersLastMonth() {
    //   // Sử dụng JavaScript để lọc dữ liệu theo tháng
    //   // this.filteredOrders = this.SachDaBan.filter((order) => Date(order.CTDH_NgayTao).getMonth()  === Number(this.selectedMonth));
    //   this.LastMonthSachSauKhiLoc = this.SachDaBan.filter((order) => Number(order.CTDH_NgayTao.split("-")[1]) === this.LastMonth);
    //   console.log("Mang 2")
    //   console.log(this.LastMonthSachSauKhiLoc)
    //   this.LastMonthTongDoanhSo =  this.CongTien(this.LastMonthSachSauKhiLoc);
    //   console.log("Mang 3")
    //   console.log(this.LastMonthTongDoanhSo)
    //   this.LastSLDaBan(this.LastMonthSachSauKhiLoc);
    //   console.log("Mang 3")
    //   console.log(this.LastMonthSoLuongBanRa)
    //   // this.SLSPBan(this.SachDaBan)
    //   this.LastMonthGetSachNhapKHo(this.LastMonthSachSauKhiLoc)

    // },
    TinhLoiNhuan(DoanhSo, NhapKho) {
      return (DoanhSo * 0.9) - NhapKho
    },
    GetSachNhapKHo(month, DoanhSo) {
      const monthDataKey = `${month}`;
      let currentTongGiaNhapKho = 0;
      // Thực hiện yêu cầu API cho từng mã sản phẩm trong mảng
      this.SachSauKhiLoc.forEach((CTDH) => {
        axios.get('http://localhost:3000/api/sach/nhapkho/' + CTDH.CTDH_MaSach)
          .then((response) => {
            this.CurrentSachNhapKho = response.data;
            const NK_Gia = this.TBGiaNhapKho(this.CurrentSachNhapKho);
            const SoSPBan = this.SLSPBan(CTDH.CTDH_MaSach);
            const ThanhTienNhapKho = NK_Gia * SoSPBan;
            console.log("Thanh tien sp nhap kho " + ThanhTienNhapKho);
            currentTongGiaNhapKho += ThanhTienNhapKho;
            console.log("TongGiaNK");
            console.log(currentTongGiaNhapKho);

            // Thêm các tính toán khác ở đây nếu cần
            if (!this.NhapKhothis[monthDataKey]) {
              this.NhapKhothis[monthDataKey] = 0;
            }
            this.NhapKhothis[monthDataKey] = currentTongGiaNhapKho;
            // this.GiaNK = currentTongGiaNhapKho
            
            this.LoiNhuanthis[monthDataKey] = this.TinhLoiNhuan(DoanhSo, this.NhapKhothis[monthDataKey]);
            console.log("LoiNhuan");
            console.log(this.DoanhSothis);
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      });
    },
    // LastMonthGetSachNhapKHo() {
    //   // Thực hiện yêu cầu API cho từng mã sản phẩm trong mảng
    //   this.LastMonthSachSauKhiLoc.forEach((CTDH) => {
    //     axios.get('http://localhost:3000/api/sach/nhapkho/' + CTDH.CTDH_MaSach)
    //       .then((response) => {
    //         this.LastMonthSachNhapKho = response.data;
    //         this.TBGiaNhapKho(this.LastMonthSachNhapKho);
    //         this.SoSPBan = this.SLSPBan(CTDH.CTDH_MaSach);
    //         this.ThanhTienNhapKho = this.GiaNK * this.SoSPBan
    //         console.log("Thanh tien sp nhap kho " + this.ThanhTienNhapKho)
    //         this.LastMonthTongGiaNhapKho += this.ThanhTienNhapKho
    //         console.log("THSA " + this.LastMonthTongGiaNhapKho)
    //         console.log("Tong gia nhap kho " + this.LastMonthTongGiaNhapKho)
    //         console.log("SL bán ra 1 SP " + this.SoSPBan)
    //         console.log(response);
    //         console.log(this.LastMonthSachNhapKho);
    //         this.LastMonthLoiNhuan = this.TinhLoiNhuan(this.LastMonthTongDoanhSo, this.LastMonthTongGiaNhapKho)

    //       })
    //       .catch((error) => {
    //         // handle error
    //         console.log(error);
    //       })
    //       console.log("THSA " + this.LastMonthTongGiaNhapKho)


    //   });
    // },
    sachdaban() {
      axios.get("http://localhost:3000/api/chitietdonhang").then(response => {
        this.SachDaBan = response.data
        console.log("SACHDABAN")
        console.log(this.SachDaBan)
        this.calculateDataFor12Months()

        // this.filterOrdersCurrentMonth(); // Gọi hàm để lọc dữ liệu sau khi có dữ liệu từ API
      }).catch(error => {
        alert(error);
      });
    },
    // lastmonthsachdaban() {
    //   axios.get("http://localhost:3000/api/chitietdonhang").then(response => {
    //     this.SachDaBan = response.data
    //     console.log(this.SachDaBan)
    //     this.filterOrdersLastMonth(); // Gọi hàm để lọc dữ liệu sau khi có dữ liệu từ API
    //   }).catch(error => {
    //     alert(error);
    //   });

    // },
    CongTien(arr) {
      return arr.reduce((sum, item) => sum + item.CTDH_ThanhTien, 0);
    },
    TBGiaNhapKho(arr) {
      return arr.reduce((sum, item) => sum + item.NK_Gia, 0) / arr.length

    },
    // TinhTienNhapKho(){
    //   this.ThanhTienNhapKho = this.GiaNK * this.SoSPBan
    // },
    SLSPBan(NK_MaSach) {
      return this.SachDaBan.find(item => item.CTDH_MaSach === NK_MaSach).CTDH_SoLuong;
    },
    SLDaBan(arr) {
      this.CurrentSoLuongBanRa = arr.reduce((sum, item) => sum + item.CTDH_SoLuong, 0);
    },
    LastSLDaBan(arr) {
      this.LastMonthSoLuongBanRa = arr.reduce((sum, item) => sum + item.CTDH_SoLuong, 0);
    },
  }
}
</script>
<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

  <VRow>

    <VCol cols="8" sm="8">
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="6">
          <CardStatisticsVertical v-bind="{
            title: 'Doanh số (VNĐ)',
            image: chart,
            // stats: CurrentTongDoanhSo,
            // change: ((CurrentTongDoanhSo - LastMonthTongDoanhSo) / (LastMonthTongDoanhSo)) * 100,

            stats: LamTron(DoanhSothis[selectedMonth], 0),
            change: LamTron(((DoanhSothis[selectedMonth] - DoanhSothis[LastMonth]) / (DoanhSothis[LastMonth])) * 100, 0),
          }" />
        </VCol>

        <!-- 👉 Sales -->
        <VCol cols="6">
          <CardStatisticsVertical v-bind="{
            title: 'Sách đã bản',
            image: wallet,
            stats: LamTron(SoLuongthis[selectedMonth], 0),
            change: LamTron((((SoLuongthis[selectedMonth] - SoLuongthis[LastMonth]) / (SoLuongthis[LastMonth])) * 100), 0),
            // stats: 0,
            // change: 0,
          }" />
        </VCol>
        <VCol cols="6">
          <CardStatisticsVertical v-bind="{
            title: 'Lợi nhuận',
            image: wallet,
            stats: LamTron(LoiNhuanthis[selectedMonth], 0),
            change: LamTron((((LoiNhuanthis[selectedMonth] - LoiNhuanthis[LastMonth]) / (LoiNhuanthis[LastMonth])) * 100), 0),
            // stats: 0,
            // change: 0,
          }" />
        </VCol>
        <VCol cols="6">
          <CardStatisticsVertical v-bind="{
            title: 'Giá nhập kho (Sách bán)',
            image: wallet,
            stats: LamTron(NhapKhothis[selectedMonth], 0),
            change: LamTron((((NhapKhothis[selectedMonth] - NhapKhothis[LastMonth]) / (NhapKhothis[LastMonth])) * 100), 0),
            // stats: 0,
            // change: 0,
          }" />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="4">
      <AnalyticsOrderStatistics :SLDanhGia="DGCHs.length" :SLDanhGia_TichCuc="DGCH_TichCuc"
        :SLDanhGia_TieuCuc="DGCH_TieuCuc" :SLDanhGia_5_sao="DGCH_5_sao" :SLDanhGia_4_sao="DGCH_4_sao"
        :SLDanhGia_3_sao="DGCH_3_sao" :SLDanhGia_2_sao="DGCH_2_sao" :SLDanhGia_1_sao="DGCH_1_sao" />
    </VCol>
    <VCol cols="6" md="6" sm="6">
      <AnalyticsFinanceTabs Title="Doanh số năm nay" :incomeData="DoanhSothis" :MaxVL=5000000 :MinVL=10000 />
    </VCol>
    <VCol cols="6" md="6" sm="6">
      <AnalyticsFinanceTabs Title="Lợi nhuận năm nay" :incomeData="LoiNhuanthis" :MaxVL=5000000 :MinVL=10000 />
    </VCol>
    <VCol cols="6" md="6" sm="6">
      <AnalyticsFinanceTabs Title="Nhập kho năm nay" :incomeData="NhapKhothis" :MaxVL=5000000 :MinVL=10000 />
    </VCol>
    
    <VCol cols="6">
      <VCard>
        <v-table fixed-header height="380px">
          <thead>
            <tr>
              <p></p>
            </tr>
            <tr class="text-center text-dark">
              <h4>Sách sắp bán hết</h4>
            </tr>
            <tr>
              <th class="text-center">
                STT
              </th>
              <th class="text-center">
                Tên sách
              </th>
              <th class="text-center">
                Số lượng
              </th>
              <th class="text-center">
                Nhập kho
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="( item, index ) in SachGanHet" :key="item.S_Ma">
              <td>{{ index + 1 }}</td>
              <td>{{ item.S_Ten }}</td>
              <td>{{ item.S_SoLuong }}</td>
              <td><v-button class="btn btn-warning" @click="this.$router.push(`quanlysach`)"><font-awesome-icon
                    :icon="['fas', 'triangle-exclamation']" /></v-button></td>
            </tr>
          </tbody>
        </v-table>
      </VCard>
    </VCol>
    <!-- <AnalyticsTotalRevenue/>> -->
    <!-- <VCol cols="12" sm="8" md="4" order="1" order-md="2">
      <VRow>
        👉 Payments
        <VCol cols="12" sm="6">
          <CardStatisticsVertical v-bind="{
            title: 'Payments',
            image: paypal,
            stats: '$2,468',
            change: -14.82,
          }" />
        </VCol>

        👉 Revenue
        <VCol cols="12" sm="6">
          <CardStatisticsVertical v-bind="{
            title: 'Transactions',
            image: card,
            stats: '$14,857',
            change: 28.14,
          }" />
        </VCol>
      </VRow>

      <VRow>
        👉 Profit Report
        <VCol cols="12" sm="12">
          <AnalyticsProfitReport />
        </VCol>
      </VRow>
    </VCol> -->

    <!-- 👉 Order Statistics -->
    <!-- <VCol cols="4" md="4" sm="6" order="3">
      
    </VCol> -->

    <!-- 👉 Tabs chart -->


    <!-- 👉 Transactions -->
    <!-- <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsTransactions />
    </VCol> -->
</VRow></template>
