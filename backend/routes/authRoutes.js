// backend/routes/authRoutes.js

// --- [1] IMPORTS ---
const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateToken = require('../utils/generateToken');

// Import all four functions from the controller in one go.
const {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword
} = require('../controllers/authController');


// --- [2] ROUTE DEFINITIONS ---

// --- Local Authentication ---
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- Password Reset ---
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

// --- Google OAuth ---
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENT_URL}/login?error=google_authentication_failed`,
        session: false,
    }),
    (req, res) => {
        // If passport succeeds, req.user contains the user from the database.
        const token = generateToken(req.user._id, req.user.role);
        // Redirect back to the frontend to handle the token.
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);


// --- [3] EXPORT ---
// This line MUST be at the very end of the file.
module.exports = router;