<script setup>
import QLNhanVien from '@/views/pages/QLNhanVien/NhanVien.vue'
import QLTaiKhoanNhanVien from '@/views/pages/QLNhanVien/TaiKhoanNhanVien.vue'
import QLThemNhanVien from '@/views/pages/QLNhanVien/NhanVienThem.vue'

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="TaiKhoanNhanVien-tab" data-bs-toggle="tab" data-bs-target="#TaiKhoanNhanVien"
        type="button" role="tab" aria-controls="TaiKhoanNhanVien" aria-selected="true">Tài khoản nhân viên</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="ThongTinNhanVien-tab" data-bs-toggle="tab" data-bs-target="#ThongTinNhanVien"
        type="button" role="tab" aria-controls="ThongTinNhanVien" aria-selected="false">Thông tin nhân viên</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="ThemNV-tab" data-bs-toggle="tab" data-bs-target="#ThemNV" type="button" role="tab"
        aria-controls="ThongTinNhanVien" aria-selected="false">Thêm nhân viên</button>
    </li>

  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div class="tab-pane active" id="TaiKhoanNhanVien" role="tabpanel" aria-labelledby="TaiKhoanNhanVien-tab">
      <VCard title="DANH SÁCH TÀI KHOẢN NHÂN VIÊN" height="600">
        <QLTaiKhoanNhanVien />
      </VCard>
    </div>
    <div class="tab-pane" id="ThongTinNhanVien" role="tabpanel" aria-labelledby="ThongTinNhanVien-tab">
      <VCard title="DANH SÁCH THÔNG TIN NHÂN VIÊN" height="600">
        <QLNhanVien />
      </VCard>
    </div>
    <div class="tab-pane" id="ThemNV" role="tabpanel" aria-labelledby="ThemNV-tab">
      <VCard title="Thêm nhân viên mới" height="600">
        <QLThemNhanVien />
      </VCard>
    </div>
  </div></template>
