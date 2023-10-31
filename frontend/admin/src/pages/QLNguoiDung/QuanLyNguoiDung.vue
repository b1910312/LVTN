<script setup>
import QLNguoiDung from '@/views/pages/QLNguoiDung/NguoiDung.vue'
import QLTaiKhoanNguoiDung from '@/views/pages/QLNguoiDung/TaiKhoanNguoiDung.vue'
import QLThemNguoiDung from '@/views/pages/QLNguoiDung/NguoiDungThem.vue'

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="TaiKhoanNguoiDung-tab" data-bs-toggle="tab" data-bs-target="#TaiKhoanNguoiDung"
        type="button" role="tab" aria-controls="TaiKhoanNguoiDung" aria-selected="true">Tài khoản khách hàng</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="ThongTinNguoiDung-tab" data-bs-toggle="tab" data-bs-target="#ThongTinNguoiDung"
        type="button" role="tab" aria-controls="ThongTinNguoiDung" aria-selected="false">Thông tin khách hàng</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="ThemNV-tab" data-bs-toggle="tab" data-bs-target="#ThemNV" type="button" role="tab"
        aria-controls="ThongTinNguoiDung" aria-selected="false">Thêm khách hàng</button>
    </li>

  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div class="tab-pane active" id="TaiKhoanNguoiDung" role="tabpanel" aria-labelledby="TaiKhoanNguoiDung-tab">
      <VCard title="DANH SÁCH TÀI KHOẢN KHÁCH HÀNG" height="600">
        <QLTaiKhoanNguoiDung />
      </VCard>
    </div>
    <div class="tab-pane" id="ThongTinNguoiDung" role="tabpanel" aria-labelledby="ThongTinNguoiDung-tab">
      <VCard title="DANH SÁCH THÔNG TIN KHÁCH HÀNG" height="600">
        <QLNguoiDung />
      </VCard>
    </div>
    <div class="tab-pane" id="ThemNV" role="tabpanel" aria-labelledby="ThemNV-tab">
      <VCard title="Thêm nhân viên mới" height="600">
        <QLThemNguoiDung />
      </VCard>
    </div>
  </div></template>
