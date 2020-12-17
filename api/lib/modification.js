const Facade = require('./facade')
class Modification {
    constructor(item, options = {}) {
        this.options = options
        if (!item) {
            this.item = {}
            return this
        }
        if (item._doc) {
            this.item = item._doc
            this.mongooseItem = item
        } else {
            this.item = item
        }
        this.req = options.req
        if (this.req) {
            // this.region = this.req.request.region || {}
            // this.defaultRegion = this.req.settings.region || {}
        }

    }


    async init() {
    }
    full() {
        return this.item
    }
    toJSON() {
        return this.item
    }
    toINFO() {
        return this.toJSON()
    }
    toFULL() {
        return this.toINFO()
    }
    toADMIN() {
        return this.toJSON()
    }
    toString() {
        return this.toJSON()
    }
}
Modification._getType = function (instance, type) {
    if (type === 'info') {
        return instance.toINFO()
    }
    if (type === 'full') {
        return instance.toFULL()
    }
    if (type === 'admin') {
        return instance.toADMIN()
    }
    return instance.toJSON()
}
Modification.initItems = async function (items, type, opts) {
    const resolvers = items.map(async item => {
        const instance = new this(item, opts)
        try {
            await instance.init(type)
        } catch (err) {
            console.log(err)
            return 
        }
        return Modification._getType(instance, type)
    })
    const result = await Promise.all(resolvers)
    return result
}
Modification.initItem = async function (item, type, opts) {
    const instance = new this(item, opts)
    await instance.init(type)
    const result = Modification._getType(instance, type)
    return result
}

module.exports = Modification