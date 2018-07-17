const util = require("util");
const winston = require("winston");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

var sendEmail = function (options, callback) {
    let transporter = nodemailer.createTransport(smtpTransport({
        host: options.host,
        secure: options.secure,
        port: options.port,
        auth: {
            user: options.user,
            pass: options.pass
        }
    }));
    transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text
    }, function (err) {
        callback(err);
    });
};

var NodeMailer = winston.transports.NodeMailer = function (options) {
    options = options || {};
    if (!options.to) {
        console.error('NodeMailer requires to property');
        return callback(null, true);
    }
    this.name = options.name || 'nodemailer';
    this.host = options.host;
    this.secure = options.secure;
    this.port = options.port;
    this.user = options.user;
    this.pass = options.pass;
    this.from = options.from;
    this.to = options.to;
    this.subject = options.subject;
    this.text = '';
    this.level = options.level || 'error';
    this.silent = options.silent || false;
    this.handleExceptions = options.handleExceptions || true;
    this.humanReadableUnhandledException = options.humanReadableUnhandledException || true;
    this.json = options.json || false
};

util.inherits(NodeMailer, winston.Transport);

NodeMailer.prototype.log = function (level, msg, meta, callback) {
    var self = this;
    if (self.silent) {
        return callback(null, true);
    }
    self.text = util.inspect({level: level, message: msg, meta: meta}, {depth: 6});
    sendEmail(self, function (err) {
        if (err) {
            console.error(err);
        }
        callback(null, true);
    });
};

module.exports = NodeMailer;
