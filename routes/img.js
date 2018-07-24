/*
* 图片操作相关路由
*
* */
const express = require('express');
const router = express.Router();
const config = require('../config/config').getInstance().config;
const logger = config.logger;

const multer  = require('multer');
//配置diskStorage来控制文件存储的位置以及文件名字等
let storage = multer.diskStorage({
    //确定图片存储的位置
    destination: function (req, file, cb){
        cb(null, './public/img')
    },
    //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
    filename: function (req, file, cb){
        cb(null, 'jigsaw' + Date.now() + '.png')
    }
});
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
let upload = multer({storage: storage});

const fs = require('fs');

// 上传
router.post('/upload', upload.single('jigsaw'), (req,res,next)=>{
    console.log('上传',req.file);
    let url = config.host + '/img/' + req.file.filename;
    res.send(url)
});

// 删除
router.post('/delete', (req,res,next)=>{
    let url = req.body.path;

    let path = url.split('/img/')[1];
    path = './public/img/' + path;
    console.log('删除图片',path);
    fs.unlink(path,(err)=>{
        if(err){
            logger.error(err);
            res.json({code: 500})
        }else{
            res.json({code: 200})
        }
    })
});

module.exports = router;