var express = require('express');
var router = express.Router();
const users= require('../controller/user.js')
/* GET users listing. */
router.post('/register', users.createProfile)
 
router.post('/login', users.login);
router.post('/forgot_password', users.forgotPassword)
module.exports = router;