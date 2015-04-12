var express = require('express');
var router = express.Router();

/* GET pages on non reserved routes. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Terra Charts!',
                        page: 'index' });
});

module.exports = router;
