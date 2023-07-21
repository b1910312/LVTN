<template>
    <div id="carouselId" class="carousel slide mt-3 w-100 p-0" style="max-height: 400px;" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true" aria-label="First slide"></li>
            <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
            <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
        </ol>
        <div class="carousel-inner" style="height: 40vh;"  role="listbox">
            <div class="carousel-item active">
                <img :src="require(`@/assets/image/HinhMinhHoa/KBS001.jpg`)" style="object-fit: fill; max-height: 400px;" class=" w-100 d-block" alt="First slide">
            </div>
            <div class="carousel-item">
                <img :src="require(`@/assets/image/HinhMinhHoa/KBS001.jpg`)" style="object-fit: fill; max-height: 400px;" class=" w-100 d-block" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img :src="require(`@/assets/image/HinhMinhHoa/KBS001.jpg`)" style="object-fit: fill; max-height: 400px;" class=" w-100 d-block" alt="Third slide">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
  
<script>
export default {
    name: 'BanerCard',
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
