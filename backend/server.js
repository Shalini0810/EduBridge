// --- [1] LOAD ENVIRONMENT VARIABLES FIRST ---
const dotenv = require('dotenv');
dotenv.config();

// --- [2] IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const path = require('path');
const Razorpay = require('razorpay');
const connectDB = require('./config/db');

// --- [3] ROUTE IMPORTS ---
const authRoutes = require('./routes/authRoutes');
// const academicRoutes = require('./routes/AcademicRoutes.js');
// const bmiRoutes = require('./routes/bmiroutes.js');


// --- [4] INITIALIZE ---
// Connect to Database
connectDB();
// Initialize Express App
const app = express();

// --- [5] MIDDLEWARE ---
// Security Headers
app.use(helmet());
// Enable CORS - Make sure your frontend URL is allowed
// In your backend server.js
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add both ports
  credentials: true
}));
// Body Parser for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Passport Middleware
require('./config/passport-setup'); 
app.use(passport.initialize());

// Rate Limiter for login
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many login attempts, please try again after 15 minutes.'
});

// --- [6] MODELS ---
// Donation Schema
const donationSchema = new mongoose.Schema({
  donor: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String
  },
  amount: {
    type: Number,
    required: true
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

const Donation = mongoose.model('Donation', donationSchema);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// --- [7] API ROUTES ---
// Test Route
app.get('/', (req, res) => res.send('Diksha Foundation API is running...'));
// Auth Routes
app.use('/api/auth', authRoutes);
// Apply the rate limiter specifically to the login route
// app.use('/api/auth/login', authLimiter);
// Academic Routes
// app.use('/api/assessments', academicRoutes);
// BMI Routes
// app.use('/api/bmi', bmiRoutes);

// --- [8] PAYMENT ROUTES ---
// Create order
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { amount, name, email, phone, donationType } = req.body;
    
    // Validate amount
    if (!amount || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid donation amount'
      });
    }

    // Create order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    });
    
    // Save donation to database
    const donation = new Donation({
      donor: {
        name,
        email,
        phone
      },
      amount,
      donationType,
      payment: {
        orderId: order.id,
        status: 'pending'
      }
    });
    
    await donation.save();
    
    res.status(201).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      donation: {
        id: donation._id
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order',
      error: error.message
    });
  }
});

// Verify payment
app.post('/api/payments/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create signature for verification
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');
    
    // Verify signature
    if (digest !== razorpay_signature) {
      // Update donation status to failed
      await Donation.findOneAndUpdate(
        { 'payment.orderId': razorpay_order_id },
        { 'payment.status': 'failed' }
      );
      
      return res.status(400).json({
        success: false,
        message: 'Transaction not legit!'
      });
    }
    
    // Payment is valid, update donation record
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
    const donation = await Donation.findOneAndUpdate(
      { 'payment.orderId': razorpay_order_id },
      {
        'payment.paymentId': razorpay_payment_id,
        'payment.signature': razorpay_signature,
        'payment.status': 'completed'
      },
      { new: true }
    );
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Payment has been verified successfully',
      donation: {
        id: donation._id,
        amount: donation.amount,
        donor: donation.donor.name,
        email: donation.donor.email
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while verifying the payment',
      error: error.message
    });
  }
});

// Get all donations (admin)
app.get('/api/payments/donations', async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .select('donor.name amount donationType payment.status createdAt');
    
    res.json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching donations',
      error: error.message
    });
  }
});

// Get donation by ID
app.get('/api/payments/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    res.json({
      success: true,
      donation
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the donation',
      error: error.message
    });
  }
});

// --- [9] START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});