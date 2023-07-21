<template>
    <div class="row p-3 pb-1 text-white" style="background-color: rgb(26, 184, 26);">
        <div class="col-lg-3">
            <img :src="require('@/assets/image/KingBookLogo(Big).png')" alt="" class="img-fluid">
        </div>
        <div class="col-lg-7">
            <div class="row">
                <div class="input-group">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <button type="button" class="btn btn-warning"><i class="fa fa-search"></i></button>
                </div>
            </div>
            <div class="row mt-2 ps-4 pe-4">
                <a href="#" class="btn btn-outline-warning text-white col-lg-3 mx-auto"  style="border: rgb(26, 184, 26) 1px  solid; ">Trang chủ</a>
                <a href="#" class="btn btn-outline-warning text-white col-lg-3 mx-auto"  style="border: rgb(26, 184, 26) 1px  solid; ">Giới
                    thiệu</a>
                <a href="#" class="btn btn-outline-warning text-white col-lg-3 mx-auto"  style="border: rgb(26, 184, 26) 1px  solid; ">Cửa hàng</a>
                <a href="#" class="btn btn-outline-warning text-white col-lg-3 mx-auto"  style="border: rgb(26, 184, 26) 1px  solid; ">Liên hệ</a>
            </div>
        </div>
        <div class="col-lg-2">
            <div class="card ">
                <!-- <div class="row">
                    <a href="#" class="col-lg-6 btn mx-auto text-black"><i class="fa fa-right-to-bracket"></i> <h6>Đăng nhập</h6></a>
                    <a href="#" class="col-lg-6 btn mx-auto text-black"><i class="fa fa-pen-to-square"></i> <h6>Đăng ký</h6></a>
                </div> -->

                <!-- Khi đăng nhập -->
                <div class="btn-group">
                    <button class="btn text-dark dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Nguyễn Thanh Tín
                    </button>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="triggerId">
                        <img :src="require(`@/assets/image/Avatar/KH001.jpg`)" alt=""
                            class="img-fluid dropdown-header disable mx-auto" style="height: 15vh; width: auto; border-radius: 20%;">
                        <a class="dropdown-item " href="#"><i class="fa fa-address-card"></i>&nbsp;&nbsp;Hồ sơ</a>
                        <a class="dropdown-item " href="#"><i class="fa fa-gear"></i>&nbsp;&nbsp;Cài đặt</a>
                        <div class="dropdown-divider " ></div>
                        <a class="dropdown-item " href="#"><i class="fa fa-right-from-bracket"></i>&nbsp;&nbsp;Đăng xuất</a>
                    </div>
                </div>
                <div class="">
                    <a href="#" class="btn btn-warning w-100">
                        <i class="fa fa-cart-shopping"></i>&nbsp;Giỏ hàng: 10</a>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'NavBar',

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
