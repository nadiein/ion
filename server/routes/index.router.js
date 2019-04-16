const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlArticle = require('../controllers/article.controller');
const jwtHelper = require('../config/jwtHelper');
const multer = require('multer');
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/updateProfile', ctrlUser.updateProfile);

router.post('/createArticle', upload.single('image'), ctrlArticle.create);

module.exports = router;
