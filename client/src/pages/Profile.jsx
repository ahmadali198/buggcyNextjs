import { useEffect, useState } from 'react';
import axios from '../api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    axios.get('/auth/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => (window.location.href = '/login'));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in user) formData.append(key, user[key]);
    if (image) formData.append('profilePicture', image);
    try {
      await axios.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      alert('Profile updated');
    } catch (err) {
      alert('Update failed');
    }
  };

  const logout = () => {
    axios.post('/auth/logout', {}, { withCredentials: true }).then(() => {
      window.location.href = '/login';
    });
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={user.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
          <input name="age" value={user.age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded" />
          <input name="gender" value={user.gender} onChange={handleChange} placeholder="Gender" className="w-full p-2 border rounded" />
          <input type="file" onChange={handleImageChange} className="w-full" />
          {preview && <img src={preview} className="w-32 h-32 rounded-full object-cover mt-2" />}
          {user.profilePicture && !preview && <img src={user.profilePicture} className="w-32 h-32 rounded-full object-cover mt-2" />}
          <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full">Update Profile</button>
        </form>
        <button onClick={logout} className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded w-full">Logout</button>
      </div>
    </div>
  );
}
