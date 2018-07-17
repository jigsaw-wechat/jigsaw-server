/*
* Created by yongxing on 2018-06-13 17:57
*/
const Comm = require('../middlewares/comm');
const config = require('../config/config').getInstance().config;
class BaseModel{
    /*
    * 构造
    * */
    constructor(){
        //基础数据库
        this.baseDb = config.baseDb + '.';
    }

    /**
     * 执行sql
     * @param param
     * @param callback
     */
    execSql(param, callback) {
        Comm.execSql(config.baseDb, param, callback);
    }
}
module.exports = BaseModel;