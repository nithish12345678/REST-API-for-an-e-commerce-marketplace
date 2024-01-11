const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const app = express();
dotenv.config();
// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// middleware for routes that require authentication
app.use('/api/buyer', authMiddleware);
app.use('/api/seller', authMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/product', productRoutes);


app.get("/json", (req, res) => { res.send("hi") })
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
