import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../prisma/prismaClient.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email found in Google profile'), null);

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              image: profile.photos?.[0]?.value || '',
              authProvider: 'GOOGLE',
              password: '', // Leave blank since OAuth
            },
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('OAuth Error:', err);
        return done(err, null);
      }
    }
  )
);

// ✅ Serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
