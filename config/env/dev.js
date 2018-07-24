
const path = require('path');

module.exports = {
    port: 3086,                          // 程序运行的端口
    proxy: 'loopback, 127.0.0.1',        //信任的代理ip
    debug: true,                         // debug 为 true 时，用于本地调试，具体错误展示
    tokenSecret: 'shhdfd-hhhhardfedddsecsdds-infeng',
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '1234',
        database: ''
    },
    baseDb: 'wxPintu',
    db: {
        'wxPintu': 'mysql',
    },
    host:'http://192.168.50.18:3086'
};
