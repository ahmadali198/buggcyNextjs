'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/app/lib/api'; // your Axios instance

interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  profileImageUrl?: string;
}

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken || '';

  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age?.toString() || '',
    gender: user.gender || '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      let profileImageUrl = user.profileImageUrl;

      if (file) {
        const fileData = new FormData();
        fileData.append('profilePicture', file);

        const uploadRes = await api.post('/users/upload-picture', fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        profileImageUrl = uploadRes.data.url;
      }

      const payload = {
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        profileImageUrl,
      };

      const res = await api.put('/users/me', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      onUpdate(res.data.user);
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      console.error('Update error:', err);
      setMessage(err?.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow max-w-md mx-auto mt-10 dark:bg-gray-900"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Edit Profile
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Profile Picture</label>
        <input type="file" onChange={handleFileChange} className="w-full" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>

      {message && (
        <p className="mt-4 text-center text-green-600 dark:text-green-400 text-sm">{message}</p>
      )}
    </form>
  );
};
