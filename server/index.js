import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/auth.routes.js';
import passportSetup from './utils/passport.js'; // Make sure this file has side effects (like strategies)
import cors from 'cors';
import dotenv from 'dotenv';

// For resolving __dirname (not available in ESM by default)
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// ✅ Body parser
app.use(express.json());

// ✅ Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
