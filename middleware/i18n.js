import i18n from '~plugins/i18n'
export default function ({ store, route, params, error, redirect }) {
  const locale = params.lang || 'zh'
  i18n.setLocale(locale)
}