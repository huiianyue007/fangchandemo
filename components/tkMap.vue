<template>
    <div class = 'box' :style = 'boxStyle'>
      <div class = 'shadow' @click = 'fullScreen' v-if = '!flag'></div>
        <div class = 'button' v-else @click = 'resize'>还原</div>
      <gmap-map v-if = 'showMap' :center="center" :zoom="7" :style = '{width: width, height: clientHeight}' :options = 'mapOption' ref="map">
          <gmap-marker :position="center" ></gmap-marker>
      </gmap-map>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        flag: false,
        showMap: false
      }
    },
    computed: {
      mapOption () {
        return {
          disableDefaultUI: !this.flag,
          gestureHandling: this.flag ? 'greedy' : 'none'
        }
      },
      clientHeight () {
        return this.flag ? `${window.innerHeight}px` : this.height
      },
      boxStyle () {
        return this.flag ? 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:100' : ''
      }
    },
    mounted () {
      this.showMap = true
      this.$on('fullScreen', this.fullScreen)
      this.$on('resize', this.resize)
    },
    methods: {
      fullScreen () {
        if (window.history && window.history.pushState) {
          window.history.pushState('forward', null)
        }
        this.flag = true
      },
      resize () {
        this.flag = false
      }
    },
    watch: {
      flag (val) {
        this.$gmapDefaultResizeBus.$emit('resize')
        if (!val){
          this.$refs.map.$mapObject.setCenter(this.center)
          window.removeEventListener('popstate', this.resize)
        } else {
          window.addEventListener('popstate', this.resize)
        }
      }
    },
    props: {
      width: {
        type: String,
        default: '100%'
      },
      center: {
        type: Object,
        default () {
          return {
            lat: -19.8934596,
            lng: -44.0586543
          }
        }
      },
      height: {
        type: String,
        default: '300px'
      }
    }
  }
</script>
<style scoped>
  .box{
    position:relative;
  }
  .button{
      position: fixed;
      bottom:0;
      width:100px;
      text-align:center;
      line-height:40px;
      color:#333;
      background:#ff0;
      left:calc(50% - 50px);
      z-index:10200
  }
  .shadow{
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      z-index:3;
  }
</style>