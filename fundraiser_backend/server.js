// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fundraiser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

// Define a Donation model
const Donation = mongoose.model('Donation', {
    amount: Number,
    description: String,
});

// Middleware to parse JSON
app.use(bodyParser.json());

// API routes
app.post('/api/donations', async (req, res) => {
    try {
        const { amount, description } = req.body;

        // Create a new donation
        const newDonation = new Donation({ amount, description });
        await newDonation.save();

        res.status(201).json(newDonation);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/donations', async (req, res) => {
    try {
        // Fetch all donations
        const donations = await Donation.find();
        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
