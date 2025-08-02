'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { api } from '@/app/lib/api';
import { ProfileForm } from '@/app/components/ProfileForm';

interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  profileImageUrl?: string;
}

export default function MyProfilePage() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const user = session?.user;
  const router = useRouter();

  const [profile, setProfile] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me'); // token is automatically handled if using credentials session
        setProfile(res.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        signOut(); // Logout if token/session is invalid
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleUpdate = (updatedUser: User) => {
    setProfile(updatedUser);
    setIsEditing(false);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user || !profile) {
    return null; // Avoid rendering if user/profile not ready
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {profile.profileImageUrl && (
            <img
              src={profile.profileImageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <h2 className="text-xl font-semibold text-center">{profile.name || profile.email}</h2>
          <div className="mt-4">
            <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
            {profile.name && <p className="mb-2"><strong>Name:</strong> {profile.name}</p>}
            {profile.age && <p className="mb-2"><strong>Age:</strong> {profile.age}</p>}
            {profile.gender && <p className="mb-2"><strong>Gender:</strong> {profile.gender}</p>}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>
        {isEditing && (
          <div className="flex-1">
            <ProfileForm user={profile} onUpdate={handleUpdate} />
          </div>
        )}
      </div>
    </div>
  );
}
