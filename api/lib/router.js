const { Router } = require('express')
const isAuthAdmin = require('../middleware/isAuthAdmin')
const _ = require('lodash')


module.exports = class Routing {
    constructor(controller, opts = {}) {
        this.controller = controller
        this.defaultOptions = {
            routes: {
                '/': {
                    get: {
                        middleware: [isAuthAdmin],
                        func: 'findAll'
                    },
                    post: {
                        middleware: [isAuthAdmin],
                        func: 'create'
                    }
                },
                '/id/:id': {
                    get: {
                        func: 'findById',
                        middleware: []
                    },
                    put: {
                        func: 'updateById',
                        middleware: [isAuthAdmin]
                    },
                    delete: {
                        func: 'removeById',
                        middleware: [isAuthAdmin]
                    },
                },
                '/admin/id/:id': {
                    get: {
                        func: 'findById',
                        middleware: [isAuthAdmin]
                    },

                },
                '/admin/:slug': {
                    get: {
                        func: 'findBySlug',
                        middleware: [isAuthAdmin]
                    }
                },
                '/search': {
                    get: {
                        func: 'search',
                        middleware: [isAuthAdmin],
                    }
                },
                '/search/:text': {
                    get: {
                        func: 'search',
                        middleware: [isAuthAdmin],
                    }
                },
                '/:slug': {
                    get: {
                        func: 'findBySlug',
                    }

                }
            },

        }
        this.options = _.merge({}, this.defaultOptions, opts)
        this.router = new Router()

        this.init()
    }
    init() {
        const routes = this.options.routes
        const paths = Object.keys(routes)
        paths.forEach(path => {
            const methods = routes[path]
            const methodsItems = Object.keys(routes[path] || {})
            methodsItems.forEach(method => {
                const item = methods[method]

                if (item.disabled) return
                let middleware = item.middleware
                if (!middleware || middleware.includes(null)) middleware = []
                let handler = (...args) => this.controller[item.func](...args)
                if (typeof item.func !== 'string') {
                    handler = (...args) => item.func(...args)
                }
                try {
                    this.router[method](path, middleware, handler)

                } catch (err) {
                    console.log('error in routing apply', err)
                }
            })
        })
    }

    get(...opts) {
        this._add('get', ...opts)
    }
    post(...opts) {
        this._add('post', ...opts)
    }
    _add(method, ...opts) {
        this.router[method](...opts)
    }
    getRouter() {
        return this.router
    }
}