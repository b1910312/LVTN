<script setup>
import DefaultLayout from './components/DefaultLayout.vue'
import Footer from './components/FooterPage.vue';
</script>
<script>
export default {
  name: "DFPage",
  data(){
    return{
      NXB: []
    }
  },
  mounted(){
    this.GetNXB()
  },
  methods:{
    GetNXB(){
      axios.get(`http://localhost:3000/api/nxb`)
      .then(res=>{
        this.NXB = res.data
      })
    }
  }
}
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <Footer :NXB="NXB"/> 

</template>

<style>
.imgcard{
    margin: auto;
    border-radius: 15px;
    width: 100%;
    height: 200px;
}</style>
<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
