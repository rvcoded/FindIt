const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  category: String,

  type: {
    type: String,
    enum: ['lost', 'found']
  },

  status: {
    type: String,
    enum: ['active', 'claimed', 'resolved', 'expired'],
    default: 'active'
  },

  date: String,
  location: String,
  images: [String],
  reporterName: String,
  reporterEmail: String,
  reporterId: String,
  createdAt: String

});

module.exports = mongoose.model('Item', itemSchema);