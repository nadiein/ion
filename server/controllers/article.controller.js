const mongoose = require('mongoose');
const fs = require('fs');
const _ = require('lodash');

let Article = mongoose.model('Article');

module.exports.create = (req, res, next) => {
    res.send(req.body)
    console.log('Article req file => ', req.body)
    console.log('Article req file => ', req.file)

}