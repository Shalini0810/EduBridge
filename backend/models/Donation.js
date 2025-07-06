halinikotha/Desktop/MyProjects/cfg-DikshaFoundation/Team-58/backend/models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donor: {
    name: {
      type: String,
      required: [true, 'Please provide your name']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String
    }
  },
  amount: {
    type: Number,
    required: [true, 'Please provide donation amount'],
    min: [1, 'Amount must be at least 1']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  donationType: {
    type: String,
    enum: ['one-time', 'monthly'],
    default: 'one-time'
  },
  payment: {
    orderId: String,
    paymentId: String,
    signature: String,
    method: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', DonationSchema);