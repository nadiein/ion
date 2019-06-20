const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlArticle = require('../controllers/article.controller');
const ctrlPicture = require('../controllers/picture.controller');
const jwtHelper = require('../config/jwtHelper');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Math.floor((Math.random() * Math.pow(3,Math.pow(3,3))) + 1)}.${file.originalname.split(".")[1]}`); // modified here  or user file.mimetype
    }
});
const upload = multer({ storage: storage });

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/updateProfile', ctrlUser.updateProfile);

router.post('/createArticle', upload.fields([{ name: 'image', maxCount: 1 }]), ctrlArticle.createImage);
router.post('/pictures', upload.fields([{ name: 'image', maxCount: 1 }]), ctrlPicture.createImage);

module.exports = router;
