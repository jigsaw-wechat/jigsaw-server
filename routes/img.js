/*
* 图片操作相关路由
*
* */
const express = require('express');
const router = express.Router();

// 上传
router.post('/upload', (req,res,next)=>{

});

// 删除
router.post('/delete', (req,res,next)=>{
    let path = req.body.path;

});

module.exports = router;