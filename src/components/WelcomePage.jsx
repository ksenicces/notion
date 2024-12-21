
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h2 className="text-3xl mb-6">Добро пожаловать!</h2>
      <Link to="/login" className="p-2 bg-gray-200 text-black hover:bg-gray-300 rounded">Войти</Link>
    </div>
  );
};

export default WelcomePage;