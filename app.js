let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

const comm = require('./middlewares/comm');

let config = require('./config/config').getInstance().config;
let logg = config.logger;

let router = require('./routes/index');
let app = express();

const jwt = require('express-jwt');
// app.use(jwt({secret: config.tokenSecret})
//     .unless({path: ['/', '/user/login','/img/upload','/img/download','/img/delete']}));  // 屏蔽不需要验证的路由

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router(app);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    logg.error(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    if (err.name === 'UnauthorizedError') {
        res.status(401);
    }
    if (config.debug) {
        res.json({code: 500, msg: err.message});
    } else {
        res.json({code: 400, msg: err.message});
    }
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(config.port, function () {
        console.log('listening on port: ' + config.port);
    });
}

module.exports = app;
