var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getHome);

router.get('/term/:title', indexController.getTerm);

router.post('/term/:title', indexController.postTerm);

module.exports = router;
