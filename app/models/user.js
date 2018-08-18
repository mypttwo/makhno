'use strict'

let mongoose = require('../db');
let isAddress = require('../utils/ethereumAddressValidator');

let userSchema = new mongoose.Schema({
    nonce : {
        type : Number,
        default : () => Math.floor(Math.random() * 1000000),
        required : true
    },
    ethAddress : {
        type : String,
        unique : true,
        index : true,
        validate : {
            validator : (ethAddress) => {
                return isAddress(ethAddress);                
            },
            message : 'Invalid Address'
        }
    },
    name : {
        type : String
    },
    email : {
        type : String
    }
});

mongoose.model('User', userSchema);

module.exports = {
    User : mongoose.model('User'),
    userSchema
}