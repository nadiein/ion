const mongoose = require('mongoose');
const fs = require('fs');
const _ = require('lodash');

let Article = mongoose.model('Article');

module.exports.create = (req, res, next) => {

        console.log('Article req file => ', req.file)
        console.log('Article req files => ', req.files)

}