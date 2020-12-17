import _ from "lodash"
const makePath = (path) => {
    return path
}
class UrlBuilder {
    constructor(app) {
        this.path = {
            category: '/category/',
            product: '/product/',
            page: '/page/',
            search: '/search/',
            cart: '/cart/',
            search: '/search/',
            blog: '/blog/',
            profile: '/profile/',
            checkout: '/checkout/'

        }
        // this.app = app;
    }
    category(slug) {
        return makePath(this.path.category + slug)
    }
    product(slug) {
        return makePath(this.path.product + slug)
    }
    page(slug) {
        return makePath(this.path.page + slug)
    }
    account(slug) {
        return makePath(this.path.account + slug)
    }
    cart(slug) {
        return makePath(this.path.cart)
    }
    search(slug) {
        return makePath(this.path.search + slug)
    }
    blog(slug) {
        return makePath(this.path.blog + slug)
    }
    makePath(path) {
        return makePath(path)
    }
    profile(slug) {
        return makePath(this.path.profile + slug)
    }
    calendar(slug) {
        return makePath(this.path.calendar)
    }
    checkout(slug) {
        return makePath(this.path.checkout)

    }

}
export default ({ app }, inject) => {
    inject('url', new UrlBuilder(app))
}