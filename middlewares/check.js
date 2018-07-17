let config = require('../config/config').getInstance().config;
const comm = require('../middlewares/comm');
const logger = config.logger;


let checkLogin = function (req, res, next) {
    let token = req.user;
    console.log(`token: ${token}`);

    next();
};

//导出函数
module.exports = {
    checkLogin: checkLogin
};