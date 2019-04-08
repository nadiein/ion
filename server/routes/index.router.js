const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlArticle = require('../controllers/article.controller');
const jwtHelper = require('../config/jwtHelper');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage });

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/updateProfile', ctrlUser.updateProfile);

router.post('/createArticle', upload.any(), ctrlArticle.create);

module.exports = router;
