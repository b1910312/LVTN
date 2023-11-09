<template>
    <div class="card p-2 " style="border-radius: 20px; background-color: rgba(0, 255, 4, 0.1);">
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
        <div class="tab-content  p-2 m-2" style="border-radius: 20px; background-color: rgba(0, 255, 125, 0.5);">
            <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="mb-3 text-start p-1 ">
                    <label for="" class="form-label mt-2">Email</label>
                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    <label for="" class="form-label mt-2">Mật khẩu</label>
                    <input type="password" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                </div>

                <!-- login button -->
                <v-button class="w-100 mx-auto btn btn-info">
                    Đăng nhập
                </v-button>
            </div>
            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="mb-3 text-start p-1 ">
                    <label for="" class="form-label mt-2">Email</label>
                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    <label for="" class="form-label mt-2">Mật khẩu</label>
                    <input type="password" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    <label for="" class="form-label mt-2">Nhập lại mật khẩu</label>
                    <input type="password" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                </div>

                <!-- login button -->
                <v-button class="w-100 mx-auto btn btn-warning">
                    Đăng ký
                </v-button>
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
}
</script>
<style>
.navitem .active {
    background-color: rgb(0, 255, 0);
    color: white;
}
.navlinks{
    color: gray;
}
.form-label{
    color: white;
}
.navitem:hover {
    background-color: rgb(146, 238, 146);
    color: white;
}
</style>