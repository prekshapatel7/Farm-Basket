const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Product description is required'],
    },

    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Fruit', 'Vegetable'],
    },

    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: 0,
    },

    unit: {
      type: String,
      default: 'kg',
      enum: ['kg', 'gram', 'piece', 'dozen'],
    },

    image: {
      type: String,
      required: [true, 'Product image is required'],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);