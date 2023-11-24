<script setup>
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const props = defineProps({
  SLDanhGia: {
    type: Number,
    required: true,
  },
  SLDanhGia_TichCuc: {
    type: Number,
    required: true,
  },
  SLDanhGia_TieuCuc: {
    type: Number,
    required: true,

  },
  SLDanhGia_1_sao: {
    type: Number,
    required: true,
    default: 0
  },
  SLDanhGia_2_sao: {
    type: Number,
    required: true,
    default: 0
  },
  SLDanhGia_3_sao: {
    type: Number,
    required: true,
    default: 0
  },
  SLDanhGia_4_sao: {
    type: Number,
    required: true,
    default: 0
  },
  SLDanhGia_5_sao: {
    type: Number,
    required: true,
    default: 0
  },
})


const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${hexToRgb(String(currentTheme['on-surface']))},${variableTheme['disabled-opacity']})`
  const primaryTextColor = `rgba(${hexToRgb(String(currentTheme['on-surface']))},${variableTheme['high-emphasis-opacity']})`

  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: {
      width: 6,
      colors: [currentTheme.surface],
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: [
      'Tích cực',
      'Tiêu cực',

    ],
    colors: [
      currentTheme.success,
      currentTheme.error,

    ],
    grid: {
      padding: {
        top: -10,
        bottom: 0,
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 17,
              fontSize: '14px',
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -17,
              fontSize: '24px',
              color: primaryTextColor,
              fontFamily: 'Public Sans',
            },
            total: {
              show: true,
              label: 'Hài lòng',
              fontSize: '14px',
              formatter: () => `${(props.SLDanhGia_TichCuc / props.SLDanhGia) * 100}%`,
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
    },
  }
})


// const moreList = [
//   {
//     title: 'Refresh',
//     value: 'Refresh',
//   },
// ]
</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle class="mb-1">
        Đánh giá cửa hàng
      </VCardTitle>

      <!-- <template #append>
        <div class="me-n3 mt-n8">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template> -->
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center justify-space-between mb-3">
        <div class="flex-grow-1 text-center">
          <h2 class="text-h4 mb-1">
            {{ props.SLDanhGia }}
          </h2>
          <span>Lượt đáng giá</span>
        </div>

        <div>
          <VueApexCharts type="donut" :height="125" width="105" :options="chartOptions"
            :series="[props.SLDanhGia_TichCuc, props.SLDanhGia_TieuCuc,]" />
        </div>
      </div>

      <VList class="card-list ">
        <VListItem>
          <template #prepend>
            <VAvatar rounded variant="tonal" color="warning">
              <VIcon icon="bx-star" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            Đánh giá 5 sao
          </VListItemTitle>
          <template #append>
            <span>{{ props.SLDanhGia_5_sao }}</span>
          </template>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VAvatar rounded variant="tonal" color="warning">
              <VIcon icon="bx-star" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            Đánh giá 4 sao
          </VListItemTitle>
          <template #append>
            <span>{{ props.SLDanhGia_4_sao }}</span>
          </template>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VAvatar rounded variant="tonal" color="warning">
              <VIcon icon="bx-star" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            Đánh giá 3 sao
          </VListItemTitle>
          <template #append>
            <span>{{ props.SLDanhGia_3_sao }}</span>
          </template>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VAvatar rounded variant="tonal" color="warning">
              <VIcon icon="bx-star" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            Đánh giá 2 sao
          </VListItemTitle>
          <template #append>
            <span>{{ props.SLDanhGia_2_sao }}</span>
          </template>
        </VListItem>
        <VListItem>
          <template #prepend>
            <VAvatar rounded variant="tonal" color="warning">
              <VIcon icon="bx-star" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            Đánh giá 1 sao
          </VListItemTitle>
          <template #append>
            <span>{{ props.SLDanhGia_1_sao }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
