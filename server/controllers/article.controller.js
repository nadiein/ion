const mongoose = require('mongoose');

let Article = mongoose.model('Article');

module.exports.createArticle = (req, res, next) => {

    if (req.body) {
        var article = new Article();

        article.id = `${Math.floor((Math.random() * Math.pow(3,Math.pow(3,3))) + 1)}`;
        article.title = req.body.title;
        article.description = req.body.description;
        // Transform requsted file object to buffer to store in db
        let buffer = Buffer.from(JSON.stringify(req.files['image'], null, '\t'));

        article.image.id = req.files['image'][0]['filename'].split('.')[0];
        article.image.data = buffer;
        article.image.contentType = req.files['image'][0]['mimetype'];
        article.image.path = req.files['image'][0]['filename'];
        article.save(function(err,docs) {
            if (err) {
                console.log(err);
            }
            res.json(docs);
        });
    }
    res.render('/articles', { status: uploadStatus, filename: `Name Of File: ${article}` });

}

module.exports.getArticles = (req, res, next) => {

    Article.find({}, ['id', 'title', 'description', 'image.path']).lean().exec(function (err, articles) {
        res.send(JSON.stringify(articles, null, '\t'));
    });
}

module.exports.getArticle = (req, res, next) => {
    Article.find({id: req.params.id}, ['id', 'title', 'description', 'image.path']).lean().exec(function (err, article) {
        res.send(JSON.stringify(article, null, '\t'));
    });
}

module.exports.updateArticle = (req, res, next) => {
    // Article.find({id: req.params.id}, ['id', 'title', 'description', 'image.path']).lean().exec(function (err, article) {
    //     res.send(JSON.stringify(article, null, '\t'));
    // });
}

module.exports.deleteArticle = (req, res, next) => {
    Article.find({id: req.params.id}).remove().exec(function (err) {
        if (!err) {
            res.send('DELETED');
        } else {
            res.send(err);
        }
    });
}

// TODO: edit article
