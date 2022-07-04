var express = require('express');
var router = express.Router();
const load= require('../controller/load.js')
const {authorized}= require('../controller/authentication')
router.get('/',authorized,load.getUserLoads )
router.post('/', authorized,load.addUserLoad)
router.get('/active',authorized ,load.getUserActiveLoad)
router.patch('/active/state',authorized ,load.iterateLoadState)
router.get('/:id', authorized,load.getUserLoadById)
router.put('/:id', authorized,load.updateUserLoadById)
router.delete('/:id',authorized , load.deleteUserLoadById)
router.post('/:id/post', authorized,load.postUserLoadById)
router.get('/:id/shipping_info', authorized,load.getUserLoadShippingDetailsById)
module.exports=router;

