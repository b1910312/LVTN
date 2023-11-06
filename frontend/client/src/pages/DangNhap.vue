<script>
</script>
<template>
    <div class="bg">
        <div class="cardnew">
            <VCard class="w-100 p-2" style="border-radius: 30px; background-color: rgba(255, 255, 255, 0.8);">
                <VCardItem class="justify-center">
                    <img src="@/assets/KingBookLogo(Big).png" class="img-fluid w-75">
                </VCardItem>

                <VCardText class="pt-2">
                    <h5 class="text-center text-h5 mb-1">
                        ĐĂNG NHẬP
                    </h5>
                </VCardText>

                <VCardText>
                    <VRow>
                        <!-- TKNV_MaNV -->
                        <VCol cols="12">
                            <VTextField autofocus placeholder="Nhập mã nhân viên của bạn tại đây" label="Mã nhân viên" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField placeholder="Nhập mã nhân viên của bạn tại đây" label="Mã nhân viên" />
                        </VCol>
                        <!-- TKNV_MatKhau -->
                        <VCol cols="12">

                            <!-- remember me checkbox -->
                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">

                            </div>

                            <!-- login button -->
                            <VBtn class="w-100 bg bg-dark text-white">
                                Đăng nhập
                            </VBtn>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>
<style>
.bg {
    display: flex;
    justify-content: center;
    /* Giữa theo chiều ngang */
    align-items: center;
    /* Giữa theo chiều dọc */
    height: 97vh;
    /* Chiều cao cửa sổ trình duyệt */
    margin: 0;
}

.cardnew {
    width: 700px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.3);
}
</style>