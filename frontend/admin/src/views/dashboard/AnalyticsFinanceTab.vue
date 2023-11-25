<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import statsVerticalChart from '@images/cards/chart-success.png'
import statsVerticalPaypal from '@images/cards/paypal-error.png'
import statsVerticalWallet from '@images/cards/wallet-primary.png'
import { hexToRgb } from '@layouts/utils'
import { ref } from 'vue';

const vuetifyTheme = useTheme()

function congTatCaGiaTri(arr) {
  return arr.reduce((total, currentValue) => total + currentValue, 0);
}

const props = defineProps({
  Title: {
    type: String,
    required: true,
  },
  incomeData: {
    type: Array,
    required: true,
  },
  MaxVL: {
    type: Number,
    required: true,
  },
  MinVL: {
    type: Number,
    required: true
  }
})
const tongDoanhSo = ref(0);


console.log("props.incomeData")
console.log(props.incomeData)
const OB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
console.log("OB")
console.log(OB)
const series = {
  income: [{
    data: props.incomeData,
  }],

}

const currentTab = ref('income')

const tabData = computed(() => {
  const data = {
    income: {
      avatar: statsVerticalWallet,
      title: 'Total Income',
      stats: '$459.1k',
      profitLoss: 65,
      profitLossAmount: '6.5k',
      compareToLastWeek: '$39k',
    },
  }

  return data[currentTab.value]
})

const chartConfig = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${hexToRgb(String(currentTheme['on-surface']))},${variableTheme['disabled-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variableTheme['border-color']))},${variableTheme['border-opacity']})`

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    grid: {
      strokeDashArray: 4.5,
      borderColor,
      padding: {
        left: 0,
        top: -20,
        right: 11,
        bottom: 7,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.25,
        opacityFrom: 0.5,
        stops: [
          0,
          95,
          100,
        ],
        shadeIntensity: 0.6,
        colorStops: [[
          {
            offset: 0,
            opacity: 0.4,
            color: currentTheme.primary,
          },
          {
            offset: 100,
            opacity: 0.2,
            color: currentTheme.surface,
          },
        ]],
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: currentTheme.primary,
      },
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [
        " ",
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      labels: {
        style: {
          fontSize: '14px',
          colors: disabledTextColor,
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      min: props.MinVL,
      max: props.MaxVL,
      show: false,
      tickAmount: 4,
    },
    markers: {
      size: 8,
      strokeWidth: 6,
      strokeOpacity: 1,
      hover: { size: 8 },
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [{
        size: 8,
        seriesIndex: 0,
        fillColor: '#fff',
        strokeColor: currentTheme.primary,
        dataPointIndex: series[currentTab.value][0].data.length - 1,
      }],
    },
  }
})

</script>

<template>
  <VCard>
    <!-- <VCardItem>
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="income">
          Income
        </VTab>
        <VTab value="expenses">
          Expenses
        </VTab>
        <VTab value="profit">
          Profit
        </VTab>
      </VTabs>
    </VCardItem> -->

    <VCardText class="d-flex align-center gap-3">
      <VAvatar size="46" rounded :image="tabData.avatar" />

      <div>
        <p class="mb-0">
          {{Title}}
        </p>
        <div class="d-flex align-center gap-2">
          <h6 class="text-h6">
            {{ congTatCaGiaTri(props.incomeData) }} VNĐ
          </h6>
          <!-- <span class="text-sm" :class="tabData.profitLoss > 0 ? 'text-success' : 'text-error'">
            <VIcon size="24" icon="bx-chevron-up" />
            {{ tabData.profitLoss }}%
          </span> -->
        </div>
      </div>
    </VCardText>

    <VCardText>
      <VueApexCharts type="area" :height="241" :options="chartConfig" :series="series[currentTab]" />
    </VCardText>

    <!-- <VCardText class="d-flex align-center justify-center gap-3">
      <VProgressCircular size="45" :model-value="tabData.profitLoss">
        <span class="text-xs text-medium-emphasis">{{ tabData.profitLossAmount }}</span>
      </VProgressCircular>

      <div>
        <h6 class="text-base font-weight-regular">
          <span class="text-capitalize">{{ currentTab }}</span>
          <span> this week</span>
        </h6>
        <span class="text-sm text-disabled">{{ tabData.compareToLastWeek }} less than last week</span>
      </div>
    </VCardText> -->
  </VCard>
</template>
