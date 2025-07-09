import { useState } from 'react';
import axios from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form, { withCredentials: true });
      alert('Login successful!');
      window.location.href = '/profile';
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-center">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full">Login</button>
        <div className="text-center">OR</div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-full"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}
