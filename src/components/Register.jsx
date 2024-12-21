import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errorsSingUp = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errorsSingUp.email = "Invalid email address";
    }
    if (formData.password.length < 8) {
      errorsSingUp.password = "Password must contain at least 8 characters";
    }
    if (!/[a-z]/.test(formData.password)) {
      errorsSingUp.password = "The password must contain at least one lowercase letter";
    }
    if (!/[A-Z]/.test(formData.password)) {
      errorsSingUp.password = "The password must contain at least one capital letter";
    }
    if (!/[0-9]/.test(formData.password)) {
      errorsSingUp.password = "The password must contain at least one number";
    }
    if (formData.password !== formData.confirmPassword) {
      errorsSingUp.confirmPassword = "Passwords don't match";
    }

    setErrors(errorsSingUp);
    return Object.keys(errorsSingUp).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUser = async (user) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await createUser({
          ...formData,
          id: Date.now(),
          createdAt: Date.now(),
        });
        navigate("/login");
      } catch (error) {
        console.error("Error:", error);
        setErrors({ server: error.message || "Connection error" });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form className="bg-white w-[50%] p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-bold">Sign up</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-200 p-2 mb-4 border rounded text-black"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-gray-200 p-2 mb-4 border rounded"
          required
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Repeat password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full bg-gray-200 p-2 mb-4 border rounded"
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
        {errors.server && <p className="text-red-500">{errors.server}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Sign up
        </button>
        <p className="mt-4 text-center">
          <Link
            to="/login"
            className="font-semibold hover:underline text-gray-600"
          >
            Already have an account? Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;