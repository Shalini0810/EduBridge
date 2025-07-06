// backend/config/passport-setup.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        proxy: true
    },
    // This is the "verify" callback that runs after Google confirms the user
    async (accessToken, refreshToken, profile, done) => {
        try {
            // --- THIS IS THE CORRECT LOGIC ---

            // 1. Check if a user already exists with this Google ID
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                // If the user exists, we're done. Pass them to the next step.
                console.log('[Passport] Existing Google user found:', user.email);
                return done(null, user);
            } else {
                // 2. If no user with that Google ID, check if they exist by email
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // This user signed up with email/password before.
                    // Let's link their Google account.
                    console.log('[Passport] Email exists, linking Google account for:', user.email);
                    user.googleId = profile.id;
                    await user.save();
                    return done(null, user);
                } else {
                    // 3. If no user exists at all, create a brand new one.
                    console.log('[Passport] Creating a new user with Google info.');
                    const newUser = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        isVerified: true, // OAuth users are considered verified
                    });
                    return done(null, newUser);
                }
            }
        } catch (err) {
            console.error('[Passport] Error in Google strategy:', err);
            return done(err, null);
        }
    })
);
