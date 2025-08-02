'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, useTheme } from './components/Themeprovider';
import { Sun, Moon } from 'lucide-react';
import Sidebar from '@/app/components/Sidebar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md w-full z-10">
      <nav className="flex justify-between items-center px-4 sm:px-8">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline hidden sm:inline">Home</Link>
          <Link href="/dashboard" className="hover:underline hidden sm:inline">Dashboard</Link>
          <Link href="/profile" className="hover:underline hidden sm:inline">Profile</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/signup" className="hover:underline">Sign Up</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white`}>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex min-h-screen">
              {/* Sidebar - Fixed width */}
              <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 hidden md:block">
                <Sidebar />
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 p-4 overflow-auto">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
