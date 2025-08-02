'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import api from '@/app/lib/api'; // Make sure default export exists in your api.ts

interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  profileImageUrl?: string;
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get(`/users/${params.id}`);
        setProfile(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch user profile.');
      }
    };

    if (params.id && status === 'authenticated') {
      fetchUserProfile();
    }
  }, [params.id, status]);

  if (status === 'loading') {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
      {profile.profileImageUrl && (
        <img
          src={profile.profileImageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
      )}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{profile.name || profile.email}</h2>
        <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
        {profile.age && <p className="mb-2"><strong>Age:</strong> {profile.age}</p>}
        {profile.gender && <p className="mb-2"><strong>Gender:</strong> {profile.gender}</p>}
      </div>
    </div>
  );
}
