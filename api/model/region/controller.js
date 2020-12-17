const Controller = require('../../lib/controller')
const regionFacade = require('./facade')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class RegionController extends Controller {
    async findAll(req, res, next) {
        try {
            const regions = await this.facade.findAll()
            if (!regions) throw new AppError(404)

            const items = await this.initItems(regions, {req})
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
    async defineRegion(req, res, next) {
        try {
            let code = req.headers['cf-ipcountry']
            let country = req.query.country
            if (country) {
                code = country
            }
            console.log('country code', code)
            let region = await this.facade.defineRegion(code)
            if (region) {
                region = region.toLowerCase()
            } else {
                region = req.settings.region.slug
            }

            console.log('define', region)
            res.json({ region })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = new RegionController(regionFacade, Modification)
