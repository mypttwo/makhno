'use strict'

let express = require('express');
let _express = express();
let cors = require('cors');
let http = require('http');


let userController = require('./controllers/user-controller');

_express.use(cors());
_express.use('/user', userController);


let app = http.createServer(_express);



module.exports = app;
