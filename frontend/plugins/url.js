import _ from "lodash"
const routes = require('../../common/routes/routes')

class UrlBuilder {
    constructor(app) {
        this.path = routes
        this.makePath = (...args) => app.languagePath(...args)
        // this.app = app;
    }
    category(slug) {
        return this.makePath(this.path.category + slug)
    }
    product(slug) {
        return this.makePath(this.path.product + slug)
    }
    page(slug) {
        return this.makePath(this.path.page + slug)
    }
    account(slug) {
        return this.makePath(this.path.account + slug)
    }
    cart(slug) {
        return this.makePath(this.path.cart)
    }
    search(slug) {
        return this.makePath(this.path.search + slug)
    }
    blog(slug) {
        return this.makePath(this.path.blog + slug)
    }
    langPath(path) {
        return this.makePath(path)
    }
    profile(slug) {
        return this.makePath(this.path.profile + slug)
    }
    calendar(slug) {
        return this.makePath(this.path.calendar)
    }
    checkout(slug) {
        return this.makePath(this.path.checkout)

    }

}
export default ({ app }, inject) => {
    inject('url', new UrlBuilder(app))
}