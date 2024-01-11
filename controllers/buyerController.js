const User = require('../models/User');
const Catalog = require('../models/Catalog');
const Order = require('../models/Order');

exports.getListOfSellers = async (req, res) => {
    try {
        const sellers = await User.find({ userType: 'seller' })
            .select('-password'); // Exclude the "password" field
        res.json(sellers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getSellerCatalog = async (req, res) => {
    try {
        const { seller_id } = req.params;
        const catalog = await Catalog.findOne({ seller: seller_id }).populate('products');
        res.json(catalog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { seller_id } = req.params;
        const { items } = req.body;

        // Check if the seller exists
        const seller = await User.findById(seller_id);
        if (!seller || seller.userType !== 'seller') {
            return res.status(400).json({ error: 'Invalid seller' });
        }

        // Check if items exist in the seller's catalog
        // const catalog = await Catalog.findOne({ seller: seller_id });
        // if (!catalog) {
        //     return res.status(400).json({ error: "Seller's catalog not found" });
        // }
        // Check if items exist in the seller's catalog
        const catalog = await Catalog.findOne({ seller: seller_id });
        if (!catalog) {
            return res.status(400).json({ error: "Seller's catalog not found" });
        }

        const allItemsExist = items.every(itemId => catalog.products.some(product => product.toString() === itemId));

        if (!allItemsExist) {
            return res.status(400).json({ error: "Some items not found in the seller's catalog" });
        }

        const order = new Order({
            buyer: req.user._id,
            seller: seller_id,
            products: items,
        });

        await order.save();
        res.json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
