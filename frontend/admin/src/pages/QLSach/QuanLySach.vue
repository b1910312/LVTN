<script setup>
import QLSachTable from '@/views/pages/QLSach/Sach.vue'

</script>

<template>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <VRow>
    <VCol cols="12">
      <VCard title="DANH SÁCH ĐẦU SÁCH ĐANG KINH DOANH" height="600">
        <QLSachTable />
      </VCard>
    </VCol>
  </VRow>
</template>
<script>
export default defineComponent({
  methods: {
    async goToThemSach() {
      this.$router.push('/quanlysach/themsach');
    }
  }
});
</script>