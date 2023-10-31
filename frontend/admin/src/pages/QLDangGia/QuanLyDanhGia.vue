<script setup>
import QLDanhGiaSanPham from '@/views/pages/QLDanhGia/DanhGia.vue'
import QLDanhGiaCuaHang from '@/views/pages/QLDangGiaCuaHang/DanhGiaCuaHang.vue'

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <VRow>
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab"
          aria-controls="home" aria-selected="true">Đánh giá sản phẩm</button>
      </li>
      
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab"
          aria-controls="profile" aria-selected="false">Đánh giá cửa hàng</button>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content w-100">
      <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
     
            <VCard title="DANH SÁCH ĐÁNH GIÁ SẢN PHẨM" height="580">
            <QLDanhGiaSanPham />
          </VCard>
          
      </div>
      <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <VCard title="DANH SÁCH ĐÁNH GIÁ CỬA HÀNG" height="580">
            <QLDanhGiaCuaHang />
          </VCard>
      </div>
    </div>
</VRow></template>
