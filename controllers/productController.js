const User = require('../models/User');
const Catalog = require('../models/Catalog');
const Product = require('../models/Product');

const mongoose = require('mongoose');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        const product = new Product({
            name, price
        });

        await product.save();
        res.json({ message: 'product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {

            console.log("errorr");
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product
        await Product.deleteOne({ _id: productId });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllProducts, createProduct, deleteProduct
}
