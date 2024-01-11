const User = require('../models/User');
const Catalog = require('../models/Catalog');
const Order = require('../models/Order');

exports.createCatalog = async (req, res) => {
    try {
        const { items } = req.body;

        const catalog = new Catalog({
            seller: req.user._id,
            products: items,
        });

        await catalog.save();
        res.json({ message: 'Catalog created successfully', catalog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user._id }).populate('products');
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
