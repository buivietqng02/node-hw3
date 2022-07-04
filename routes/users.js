var express = require('express');
const upload= require('../controller/multer')
var router = express.Router();
const users= require('../controller/user.js')
const {authorized}= require('../controller/authentication')
/* GET users listing. */
router.get('/me',authorized, users.getProfileInfo)
 router.delete('/me', authorized,users.deleteProfile)
 router.patch('/me/password',authorized ,users.changeProfilePassword)
 router.post('/me/avatar', authorized,users.uploadAvatar )

module.exports = router;
