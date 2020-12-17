const regionFacade = require('../model/region/facade')
const AppError = require('../helpers/error')
module.exports = () => async (req, res, next) => {
    req.request = {};

    try {
       
        const queryRegion = req.query.region
        let region = req.settings.region
        if (queryRegion) {
            const regionBySlug = await regionFacade.findBySlug(queryRegion)
            if (regionBySlug) {
                region = regionBySlug
            }
        }
        req.request.region = region
        next()
    } catch (err) {
        next(err)
    }
}