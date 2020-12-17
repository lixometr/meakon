const mongoose = require('mongoose')
const _ = require('lodash')
const config = require('../config')
// const Modification = require('./modification')
class Facade {
  constructor(name, schema) {
    this.Model = mongoose.model(name, schema)
  }

  create(body) {
    const model = new this.Model(body)
    return model.save()
  }
  async search(text) {
    const items = await this.Model.find({
      name: RegExp(text, 'ig')
    })
    return items
  }
  find(...args) {
    return this.Model
      .find(...args)

  }
  async findAll(options = {}) {
    const result = await this.Model.find({}, null, options)
    return result
  }
  async findWithPagination({ query = {}, perPage, nowPage = 1, sort = {} }) {
    nowPage = parseInt(nowPage)
    if (isNaN(nowPage)) {
      nowPage = 1
    }
    perPage = parseInt(perPage)
    if (isNaN(perPage)) {
      perPage = config.perPage
    }
    if (perPage < 0) {
      const items = await this.Model.find(query, null)
      const total = await this.Model.find(query, null).countDocuments()
      return { items, total }
    }
    const items = await this.Model.find(query, null, { skip: (nowPage - 1) * perPage, sort, limit: perPage })
    const total = await this.Model.find(query, null).countDocuments()
    let totalPages = Math.ceil(total / perPage)

    return {
      items,
      info: {
        totalItems: total,
        totalPages,
        nowPage: nowPage,
      }
    }
  }
  async paginate({ items, perPage, nowPage }) {
    nowPage = parseInt(nowPage)
    if (isNaN(nowPage)) {
      nowPage = 1
    }
    perPage = parseInt(perPage)
    if (isNaN(perPage)) {
      perPage = config.perPage
    }

    let totalPages = Math.ceil(items.length / perPage)
    let newItems = items
    if (perPage < 0) {
      newItems = items
      totalPages = 1
    } else {
      newItems = items.slice((nowPage - 1) * perPage, nowPage * perPage)
    }

    return {
      info: {
        totalItems: items.length,
        totalPages,
        nowPage: nowPage,
      },
      items: newItems
    }
  }
  findOne(...args) {
    return this.Model
      .findOne(...args)

  }

  findById(id) {
    return this.Model
      .findById(id)

  }

  async findBySlug(slug) {
    const item = await this.Model.findOne({ slug })
    return item
  }
  async findByName(name) {
    const item = await this.Model.findOne({ name })
    return item
  }
  update(...args) {
    return this.Model
      .updateOne(...args)

  }
  async updateById(id, data) {
    const result = await this.Model.findOneAndUpdate({ _id: id }, data)
    return result
  }
  async beforeRemove(id) {
    if (!this.relations) return
    const resolvers = this.relations.map(async rel => {
      const model = this.Model.model(rel.model)
      let result;
      if (rel.resolver) {
        result = await rel.resolver({ model, id })
      } else {
        result = await model.updateMany({}, { $pull: { [rel.field]: id } }, { multi: true })

      }

    })
    await Promise.all(resolvers)
  }
  async deleteById(id) {
    await this.beforeRemove(id)
    return this.Model.findOneAndDelete({ _id: id })
  }
  getRegionItem(prices, regionId = '', defaultRegionId = '') {
    if (!prices) return 0
    let priceItem = prices.find(p => p.region.toString() === regionId.toString())
    if (!priceItem) {
      priceItem = prices.find(p => p.region.toString() === defaultRegionId.toString())
      if (!priceItem) priceItem = {}
    }
    return priceItem ? priceItem.value : 0
  }

}

module.exports = Facade
