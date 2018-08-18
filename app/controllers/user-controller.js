'use strict'

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let User = require('../models/user').User;

module.exports = router;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('', (req, res) => {
    if (req.query.address) {
        User.find({ ethAddress: req.query.address }).then((data) => {
            if (!data.length) {
                return res.status(404).send();
            }
            return res.status(200).send(data[0]);
        }).catch((error) => {
            logger.error('error' ,error);
            return res.status(500).send(error);
        })
    } else {
        logger.error('No Address sent as query');
        return res.status(400).send('Error');
    }
});

router.post('', (req, res) => {
    if (!req.body.ethAddress) {
        return res.status(405).send();
    } else {
        let newUser = {
            nonce: Math.floor(Math.random() * 1000000),
            ethAddress: req.body.ethAddress
        }
        User.create(newUser).then((data) => {
            logger.info(data);
            return res.status(200).send(data);
        }).catch((error) => {
            logger.error('Error while creating user', error);
            return res.status(500).send('Server Error');
        });
    }
})

