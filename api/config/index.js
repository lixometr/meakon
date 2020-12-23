const path = require('path')
const errorCodes = require('./errorCodes')
let globalConfig

if (process.env.NODE_ENV === 'production') {
  globalConfig = require('../../common/config/config.production')
} else {
  globalConfig = require('../../common/config/config.development')

}
let baseName = globalConfig.api.baseUrl
const config = {
  environment: process.env.NODE_ENV || 'development',
  baseName,
  mail: {
    login: 'test',
    password: 'test',
    host: 'testhost'
  },
  unitpay: {
    SECRET_KEY: process.env.UNITPAY_SECRET_KEY,
    PUBLIC_KEY: process.env.UNITPAY_PUBLIC_KEY
  },
  payop: {
    SECRET_KEY: process.env.PAYOP_PRIVATE_KEY,
    PUBLIC_KEY: process.env.PAYOP_PUBLIC_KEY
  },
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/' + globalConfig.dbName
  },
  adminEmail: globalConfig.adminEmail,
  perPage: 1,
  JWT_SECRET: 'jwt_very_secret_key',
  JWT_ADMIN_SECRET: 'jwt_very_secret_key',
  JWT_EXPIRES: 100 * 60 * 60 * 24,
  JWT_EXPIRES_LONG: 2 * 60 * 60 * 24,
  JWT_ADMIN_EXPIRES: 5 * 60 * 60 * 24,
  IMAGE_FOLDER: path.join(__dirname, '..', '..', 'uploads'),
  // langDir: path.join(__dirname, '..', 'lang'),
  errorCodes
}

// Поменять на поддобмен cdn
config.IMAGE_PATH = `${config.baseName}/public/`
config.FILE_PATH = `${config.baseName}/public/`
if (config.environment === 'development') {
  config.appUrl = 'http://localhost:3000'
} else {
  config.appUrl = 'https://lootchampion.com'
}

module.exports = config
