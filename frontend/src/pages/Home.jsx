// src/pages/Home.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/user'} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome</h1>
        <p className="text-gray-700 text-xl">Please login or register</p>
      </div>
    </div>
  );
};

export default Home;