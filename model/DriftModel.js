/*
* Created by yongxing on 2018-06-13 17:57
*/
const BaseModel = require('./BaseModel');

class DriftModel extends BaseModel{
    /*
    * 创建一个漂流瓶
    * */
    create(param,callback){
        let sql = 'insert into '+this.baseDb+'pintu (col,row,remark,img,nickName,avatarUrl) values (?,?,?,?,?,?)',
            option = [param.col,param.row,param.remark,param.img,param.nickName,param.avatarUrl];
        this.execSql({sql,option},callback)
    }

    /*
    * 获取可捞取拼图数量
    * */
    count(callback){
        let sql = 'select count(*) as count from '+this.baseDb+'pintu where status = 0';
        this.execSql({sql},callback)
    }

    /*
    * 随机捞取一个拼图
    * */
    get(random,callback){
        let sql = 'select * from '+this.baseDb+'pintu where status=0 limit '+random+',1';
        this.execSql({sql},(err,row)=>{
            callback(err,row)
        })
    }
}
module.exports = DriftModel;