import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:5000/auth/google/callback",
        },
        async (_, __, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const googleId = profile.id;

                if (!email) {
                    return done(new Error("No email found in Google profile"), undefined);
                }

                // at first, try to find user by Google ID (most reliable)
                let user = await User.findOne({ googleId });

                if (!user) {
                    // if not found by Google ID, check if user exists with this email (from local auth)
                    user = await User.findOne({ email });

                    if (user) {
                        // user exists via local auth -> link Google account
                        user.googleId = googleId;
                        user.provider = "google";
                        await user.save();
                    } else {
                        // no existing user -> create new one
                        user = await User.create({
                            googleId,
                            name: profile.displayName,
                            email,
                            provider: "google",
                            role: "customer",
                        });
                    }
                }

                done(null, user);
            } catch (err) {
                console.error("Google Strategy Error:", err);
                done(err, undefined);
            }
        }
    )
);
