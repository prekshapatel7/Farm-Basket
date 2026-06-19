const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

//routes
//create product post
router.post('/createproduct', authMiddleware, require('../controllers/productController').createProductController);

//get all products
router.get('/getallproducts', require('../controllers/productController').getAllProductsController);

//get product by id
router.get('/getproduct/:id', require('../controllers/productController').getProductByIdController);

//delete product
router.delete('/deleteproduct/:id', authMiddleware, require('../controllers/productController').deleteProductController);




module.exports = router;