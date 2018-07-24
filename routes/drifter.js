/*
* Created by yongxing on 2018-06-13 15:03
* 漂流拼图相关路由
*/
const express = require('express');
const router = express.Router();
const DriftModel = require('../model/DriftModel');

const config = require('../config/config').getInstance().config;
const logger = config.logger;

const async = require('async');

// 创建一个漂流拼图
router.post('/create',(req,res,next)=>{
    let driftInfo = req.body;
    console.log('创建一个漂流拼图',driftInfo);
    let driftModel = new DriftModel();
    driftModel.create(driftInfo,(err,rows)=>{
        let obj = {};
        if(err){
            logger.error(err);
            obj.code = 500;
            obj.msg = err;
        }else{
            obj.code = 200;
        }
        res.json(obj)
    })
});

// 捞起一个漂流拼图
router.get('/salvage',(req,res,next)=>{
    console.log('捞起一个漂流拼图');
    let driftModel = new DriftModel();

    async.auto({
        // 获取漂流拼图总数
        count: cb=>{
            driftModel.count((err,row)=>{
                if(!err){
                    let total = row[0].count;
                    cb(null,total)
                }else{
                    cb(err)
                }
            })
        },
        // 随机捞取一个拼图
        drift:['count',(cb,result)=>{
            let total = result.count;
            console.log('漂流拼图总数',total);
            let random = Math.floor(Math.random()*total);
            driftModel.get(random,cb)
        }]
    },(err,results)=>{
        console.log('捞起结果',err,results);
        let obj = {};
        if(err){
            logger.error(err);
            obj.code = 500;
            obj.msg = err;
        }else{
            obj.code = 200;
            obj.data = results.drift[0];
        }
        res.json(obj)
    })
});

module.exports = router;