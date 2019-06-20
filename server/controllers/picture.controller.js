const mongoose = require('mongoose');

let Picture = mongoose.model('Picture');

module.exports.createImage = (req, res, next) => {
    console.log('req file => ', req.file)
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.filename.split('.')[0];
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }

    res.render('/createArticle', { status: uploadStatus, filename: `Name Of File: ${filename}` });

}
