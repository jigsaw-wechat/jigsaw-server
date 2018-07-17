let config = require('../config/config').getInstance().config;
let logger = config.logger;

let mysql = require('mysql');
let pool = mysql.createPool({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password
});

//尝试连接是否成功
pool.getConnection(function (err, connection) {
    if (err) {
        console.log('connect mysql err');
        console.log(err);
        logger.log(err);
        // process.exit(1);
        return;
    }
    console.log('connect mysql ok.');
    connection.release();
});

module.exports = {
    'mysql': pool
}