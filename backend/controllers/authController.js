// backend/controllers/authController.js

// --- [1] IMPORTS ---
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // Make sure this is imported
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


// --- [2] FUNCTION DEFINITIONS ---

/**
 * @desc    Register a new user (Student or Teacher)
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
    const { name, email, password, role, schoolId } = req.body;
    if (!role || !['student', 'teacher'].includes(role) || !schoolId) {
        return res.status(400).json({ message: 'A valid role and School ID are required.' });
    }
    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }
        const user = await User.create({ name, email, password, role, schoolId });
        if (user) {
            return res.status(201).json({
                _id: user._id, name: user.name, email: user.email, role: user.role,
                token: generateToken(user._id, user.role),
            });
        }
        res.status(400).json({ message: 'Invalid user data provided.' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server Error during registration.' });
    }
};

/**
 * @desc    Authenticate a user and get a token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    if (!role || !['student', 'teacher', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'A valid role is required to log in.' });
    }
    try {
        const user = await User.findOne({ email, role });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id, name: user.name, email: user.email, role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials or role.' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server Error during login.' });
    }
};

/**
 * @desc    Request a password reset link by sending an email
 * @route   POST /api/auth/request-reset
 * @access  Public
 */
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // For security, always return a generic success message
            return res.status(200).json({ message: 'If a user with that email exists, a reset link has been sent.' });
        }

        // Generate the token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // Create the reset URL for the frontend
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // --- EMAIL SENDING LOGIC ---
        const message = `
            <h3>Password Reset Request</h3>
            <p>You are receiving this email because you (or someone else) have requested a password reset for your account.</p>
            <p>Please click on the following link to complete the process within 15 minutes:</p>
            <a href="${resetUrl}" target="_blank" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `;

        // Create a Nodemailer transporter using your .env variables
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send the email
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: 'Password Reset Request',
            html: message, // Use HTML for a clickable link
        });

        console.log(`Password reset email successfully sent to Mailtrap for: ${user.email}`);
        res.status(200).json({ message: 'A password reset link has been sent to your email.' });

    } catch (error) {
        console.error('Password Reset Request Error:', error);
        res.status(500).json({ message: 'Server error: Email could not be sent.' });
    }
};

/**
 * @desc    Reset password using a token
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired.' });
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        const token = generateToken(user._id, user.role);
        res.status(200).json({ token, message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Password Reset Error:', error);
        res.status(500).json({ message: 'Server error while resetting password.' });
    }
};


// --- [3] EXPORT ---
module.exports = {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword
};