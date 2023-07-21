<template>
    <div class="row mt-3 p-4 " style="border-top: 2px solid rgb(26, 184, 26); background-color: rgb(26, 184, 26);">

        <div class="col-lg-12">
            <div class="row">
                <div class="col-lg-3 text-white me-5">
                    <img :src="require(`@/assets/image/KingBookLogo(Big).png`)" class="img-fluid" alt="">
                    <h4>Cửa hàng King Book Store</h4>
                </div>
                <div class="col-lg-3 ">
                    <div class="text-white mb-2 row"
                        style="background-color: rgb(26, 184, 26); border: 2px solid rgb(26, 184, 26);">
                        <h4 class="col-lg-2"> <i class="fa fa-location-dot"></i></h4>
                        <h6 class="col-lg-10 text-start">Số 123, đường Nguyễn Văn Cừ, phường Xuân Khánh, quận Ninh Kiều, TP
                            Cần Thơ</h6>
                    </div>
                    <div class="text-white mb-2 row"
                        style="background-color: rgb(26, 184, 26); border: 2px solid rgb(26, 184, 26);">
                        <h4 class="col-lg-2"> <i class="fa fa-phone"></i></h4>
                        <h6 class="col-lg-10 text-start">0984442145</h6>
                    </div>
                    <div class="text-white mb-2 row"
                        style="background-color: rgb(26, 184, 26); border: 2px solid rgb(26, 184, 26);">

                        <h4 class="col-lg-2"> <i class="fa fa-envelope"></i></h4>
                        <h6 class="col-lg-10 text-start">KingBookStore@gmail.com</h6>
                    </div>
                </div>
                <div class="col-lg-5 ms-5">
                    <form>
                        <div class="form-group text-start text-white">
                            <label  for="exampleFormControlInput1">Email</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1"
                                placeholder="name@example.com">
                        </div>
                        <div class="form-group mt-2 text-start text-white">
                            <label  for="exampleFormControlTextarea1">Nội dung</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="form-group mt-2 mb-2 float-end">
                            <button class="btn btn-warning text-white" type="submit">Gửi</button>
                        </div>
                    </form>
                </div>
               

            </div>
            <div class="row border-warning text-white pt-2" style="border-top: 2px solid;">
                <h6> The copyright &copy; Nguyễn Thanh Tín - B9101312
                </h6>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'FooTer',

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
