import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl mb-4">404 - Page not found</h1>
      <Link to="/" className="hover:underline">Return to home page</Link>
      <Link to="/login" className="mt-2 hover:underline">Log In</Link>
    </div>
  );
};

export default NotFound;