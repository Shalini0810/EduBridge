const crypto = require('crypto');
const Razorpay = require('razorpay');
const asyncHandler = require('express-async-handler');
const Donation = require('../models/Donation');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create a new payment order
// @route   POST /api/payments/create-order
// @access  Public
exports.createOrder = asyncHandler(async (req, res) => {
  const { amount, name, email, phone, donationType = 'one-time' } = req.body;
  
  if (!amount || amount < 1) {
    res.status(400);
    throw new Error('Please provide a valid donation amount');
  }

  try {
    // Generate receipt ID
    const receiptId = `receipt_${Date.now()}`;
    
    // Create order with Razorpay
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: receiptId
    };

    const order = await razorpay.orders.create(options);
    
    // Create donation record in database
    const donation = await Donation.create({
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
    res.status(500);
    throw new Error('Failed to create payment order');
  }
});

// @desc    Verify payment signature after payment
// @route   POST /api/payments/verify-payment
// @access  Public
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Create signature for verification
  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  // Check if signature is valid
  if (digest !== razorpay_signature) {
    // Update donation status to failed
    await Donation.findOneAndUpdate(
      { 'payment.orderId': razorpay_order_id },
      { 'payment.status': 'failed' }
    );
    
    res.status(400);
    throw new Error('Invalid payment signature');
  }

  // Signature is valid, update donation
  try {
    // Get payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
    // Update donation in database
    const donation = await Donation.findOneAndUpdate(
      { 'payment.orderId': razorpay_order_id },
      {
        'payment.paymentId': razorpay_payment_id,
        'payment.signature': razorpay_signature,
        'payment.method': payment.method,
        'payment.status': 'completed'
      },
      { new: true }
    );
    
    if (!donation) {
      res.status(404);
      throw new Error('Donation record not found');
    }
    
    res.json({
      success: true,
      message: 'Payment verified successfully',
      donation: {
        id: donation._id,
        amount: donation.amount,
        donor: donation.donor.name,
        email: donation.donor.email
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500);
    throw new Error('Failed to verify payment');
  }
});

// @desc    Get all donations
// @route   GET /api/payments/donations
// @access  Public
exports.getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find()
    .sort({ createdAt: -1 })
    .select('donor.name amount donationType payment.status createdAt');
  
  res.json({
    success: true,
    count: donations.length,
    donations
  });
});

// @desc    Get donation by ID
// @route   GET /api/payments/donations/:id
// @access  Public
exports.getDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  
  if (!donation) {
    res.status(404);
    throw new Error('Donation not found');
  }
  
  res.json({
    success: true,
    donation: {
      id: donation._id,
      amount: donation.amount,
      donationType: donation.donationType,
      status: donation.payment.status,
      date: donation.createdAt
    }
  });
});