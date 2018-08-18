'use strict'

let logger = require('./logger');
let db = require('./config').db;
let mongoose = require('mongoose');

mongoose.connect(db)
.then(() => {
    logger.info(`Connected to db : ${db}`);
}).catch((error) => {
    logger.error(`Could not connect to db : ${db} ${error} Terminating now...`);
    process.exit(1);
});

module.exports = mongoose;