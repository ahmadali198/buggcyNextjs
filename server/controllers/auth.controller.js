import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==============================
// Signup (Email/Password)
// ==============================
export const registerUser = async (req, res) => {
  const { email, password, name, age, gender } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age: parseInt(age),
        gender,
      }
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// ==============================
// Login (Email/Password)
// ==============================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ userId: user.id }, process.env.SESSION_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in production with https
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// ==============================
// Logout (Handles JWT & Google OAuth Sessions)
// ==============================
export const logoutUser = (req, res) => {
  // Logout for Passport-based (Google) sessions
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err.message });
    }

    // Destroy session if exists
    req.session?.destroy(() => {
      res.clearCookie('connect.sid'); // passport session
      res.clearCookie('token');       // jwt cookie
      res.json({ message: 'Logged out successfully' });
    });
  });
};

