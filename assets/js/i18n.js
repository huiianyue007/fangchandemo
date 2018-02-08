import store from '~store'

const i18n = {
  message: {},
  locale: '',
  setLocale: function (locale) {
    this.locale = locale
    store.commit('SET_LANG', locale)
  }
}

const t = function (text) {
  if (i18n.locale && i18n.message[i18n.locale] && i18n.message[i18n.locale][text]) {
    return i18n.message[i18n.locale][text]
  } else {
    return text
  }
}

export {t, i18n}