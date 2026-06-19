const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

//routes
//get user|| get
router.get('/getuser', authMiddleware, userController  );



module.exports = router;