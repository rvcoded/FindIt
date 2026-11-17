
const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  itemName: String,
  itemImage: String,
  claimantName: String,
  claimantEmail: String,
  message: String,

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  createdAt: String
});

module.exports = mongoose.model('Claim', claimSchema);
