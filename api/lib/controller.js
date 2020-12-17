const AppError = require("../helpers/error")
const config = require('../config')
class Controller {
  constructor(facade, modification, event) {
    this.facade = facade
    this.Modification = modification
    this.Event = event
  }

  async create(req, res, next) {
    try {
      const item = await this.facade.create(req.body)
      res.status(201).json(item)
    } catch (err) {
      next(err)
    }
  }
  async search(req, res, next) {
    try {
      const searchPhrase = req.params.text
      let items = []
      if (!searchPhrase) {
        this.findAll(req, res, next)
        return
      } else {
        items = await this.facade.search(searchPhrase)
      }
      const resolvers = items.map(async item => {
        const instance = new this.Modification(item, { req })
        await instance.init()
        if (req.adminUser) {
          return instance.toADMIN()
        } else {
          return instance.toINFO()
        }
      })
      const allItems = await Promise.all(resolvers)
      const toSend = await this.facade.paginate({ items: allItems, nowPage: req.query.page, perPage: req.query.per_page })
      res.json(toSend)
    } catch (err) {
      next(err)
    }
  }
  async findAll(req, res, next) {
    try {
      let page = req.query.page

      let perPage = req.query.per_page
      let { items, info } = await this.facade.findWithPagination({ nowPage: page, perPage, sort: { created_at: -1 } })

      const initedItems = await this.initItems(items, { req })

      const toSend = {
        items: initedItems,
        info
      }
      res.json(toSend)
    } catch (err) {
      next(err)
    }
  }
  async initItems(items, opts) {
    let type = opts.req.adminUser ? 'admin' : 'info'
    const result = await this.Modification.initItems(items, type, opts)
    return result


  }

  async findById(req, res, next) {
    try {
      const item = await this.facade.findById(req.params.id)
      if (!item) throw new AppError(404)
      const instance = new this.Modification(item, { req })
      if (req.adminUser) {
        res.json(instance.toADMIN())
        return
      }

      await instance.init('full')
      res.json(instance.toFULL())
    } catch (err) {
      next(err)
    }
  }
  async findBySlug(req, res, next) {
    try {
      const item = await this.facade.findBySlug(req.params.slug)
      if (!item) throw new AppError(404)
      req.params.id = item._id.toString()
      await this.findById(req, res, next)
    } catch (err) {
      next(err)
    }
  }
  async findByName(req, res, next) {
    try {
      const item = await this.facade.findByName(req.params.name)
      if (!item) throw new AppError(404)
      req.params.id = item._id.toString()
      await this.findById(req, res, next)
    } catch (err) {
      next(err)
    }
  }
  async updateById(req, res, next) {
    try {
      const result = await this.facade.updateById(req.params.id, req.body)
      if (result.n < 1) { return res.sendStatus(404) }
      if (result.nModified < 1) { return res.sendStatus(304) }
      res.status(204).json({ ok: true })
    } catch (err) {
      next(err)
    }
  }
  async removeById(req, res, next) {
    try {
      const result = await this.facade.deleteById(req.params.id)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = Controller
