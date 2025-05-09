// src/pages/UserPage.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserPage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-cyan-500 mb-4">User Dashboard</h1>
          <p className="text-gray-700 mb-4">Welcome, {user?.username}</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;