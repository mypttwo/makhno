'use strict'

const winston = require('winston');
require('winston-daily-rotate-file');

const fs = require('fs');
var dir = './logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var transport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/server-%DATE%.log',
  dirname:'logs/',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});


var logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    transport
  ]
});

module.exports = logger;