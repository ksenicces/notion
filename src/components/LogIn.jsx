import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usersData from '../../db.json';

const usersDb = usersData.users;

const LogIn = ({ setLoggedInUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const authenticateUser = (users, email, password) =>
    users.find((u) => u.email === email && u.password === password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = authenticateUser(usersDb, formData.email, formData.password);

    if (user) {
      setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/home");
    } else {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h2 className="text-3xl mb-6">Welcome!</h2>
      <form className="bg-white w-[50%] p-8" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-gray-200"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-gray-200"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full p-2 bg-gray-200 text-black hover:bg-gray-300">Sign in</button>
      </form>
      <p>
        <Link to="/register" className="bg-white hover:underline">Don't have an account? Sign up</Link>
      </p>
    </div>
  );
};

export default LogIn;