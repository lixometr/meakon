
export default class Api {
    constructor(routes, request, options) {
        this.routes = routes
        this.request = request
        this.options = options || {}
    }
    $get(...args) {
        return this.send(...args)('$get')

    }
    $post(...args) {
        return this.send(...args)('$post')

    }
    $put(...args) {
        return this.send(...args)('$put')
    }
    $delete(...args) {
        return this.send(...args)('$delete')
    }
    get(...args) {
        return this.send(...args)('get')

    }
    post(...args) {
        return this.send(...args)('post')

    }
    put(...args) {
        return this.send(...args)('put')
    }
    delete(...args) {
        return this.send(...args)('delete')
    }
    send(route, variables, data, options) {
        let theRoute = this._getRoute(route)
        theRoute = this._assignVariables(theRoute, variables)
        theRoute = this._applyQueryString(theRoute)

        return async (method) => {
            try {
                if (process.env.NODE_ENV === 'development' && this.options.log) {
                    console.log(`Request to: ${theRoute}`)
                }
                if (this.options.log) {
                    console.log('send to', theRoute)
                }

                const result = await this.request[method](theRoute, data, options)
                if (process.env.NODE_ENV === 'development' && this.options.log) {
                    console.log(`Received from: ${theRoute}`, result)
                }
                return result;
            } catch (err) {
                if (process.env.NODE_ENV === 'development') {
                    console.log(`Error from: ${theRoute}`, err)
                }
                throw err;
            }

        }
    }
    _getRoute(route) {
        return this.routes[route] || route;
    }
    _queryString() {
        let str = ''
        if (this.options.region) {
            str += `?region=${this.options.region}`
        }
    
        return str
    }
    _applyQueryString(route) {
        return route + this._queryString()
    }
    _assignVariables(route, variables) {
        let theRoute = route;
        if (variables) {
            Object.keys(variables).forEach(key => {
                theRoute = theRoute.replace(`{{${key}}}`, variables[key])
            })
        }
        return theRoute;
    }
}
