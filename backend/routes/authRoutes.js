const express = require('express');
const { registerController } = require('../controllers/authController');
const router = express.Router();
const { loginController } = require('../controllers/authController');


//routes
//register || post
router.post('/register', registerController);

//login || post
router.post('/login', loginController)






module.exports = router;