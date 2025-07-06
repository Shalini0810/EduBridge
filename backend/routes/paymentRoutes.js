const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getDonation,
  getAllDonations
} = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/donations/:id', getDonation);
router.get('/donations', getAllDonations);

module.exports = router;