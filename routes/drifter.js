/*
* Created by yongxing on 2018-06-13 15:03
* 漂流拼图相关路由
*/
const express = require('express');
const router = express.Router();

// 创建一个漂流拼图
router.post('/create',(req,res,next)=>{
    let driftInfo = req.body;
    console.log('创建一个漂流拼图',driftInfo);

});

// 捞起一个漂流拼图
router.get('/salvage',(req,res,next)=>{

});

module.exports = router;