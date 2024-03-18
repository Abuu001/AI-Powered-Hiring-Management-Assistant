const router = require('express').Router()
const controller = require('../controllers/controllers')

router.post('/api/save-call-id',controller.saveCallId);
router.get('/api/get-call-id/:id',controller.getCallId);

module.exports=router
