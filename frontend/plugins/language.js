import _ from "lodash"
const ru = require('../lang/ru.json')
const en = require('../lang/en.json')
const dict = {
    ru, en
}
export default ({ app, store }, inject) => {
    app.languagePath = function (path) {
        const lang = store.getters['language/language']
        return `/${lang}${path}`
    }
    inject('langValue', (value, ru, en) => {
        if (!en) {
            const arr = ru.split(".");
            arr[arr.length - 1] += '_en';
            en = arr.join('.')
        }
        const path = store.getters['language/language'] === 'en' ? en : ru
        return _.get(value, path)
    })
    inject('t', (path) => {
        const values = store.getters['language/language'] === 'en' ? dict.en : dict.ru
        return _.get(values, path)
    })

}