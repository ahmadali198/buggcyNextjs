import express from 'express';
import passport from 'passport';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/auth.controller.js';

const router = express.Router();

// ==============================
// Email/Password Auth Routes
// ==============================

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// ==============================
// Google OAuth Routes
// ==============================

// Start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: true,
  }),
  (req, res) => {
    // Redirect to dashboard after successful login
    res.redirect('http://localhost:3000/dashboard');
  }
);

export default router;
