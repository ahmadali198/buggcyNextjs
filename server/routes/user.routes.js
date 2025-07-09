import express from 'express';
import {
  getMyProfile,
  getUserProfile,
  updateUserProfile
} from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.js'; // ✅ Cloudinary upload middleware

const router = express.Router();

// ✅ Routes
router.get('/me', authenticateUser, getMyProfile); // Get own profile
router.get('/:id', authenticateUser, getUserProfile); // View other user profiles
router.put('/update', authenticateUser, upload.single('image'), updateUserProfile); // Update profile with Cloudinary image

export default router;
