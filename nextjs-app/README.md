# User Management System - Next.js

A modern user management system built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit, and Zod validation. Uses PostgreSQL database with Prisma ORM.

## 🚀 Features

- **Authentication**: Login and registration with JWT tokens
- **User Management**: View all registered users in a table format
- **Profile Management**: Edit your own profile with image upload
- **Profile Viewing**: View detailed profiles of other users
- **Form Validation**: Zod schemas for robust form validation
- **Responsive Design**: Modern UI with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **State Management**: Redux Toolkit for global state
- **Database**: PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Validation**: Zod
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios
- **Database**: PostgreSQL
- **ORM**: Prisma

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## 🚀 Quick Setup

### 1. Backend Setup (PostgreSQL)

```bash
# Navigate to server directory
cd my-fullstack-app/server

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_key"
CLOUDINARY_API_SECRET="your_cloudinary_secret"

# Run database migrations
npx prisma migrate dev

# Start the server
npm start
```

### 2. Frontend Setup (Next.js)

```bash
# Navigate to Next.js app directory
cd my-fullstack-app/nextjs-app

# Run setup script (installs dependencies and creates .env.local)
node setup.js

# Or manually install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Environment Configuration

Create `.env.local` in the Next.js app directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📁 Project Structure

```
my-fullstack-app/
├── server/                    # Backend (Express + Prisma + PostgreSQL)
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── controllers/          # Route controllers
│   ├── routes/              # API routes
│   ├── middlewares/         # Authentication middleware
│   └── utils/               # Utility functions
└── nextjs-app/              # Frontend (Next.js)
    ├── src/
    │   ├── app/             # Next.js App Router
    │   │   ├── login/       # Login page
    │   │   ├── register/    # Registration page
    │   │   ├── users/       # Users listing page
    │   │   └── profile/     # Profile pages
    │   ├── components/      # Reusable components
    │   ├── features/        # Redux slices
    │   └── lib/            # Utilities and schemas
    └── setup.js            # Setup script
```

## 🔧 Key Features

### Authentication Flow
- Users can register with email, password, and name
- Login with email and password
- JWT token-based authentication
- Automatic token refresh
- Protected routes

### User Management
- View all registered users in a table
- See user profile pictures, names, emails, ages, and genders
- Click "View" to see detailed profile information
- Click "Edit" to edit your own profile

### Profile Management
- Upload profile pictures
- Edit name, age, and gender
- Real-time image preview
- Form validation with Zod

### Form Validation (Zod)
- Registration form validation
- Login form validation
- Profile update validation
- Real-time error handling

## 🗄️ Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE "User" (
  "_id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT,
  "name" TEXT NOT NULL,
  "age" INTEGER,
  "gender" TEXT,
  "image" TEXT,
  "provider" TEXT DEFAULT 'local',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "socialLinks" JSON
);

-- Password resets table
CREATE TABLE "PasswordReset" (
  "_id" TEXT PRIMARY KEY,
  "token" TEXT UNIQUE NOT NULL,
  "userId" TEXT REFERENCES "User"("_id"),
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

The app connects to a backend API with the following endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/auth/users` - Get all users
- `GET /api/auth/users/:id` - Get specific user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `node setup.js` - Run setup script

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling
- Zod for form validation

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Make sure PostgreSQL is running
   - Check your DATABASE_URL in server/.env
   - Run `npx prisma migrate dev` to set up the database

2. **API Connection Error**
   - Ensure backend server is running on port 3001
   - Check NEXT_PUBLIC_API_URL in .env.local

3. **TypeScript Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all imports are correct

4. **Form Validation Errors**
   - Check Zod schema definitions in `src/lib/schemas.ts`
   - Ensure form field names match schema definitions

## 🚀 Deployment

The app can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

1. Build the app:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting platform.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
