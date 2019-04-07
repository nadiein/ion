const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlArticle = require('../controllers/article.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/updateProfile', ctrlUser.updateProfile);

router.post('/createArticle', ctrlArticle.create);

module.exports = router;
