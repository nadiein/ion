const mongoose = require('mongoose');
const fs = require('fs');
const _ = require('lodash');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, fn){
        fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
    }
}); 
const upload = multer({
    storage: storage,
    limits: { fileSize:200000 },
    fileFilter: function(req, file, callback){
        validateFile(file, callback);
    }
}).single('image');

let Article = mongoose.model('Article');

module.exports.create = (req, res, next) => {
    upload(req, res, (error) => {
        if (error) {
            return res.end("Error uploading file.");
        } else {
            if (req.file == undefined) {
                return res.end("Error uploading file.");
            } else {
                res.send('Successfully uploaded ' + req.files.length + ' files!');
                /**
                 * Create new record in mongoDB
                 */
                // var fullPath = "files/" + req.file.filename;
                // var document = {
                //     path:     fullPath, 
                //     caption:   req.body.caption
                // };

                // var photo = new Photo(document); 
                // photo.save(function(error){
                // if(error){ 
                //     throw error;
                // } 
                // res.redirect('/?msg=1');
                // });
            }
        }
    });

    // res.send(req.body)
    // console.log('Article req file => ', req.body)
    // let article = new Article();
    // article.title = req.body.title;
    // article.description = req.body.description;
    // article.image = req.body.image;

    // upload(req,res, (err) => {
    //     console.log('Article req file => ', req.files)
    //     if(err) {
    //         return res.end("Error uploading file.");
    //     }
    //     res.send('Successfully uploaded ' + req.files.length + ' files!');
    // });

    // article.save((err, doc) => {
    //     if (!err) {
    //         res.send(doc);
    //     } else {
            
    //     }

    // });
}