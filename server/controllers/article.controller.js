const mongoose = require('mongoose');
const _ = require('lodash');

let Article = mongoose.model('Article');

module.exports.create = (req, res, next) => {
    let article = new Article();
    article.title = req.body.title;
    article.description = req.body.description;
    article.image = req.body.image;
    article.created = req.body.created;
    article.updated = req.body.updated;

    console.log('Article req => ', req.body)
}