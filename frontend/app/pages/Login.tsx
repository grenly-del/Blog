import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        const data = response.data;

        login({
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
          token: data.token,
          savedRecipes: data.user.savedRecipes || [],
        });

        setSuccess("Login successful");
        console.log("Logged in successfully");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Error while logging in");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-500">
        <h2 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-600 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-600 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-shadow shadow-md hover:shadow-2xl"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
        {error && (
          <p className="text-center text-red-500 mt-4 text-sm">{error}</p>
        )}
        {success && (
          <p className="text-center text-green-500 mt-4 text-sm">{success}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
