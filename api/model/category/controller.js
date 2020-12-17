const Controller = require('../../lib/controller')
const _ = require('lodash')
const AppError = require('../../helpers/error')
const Modification = require('./modification')
const categoryFacade = require('./facade')
const productFacade = require('../product/facade')

class CategoryController extends Controller {
    async findBySlug(req, res, next) {
        try {
            const categoryPath = req.params[0]
            const item = await this.facade.findBySlug(categoryPath)
            if (!item) throw new AppError(404)
            req.params.id = item._id.toString()
            await this.findById(req, res, next)
        } catch (err) {
            next(err)
        }
    }
    async getParentList(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params[0])
            if (!category) throw new AppError(404)
            const result = await this.facade.findParentsById(category._id)
            const items = await this.initItems(result, { req })

            res.json(items)
        } catch (err) {
            next(err)
        }
    }
    async getChildren(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params[0])
            if (!category) throw new AppError(404)
            const result = await this.facade.findChildrenById(category._id)
            const items = await this.initItems(result, { req })
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @interface CategoryListItem {
     *  category: Category,
     *  children: [CategoryListItem]
     * }
     * @returns {
     *  CategoryListItem
     * }
     */
    async getChildrenAll(req, res, next) {
        // return res.json({noexist: true})
        try {
            const category = await this.facade.findBySlug(req.params[0])
            if (!category) throw new AppError(404)
            const result = await this.facade.findAllChildrenById(category._id)
            const initRecursive = async (obj) => {
                const instanse = await Modification.initItem(obj.category, 'info', { req })
                obj.category = instanse
                const resolvers = obj.children.map(async child => {
                    return await initRecursive(child)
                })
                obj.children = await Promise.all(resolvers)
                return {
                    category: obj.category,
                    children: obj.children
                }
            }
            const cloned = _.cloneDeep(result)

            const translatedCategories = initRecursive(cloned)
            res.json(translatedCategories)
        } catch (err) {
            next(err)
        }
    }

    async getPrimaryCategories(req, res, next) {
        try {
            const result = await this.facade.findWithoutParent()
            const items = await this.initItems(result, {req})
            

            res.json(items)
        } catch (err) {
            next(err)
        }
    }

    async hasDateProducts(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params[0])
            // const children = await this.facade.findChildrenById(category._id)
            // const cnt = 
            const finder = async catId => {
                return await productFacade.find({
                    category: catId,
                    date: { $exists: true, $not: { $size: 0 } }
                })
            }
            const products = await productFacade.findInSublimeCategories(category._id, finder)
            const cnt = products.length
            if (cnt > 0) {
                res.json(true)
                return
            }
            res.json(false)
            // categories.map(async category => {
            //     const catId = category._id
            //     const cnt = await productFacade.find({
            //         category: catId,
            //         date: { $exists: true, $not: { $size: 0 } }
            //     }).countDocuments()
            //     return cnt
            //     // this.facade.Model.models('')
            // })
        } catch (err) {
            next(err)
        }
    }


}

module.exports = new CategoryController(categoryFacade, Modification)