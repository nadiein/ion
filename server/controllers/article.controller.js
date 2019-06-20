const mongoose = require('mongoose');

let Article = mongoose.model('Article');

module.exports.createImage = (req, res, next) => {
    console.log('req body => ', req.body)
    console.log('req file => ', req.files['image'])

    if (req.body) {
        console.log('saving body ...')
        var article = new Article();
        article.id = `${Math.floor((Math.random() * Math.pow(3,Math.pow(3,3))) + 1)}`;
        article.title = req.body.title;
        article.description = req.body.description;
        console.log(req.files['image']);
        console.log(req.files['image'][0]['filename']);
        article.image = req.files['image'][0]['filename'].split('.')[0];
        article.save(function(err,docs) {
            if (err) {
                console.log(err);
            }
            res.json(docs);
        });
    }
    res.render('/createArticle', { status: uploadStatus, filename: `Name Of File: ${article}` });

}
