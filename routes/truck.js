var express = require('express');
var router = express.Router();
const truck= require('../controller/truck.js')
const {authorized}= require('../controller/authentication')
router.get('/', authorized,truck.getUserTrucks)
router.post('/', authorized,truck.addUserTruck)
router.get('/:id', authorized,truck.getUserTruckById)
router.put('/:id', authorized,truck.updateUserTruckById)
router.delete('/:id', authorized,truck.deleteUserTruckById)
router.post('/:id/assign', authorized, truck.assignUserTruckById)
module.exports= router;