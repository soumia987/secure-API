import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const { confirmPassword, ...userData } = formData;
        const response = await api.post('/register', userData);
        
        // Store authentication data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on role
        navigate(response.data.user.role === 'admin' ? '/admin' : '/user');
      } catch (err) {
        setApiError(err.response?.data?.error || 'Registration failed');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-8 text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Create Account</h1>
          <p className="opacity-90">Join our community today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {apiError}
            </div>
          )}

          {/* Role Selector */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-6">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'admin'})}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${
                formData.role === 'admin'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'hover:bg-gray-300'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'user'})}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${
                formData.role === 'user'
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
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="Choose a username"
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="Create a password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${
              formData.role === 'admin' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-cyan-500 hover:bg-cyan-600'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Register as ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`
            )}
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;