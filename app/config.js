'use strict'

require('dotenv').config();

let db = process.env.DB;
let port = process.env.PORT;
let secret = process.env.SECRET;

module.exports = {
    db,
    port,
    secret
}
