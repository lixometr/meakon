const regionFacade = require('../model/region/facade')
const settingsFacade = require('../model/settings/facade')
module.exports = () => async (req, res, next) => {
  req.settings = {};
  
  
  // const DEFAULT_LANGUAGE_ID = '5f3cf76fa1e14a3b8c2caca5'
  // const DEFAULT_CURRENCY_ID = '5f525bfc4dd9022ed8bbfd0b'
  const region = await settingsFacade.findByName('region')
  const DEFAULT_REGION_ID = region ? region._id : null
  try {
    req.settings.region = await regionFacade.findById(DEFAULT_REGION_ID)
    next()
  } catch (err) {
    next()
  }

}