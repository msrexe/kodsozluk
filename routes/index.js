var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/:page?', indexController.getHome);

router.get('/term/:title/:page?', indexController.getTerm);

router.post('/term/:title/:page?', indexController.postTerm);

module.exports = router;
