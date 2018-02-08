<template>
  <section class="container" :class = '[flag ? "shadow-show" : ""]' @click.self = 'resize'>
    <banner :swiperOption='swiperOption' :swiperImg='swiperImg' @tapImg = 'fullScreen' :style = 'bannerStyle' ref = 'banner'></banner>
    <slot v-if = 'flag'></slot>
  </section>
</template>
<script>
  import banner from '~components/banner.vue'
  export default {
    data () {
      return {
        flag: false,
        shadowStyle: '',
        bannerStyle: ''
      }
    },
    mounted () {
      this.$on('fullScreen', this.fullScreen)
      this.$on('resize', this.resize)
    },
    methods: {
      fullScreen () {
        this.flag = true
      },
      resize () {
        this.flag = false
      }
    },
    watch: {
      flag (val) {
        document.body.style.cssText = val ? 'overflow:hidden' : ''
        if (val) {
          var bannerDom = this.$refs.banner.$el
          this.bannerStyle = `position:absolute;top:0px;width:100%;transition:top ${this.speed} linear;z-index:101`
          window.setTimeout(() => {
            this.bannerStyle = `position:absolute;width:100%;top:${(window.innerHeight - bannerDom.offsetHeight)/2}px;transition:top ${this.speed} linear;z-index:101`
          }, this.speed)
        } else {
          this.bannerStyle = 'position:static'
        }
      }
    },
    props: {
      swiperImg: Array,
      swiperOption: Object,
      speed: {
        type: String,
        default: '.5s'
      }
    },
    components: {
      banner
    }
  }
</script>
<style lang='scss' scoped>
.container{
  overflow:hidden;
}
.shadow-show{
  position:fixed;
  top:0;
  left:0;
  background:#000;
  width:100%;
  height:100%;
  z-index:100;
}
</style>