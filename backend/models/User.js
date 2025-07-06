// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false }, // Not required for OAuth users
    googleId: { type: String, required: false },
    
    // --- NEW CHANGES ---
    role: { 
        type: String, 
        enum: ['student', 'teacher', 'admin'], // Updated roles
        required: true 
    },
    // This field will store the Student ID or Teacher ID
    schoolId: { 
        type: String, 
        required: function() { return this.role === 'student' || this.role === 'teacher'; }, // Required only for students and teachers
        trim: true 
    },
    // --- END NEW CHANGES ---

    isVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

// ... (the rest of the file remains the same) ...

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);








