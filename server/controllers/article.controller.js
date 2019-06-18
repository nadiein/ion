const mongoose = require('mongoose');

let Article = mongoose.model('Article');

module.exports.createImage = (req, res, next) => {
    console.log('req file => ', req)
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.image;
        var uploadStatus = 'File Uploaded Successfully';
        var article = new Article();
        article.id = Math.floor((Math.random() * 1000000) + 1);
        article.title = req.title;
        article.description = req.description;
        article.image = req.image;
        article.save(function(err,docs) {
            if (err) {
                console.log(err);
            }
            res.json(docs);
        });
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }

    res.render('/createArticle', { status: uploadStatus, filename: `Name Of File: ${filename}` });

}

// module.exports.createForm = (req, res, next) => {
//     console.log('req body => ', req)
//     console.log('req title => ', req.title)
//     console.log('req image => ', req.image)
//     var article = new Article();

//     if (req.body) {
//         console.log('Uploading form...');
//     }

// }