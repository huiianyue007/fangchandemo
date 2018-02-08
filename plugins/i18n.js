import Vue from 'vue'
import {t, i18n} from '~/assets/js/i18n'
import router from '~router'

i18n.message = {
  en: require('~/locales/en.json'),
  zh: require('~/locales/zh.json')
}

router.onReady(function () {
  const locale = router.currentRoute.params.lang || 'zh'
  i18n.setLocale(locale)
})

Vue.prototype.$t = t
Vue.prototype.$i18n = i18n
Vue.filter('$t', t)

export default i18n