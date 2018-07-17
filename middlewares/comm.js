const crypto = require('crypto');
const pool = require('../lib/mysql');
let config = require('../config/config').getInstance().config;
const logger = config.logger;

//md5加密
let md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

// 格式2位数字
let format = function (param) {
    return (parseInt(param) < 10) ? '0' + param : param;
};

// 秒转时间
let second2Time = function (second) {
    let s = parseInt(second);
    let t = '00:00:00';
    if (s > 0) {
        let hour = parseInt(s / 3600);
        let min = parseInt(s / 60) % 60;
        let sec = s % 60;
        t = '' + format(hour) + ':' + format(min) + ':' + format(sec);
    }
    return t;
};

//执行sql语句 param:{sql:'',option:''}
let execSql = function (db, param, cb) {
    let mysqlService = config.db[db];
    if (!mysqlService) {
        return cb(new Error('config.js没有配置数据库名与服务器对应关系'));
    }
    let poolSer = pool[mysqlService];
    if (!poolSer) {
        return cb(new Error('mysql.js没有导出连接池'));
    }
    poolSer.getConnection(function (err, connection) {
        if (err) {
            return cb(err);
        }
        if (param.option) {
            connection.query(param.sql, param.option, function (err, row) {
                connection.release();
                cb(err, row);
            });
        } else {
            connection.query(param.sql, function (err, row) {
                connection.release();
                cb(err, row);
            });
        }
    });
};

//获取poolSer 连接池
let getPoolSer = function (db, cb) {
    let mysqlService = config.db[db];
    if (!mysqlService) {
        return cb(new Error('config.js没有配置数据库名与服务器对应关系'));
    }
    let poolSer = pool[mysqlService];
    if (!poolSer) {
        return cb(new Error('mysql.js没有导出连接池'));
    } else {
        return cb(null, poolSer);
    }
};

//导出
module.exports = {
    md5: md5,
    format:format,
    second2Time:second2Time,
    execSql: execSql,
    getPoolSer: getPoolSer,
};