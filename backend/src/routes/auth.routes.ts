import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/auth?error=authentication_failed"
    }),
    (req, res) => {
        try {
            const user = req.user as any;

            // If user is not defined, redirect with error
            if (!user) {
                return res.redirect(
                    "http://localhost:5173/auth?error=no_user_data"
                );
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: "7d" }
            );

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: false,        // true in production
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.redirect("http://localhost:5173/");

        } catch (error) {
            console.error("Google OAuth callback error:", error);
            res.redirect(
                "http://localhost:5173/auth?error=server_error"
            );
        }
    }
);

router.get("/me", protect, (req, res) => {
    res.json(req.user)
})

export default router;
