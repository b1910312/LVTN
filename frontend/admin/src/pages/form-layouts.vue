<script setup>
import DemoFormLayoutHorizontalForm from '@/views/pages/form-layouts/DemoFormLayoutHorizontalForm.vue'
import DemoFormLayoutHorizontalFormWithIcons from '@/views/pages/form-layouts/DemoFormLayoutHorizontalFormWithIcons.vue'
import DemoFormLayoutMultipleColumn from '@/views/pages/form-layouts/DemoFormLayoutMultipleColumn.vue'
import DemoFormLayoutVerticalForm from '@/views/pages/form-layouts/DemoFormLayoutVerticalForm.vue'
import DemoFormLayoutVerticalFormWithIcons from '@/views/pages/form-layouts/DemoFormLayoutVerticalFormWithIcons.vue'
</script>
<script>
import now from 'moment'
export default {
  data() {
    return {
      imageFile: null,
      Image: {
        TB_MaSach: "KBS001",
        TB_NgayTao: "12-08-2023"
      }
    };
  },
  methods: {
    setImageFile(event) {
      this.imageFile = event.target.files[0];
    },
    async uploadImage(event) {
      event.preventDefault();

      const formData = new FormData();
      formData.append("thumbnail", this.imageFile);

      try {
        const response = await axios.post("http://localhost:3000/api/thumbnail/upload_images/SB/"+this.Image.TB_MaSach, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        console.log("Tệp ảnh đã được tải lên thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi tải lên tệp ảnh:", error);
      }
    }

  }
};
</script>
<template>
  <div>
    <!-- <VRow>
      <VCol cols="12" md="6">
      
        <VCard title="Horizontal Form">
          <VCardText>
            <DemoFormLayoutHorizontalForm />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
       
        <VCard title="Horizontal Form with Icons">
          <VCardText>
            <DemoFormLayoutHorizontalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        
        <VCard title="Vertical Form">
          <VCardText>
            <DemoFormLayoutVerticalForm />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        
        <VCard title="Vertical Form with Icons">
          <VCardText>
            <DemoFormLayoutVerticalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
         
        <VCard title="Multiple Column">
          <VCardText>
            <DemoFormLayoutMultipleColumn />
          </VCardText>
        </VCard>
      </VCol>
    </VRow> -->
    <div>
      <form @submit="uploadImage">
        <VFileInput type="file" ref="imageInput" @change="setImageFile" />
        <button type="submit">Tải lên</button>
      </form>
    </div>
  </div>
</template>
