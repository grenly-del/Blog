import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the context

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = useAuth(); // Destructure login from the context

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

        // Call login function from context to save user and token
        login({
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
          token: data.token,
          savedRecipes: data.user.savedRecipes || [], // Assuming savedRecipes is in the response
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
    <div className="max-w-[400px] m-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-400 text-white py-2 px-4 rounded block w-full"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
