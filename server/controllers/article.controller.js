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
        article.save((err, docs) => {
            if (err) {
                console.log(err);
            }
            res.json(docs);
        });
    }
    res.render('/articles', { status: uploadStatus, filename: `Name Of File: ${article}` });

}

module.exports.getArticles = (req, res, next) => {

    Article.find({}, ['id', 'title', 'description', 'image.path', 'created', 'updated']).lean().exec((err, articles) => {
        res.send(JSON.stringify(articles, null, '\t'));
    });
}

module.exports.getArticle = (req, res, next) => {
    Article.find({id: req.params.id}, ['id', 'title', 'description', 'image.path', 'created', 'updated']).lean().exec((err, article) => {
        res.send(JSON.stringify(article, null, '\t'));
    });
}

module.exports.updateArticle = (req, res, next) => {
    // console.log('req => ', req);
    // Move to separate class
    let articleDto = {};
    // If req body contains elements > 1 then article was updated and push updated date to db
    if (Object.keys(req.body).length > 0) articleDto.updated = new Date();
    // push in additional dto class by one needs in cases when was updated only one field
    articleDto.id = req.body.id;
    articleDto.title = req.body.title;
    articleDto.description = req.body.description;

    if (Object.entries(req.files).length) {
        console.log(1)
        let buffer = Buffer.from(JSON.stringify(req.files['image'], null, '\t'));
        articleDto.image = {};
        articleDto.image['id'] = req.files['image'][0]['filename'].split('.')[0];
        articleDto.image['data'] = buffer;
        articleDto.image['contentType'] = req.files['image'][0]['mimetype'];
        articleDto.image['path'] = req.files['image'][0]['filename'];
    }

    articleDto = { $set: articleDto };

    Article.findOneAndUpdate({ id: req.body.id }, articleDto, {'fields': ['id', 'title', 'description', 'image.path', 'created', 'updated'], new: true, upsert: true, setDefaultsOnInsert: true}, (err, article) => {
        if (err) { return res.status(500).send(err); }
        res.send(JSON.stringify(article, null, '\t'));
    });

}

module.exports.deleteArticle = (req, res, next) => {
    Article.find({id: req.params.id}).remove().exec((err, article) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Article successfully deleted",
            id: article.id
        };
        return res.status(200).send(response);
    });
}
