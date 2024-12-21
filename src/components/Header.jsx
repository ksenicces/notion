import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ showBackButton }) => {
  const navigate = useNavigate();

  

  return (
    <header className="flex items-center fixed top-0 left-0 justify-between p-4 bg-gray-100 w-full shadow-md">
      {showBackButton && (
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
          Back
        </button>
      )}
      <div className="flex space-x-4 ml-auto">
        <Link to="/home" className="p-2 bg-gray-200 rounded hover:bg-gray-300">About</Link>
        <Link to="/notes" className="p-2 bg-gray-200 rounded hover:bg-gray-300">Notes</Link>
        <Link to="/login" className="p-2 bg-gray-200 rounded hover:bg-gray-300">Log Out</Link>
      </div>
    </header>
  );
};

export default Header;