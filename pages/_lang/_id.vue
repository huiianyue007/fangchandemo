<template xmlns="http://www.w3.org/1999/html">
  <section class="container">
    <div class="action">
      <div>
        <input type="radio" name="lang" value="zh" v-model="lang"><label>zh</label>
      </div>
      <div>
        <input type="radio" name="lang" value="en" v-model="lang"><label>en</label>
      </div>
      <div>
        <input type="text" v-model="id" /><label>id</label>
      </div>
      <div>
        <input type="text" :value="urlString" disabled/><label>{{$t('link')}}</label>
      </div>
      <nuxt-link class="button" :to="url">
        {{ $t('jump') }}
      </nuxt-link>
    </div>
    <fancy-gallery :swiperOption = 'swiperOption' :swiperImg = 'swiperImg' ref = 'fancy'>
      <div class = 'btn' @click = 'resize'>还原</div>
    </fancy-gallery>
    <tk-map :center = 'center'></tk-map>
    <div class="code">
      <pre>
        {{detail}}
      </pre>
    </div>

  </section>
</template>
<script>
  import axios from 'axios'
  import fancyGallery from '~components/fancyGallery.vue'
  import tkMap from '~components/tkMap.vue'
  export default {
    head () {
      return {
        title: this.detail ? this.detail.house.address : this.defaultTitle
      }
    },
    data () {
      return {
        defaultTitle: '房屋信息',
        swiperOption: {
          autoplay: 4000,
          speed: 300,
          loop: true,
          pagination: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
      }
    },
    beforeRouteLeave (to, from, next) {
        window.alert(123)
        next(false)
    },
    components: {
      fancyGallery, tkMap
    },
    computed: {
      url () {
        return {
          name: 'lang-id',
          params: {
            lang: this.lang,
            id: this.id
          }
        }
      },
      urlString () {
        return '/' + [this.lang, this.id].join('/')
      }
    },
    methods: {
      resize () {
        this.$refs.fancy.$emit('resize')
      }
    },
    async asyncData ( {params} ) {
      let id = params.id || 3741362
      let lang = params.lang || 'zh'
      let langList = {
        en: 'us_EN',
        zh: 'zh_CN'
      }
      let {data} = await axios.request({
          url: `bkv2/api/listing/detail/findone`,
          baseURL: 'http://hk.dev.fangintel.com',
          method: 'post',
          params: {
            'ml_num': 'E' + id,
            'lang': langList[lang]
          }
      })
      return {
        detail: data.data,
        swiperImg: data.data.house.photo_list,
        id: id,
        lang: lang,
        center: {
          lat: 19.8934596,
          lng: 44.0586543
        }
      }
    }
  }
</script>
<style scoped>
  .action{
    padding: 16px;
  }
  .action>div{
    padding:8px;
  }
  .action label{
    padding-left:8px;
  }
  .code{
    width:100%;
    background:rgba(0,0,0,.57);
    color:white;
  }
  .code pre{
    white-space: pre-wrap;
    padding: 16px;
    margin:0;
  }
  .btn{
    width:100px;
    line-height:40px;
    position:absolute;
    bottom:0;
    text-align:center;
    background:#41B883;
    color:#fff;
    left:calc(50% - 50px)
  }
</style>
