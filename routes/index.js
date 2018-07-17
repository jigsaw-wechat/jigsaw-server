/*
* zhangyongxing create at 2018-7-11 18:53
* 根路由文件
* */
//路由主入口
module.exports = function (app) {
    // 图片操作相关路由
    app.use('/img', require('./img'));

    // 漂流任务相关路由
    app.use('/drift', require('./drifter'));


    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            next(new Error('请输入正确的网址'));
        }
    });
};
