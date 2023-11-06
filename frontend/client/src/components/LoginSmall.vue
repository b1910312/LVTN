<template>
    <div class="card p-2 " style="border-radius: 20px; background-color: rgba(170, 163, 163, 0.4);">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="navitem col-6 " role="presentation">
                <button class="navlinks btn w-100  active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                    type="button" role="tab" aria-controls="home" aria-selected="true">Đăng nhập</button>
            </li>
            <li class="navitem col-6 " role="presentation">
                <button class="navlinks btn w-100   " id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                    type="button" role="tab" aria-controls="profile" aria-selected="false">Đăng ký</button>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content  p-2 m-2" style="border-radius: 20px; background-color: rgba(255, 255, 255, 0.5);">
            <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="mb-3 text-start p-1 ">
                    <label for="" class="form-label mt-2">Email</label>
                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    <label for="" class="form-label mt-2">Mật khẩu</label>
                    <input type="password"  name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                </div>

                <!-- login button -->
                <VBtn class="w-75 mx-auto btn btn-primary">
                    Đăng nhập
                </VBtn>
            </div>
            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="mb-3 text-start p-1 ">
                    <label for="" class="form-label mt-2">Email</label>
                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    <label for="" class="form-label mt-2">Mật khẩu</label>
                    <input type="password"  name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    <label for="" class="form-label mt-2">Nhập lại mật khẩu</label>
                    <input type="password"  name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                </div>

                <!-- login button -->
                <VBtn class="w-75 mx-auto btn btn-primary">
                    Đăng nhập
                </VBtn>
            </div>
        </div>
    </div>
</template>
<!-- (Optional) - Place this js code after initializing bootstrap.min.js or bootstrap.bundle.min.js -->

<script>


export default {
    name: 'LoginSmall',
    data() {
        return {}
    },
    mounted() {
        this.hide()
    },
    methods: {
        hide() {
            const vInputDetails = document.querySelector(".v-input__details");
            vInputDetails.style.display = "none"; // Ẩn phần tử
        }
    }
}
</script>
<style>
.v-input {
    border-radius: 10px;

}

.v-field__input {
    border-radius: 10px;

}

.v-field__overlay {
    border-radius: 10px;

}

.v-input__control {
    border-radius: 10px;
}

.v-field__field {
    border-radius: 10px;

    border: 1px solid blue;

}

.navitem .active {
    background-color: white;
    color: green;
}

.navitem .active:hover {
    background-color: white;
    color: green;
}</style>