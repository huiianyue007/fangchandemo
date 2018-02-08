<template>
  <div class = 'container'>
    <div v-swiper:mySwiper="swiperOption" class = 'my-swiper'>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, key) in swiperImg" @click = 'selectImg(key)'>
          <img :src="item" data-preview-src="">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  export default {
    methods: {
      selectImg (opt) {
        this.$emit('tapImg', opt)
      }
    },
    props: {
      swiperImg: Array,
      swiperOption: Object
    }
  }
</script>
<style scoped lang = 'scss'>
  .container{
    position: relative;
  }
  .my-swiper {
    height: auto;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width:100%;
        height:auto;
      }
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>