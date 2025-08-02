'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Courses', href: '/courses' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            pathname === item.href ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
