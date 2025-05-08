import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const Login = () => {
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-8 text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="opacity-90">Please login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${
                role === 'admin'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'hover:bg-gray-300'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${
                role === 'user'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'hover:bg-gray-300'
              }`}
            >
              User
            </button>
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 ${
              role === 'admin' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-cyan-500 hover:bg-cyan-600'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;