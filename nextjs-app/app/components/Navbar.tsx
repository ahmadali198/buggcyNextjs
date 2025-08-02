'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from './components/Themeprovider';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline hidden sm:inline">Home</Link>

          {session ? (
            <>
              <Link href="/dashboard" className="hover:underline hidden sm:inline">Dashboard</Link>
              <Link href="/profile" className="hover:underline hidden sm:inline">Profile</Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/signup" className="hover:underline">Sign Up</Link>
            </>
          )}

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

export default Navbar;
