const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors module
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for all routes
app.use(cors()); // Allow all origins (you can customize this as needed)

// Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

// Handle production environment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
