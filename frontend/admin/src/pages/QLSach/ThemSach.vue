<script setup>

import ThemSach from '@/views/pages/QLSach/SachThem.vue'

</script>

<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    
    <VRow width="100%" class="mx-auto ">
        <VCol cols="12" md="12">
            <!-- 👉 Vertical Form -->
            <VCard title="Thêm sách mới">
                <ThemSach />
            </VCard>
        </VCol>
    </VRow>
</template>


