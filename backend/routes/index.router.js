var express = require('express');
var router = express.Router();
const userRoutes = require('./user.router');
const errorHandler = require('../middleware/errorHandler');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello Worlds')
});

router.use('/v1/user', userRoutes, errorHandler)


module.exports = router;
