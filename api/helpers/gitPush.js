const { exec } = require("child_process");
module.exports = function (req, res, next) {
    console.log('got git', req.body)
    exec('cd /var/www/meakon && git pull origin1 master && sh ./run.sh')
}