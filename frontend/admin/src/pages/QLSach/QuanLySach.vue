<script setup>
import QLSachTable from '@/views/pages/QLSach/Sach.vue'
import QLSachNgungKDTable from '@/views/pages/QLSachNgungKD/SachNgungKD.vue'

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab"
        aria-controls="home" aria-selected="true">Sách đang kinh doanh</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link " id="home1-tab" data-bs-toggle="tab" data-bs-target="#home1" type="button" role="tab"
        aria-controls="home" aria-selected="true">Lịch sử nhập kho</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab"
        aria-controls="profile" aria-selected="false">Sách đã ngừng kinh doanh</button>
    </li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
      
          <VCard title="DANH SÁCH ĐẦU SÁCH ĐANG KINH DOANH" height="600">
            <QLSachTable />
          </VCard>
       
    </div>
    <div class="tab-pane" id="home1" role="tabpanel" aria-labelledby="profile-tab">
      
      <VCard title="DANH SÁCH ĐẦU SÁCH ĐÃ NGỪNG KINH DOANH" height="600">
        <QLSachNgungKDTable />
      </VCard>
   
</div>
    <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
      
          <VCard title="DANH SÁCH ĐẦU SÁCH ĐÃ NGỪNG KINH DOANH" height="600">
            <QLSachNgungKDTable />
          </VCard>
       
    </div>
  </div>
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