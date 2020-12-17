const Facade = require('../../lib/facade')
const categorySchema = require('./schema')
class CategoryFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.relations = [
            {
                model: "Product",
                async resolver({ id, model }) {
                    await model.updateMany({ category: id }, { $pull: { category: id } }, { multi: true })
                }
            },
            {
                model: "Category",
                async resolver({ id, model }) {
                    await model.updateMany({ parent: id }, { parent: null }, { multi: true })
                }
            },

        ]
    }
    async findBySlug(slugPath) {
        let path = slugPath.split('/')
        path = path.filter(p => !!p)
        let nowCategory = null
        for (let i = 0; i < path.length; i++) {
            const cSlug = path[i]
            const item = await this.Model.findOne({ slug: cSlug, parent: nowCategory && nowCategory._id.toString() })
            nowCategory = item
        }
        return nowCategory
    }
    async findParentsById(id) {
        const findParent = async (startId, arr) => {
            if (!arr) arr = []
            const category = await this.Model.findById(startId)
            if (category) {
                arr.unshift(category)
            }

            if (category.parent) {
                if (category._id.toString() === category.parent.toString()) {
                    return arr
                }
                await findParent(category.parent, arr)
            }
            return arr
        }
        const arrayOfParents = await findParent(id)
        return arrayOfParents
    }
    async findChildrenById(id) {
        const arrayOfChildren = await this.Model.find({ parent: id })

        return arrayOfChildren
    }
    async findAllChildrenById(id) {
        const findChildren = async (startId, result) => {
            if (!result) result = {}
            const children = await this.findChildrenById(startId)
            const cat = await this.findById(startId)
            result.category = cat.toJSON()
            result.children = children.map(child => ({ category: child, children: [] }))
            for (let i = 0; i < children.length; i++) {
                const child = children[i]
                await findChildren(child._id, result.children[i])
            }
            return result
        }
        const childrenList = await findChildren(id)
        return childrenList
    }
    async findWithoutParent() {
        const items = await this.Model.find({ parent: null })
        return items;
    }

}

module.exports = new CategoryFacade('Category', categorySchema)
