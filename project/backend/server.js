
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/findit')
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

  //item routes
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

console.log('Claims route loaded!');

// Test route
app.get('/', (req, res) => {
  res.send('FindIt Backend is Running!');
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});