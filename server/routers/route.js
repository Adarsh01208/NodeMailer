const router = require('express').Router();

// Path: server/routers/route.js

// Import the controller

const controller = require('../controllers/appControllers.js');

router.post('/signup', controller.signup);
router.post('/getbill', controller.getbill);


module.exports = router;