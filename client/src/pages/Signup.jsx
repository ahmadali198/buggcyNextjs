import { useState } from 'react';
import axios from '../api';

export default function Signup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    gender: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', form, { withCredentials: true });
      alert('Signup successful!');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-center">Signup</h1>
        {["email", "password", "name", "age", "gender"].map(field => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        ))}
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}
