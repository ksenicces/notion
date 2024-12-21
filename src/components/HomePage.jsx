import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const HomePage = ({ user }) => {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-3xl mb-4">Please login.</h1>
        <Link to="/login" className="text-black hover:underline">Log in</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">Welcome to your home page!</h1>
        <p className="text-center">
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p className="text-center">
          <span className="font-bold">Registration date:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <Link to="/notes" className="mt-4 p-2 bg-gray-200 rounded hover:bg-gray-300">Go to notes</Link>
      </div>
    </div>
  );
};

export default HomePage;