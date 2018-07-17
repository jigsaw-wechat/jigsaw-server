const shortid = require('shortid');
const path = require('path');
const multer = require('multer');
const mkdirp = require('mkdirp');
let config = require('../config/config').getInstance().config;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let now = new Date();
        let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
        let relativeDir = config.upload.rootPath + now.getFullYear() + '/' + date + '/';
        let destination = path.normalize(config.upload.path + relativeDir);
        mkdirp.sync(destination);
        file.relativeDir = relativeDir;
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        let filename = shortid.generate() + path.extname(file.originalname);
        cb(null, filename);
    }
});

let upload = multer({storage: storage});

//导出函数
module.exports = upload;