const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./apiRoutes');

// Initialize Express app
const app = express();

// Middleware for parsing JSON bodies (if not already in routes)
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

/**
 * MongoDB connection setup
 */
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define a default route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Set the port for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
