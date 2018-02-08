import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCKiQgNaerPrhRZ37AvbhRKgOr28r2AIrE'
    }
})
const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
Vue.use(VueAwesomeSwiper)
