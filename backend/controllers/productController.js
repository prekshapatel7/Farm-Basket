const Product = require('../models/productModel');

// Create Product
const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, image } = req.body;

        if (!name || !description || !price || !category || !quantity || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = await Product.create({
            productName: name,
            description,
            price,
            category,
            stock: quantity,
            image
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Products
const getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Product By ID
const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    deleteProductController
};

