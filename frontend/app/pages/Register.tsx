import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    const url = `http://${import.meta.env.VITE_HOSTNAME_BE}:${import.meta.env.VITE_PORT_BE}`;
    console.log(url);
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${url}/api/v1/user/regis`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setTimeout(() => {
          setIsRegistered(true);
        }, 500); // tunggu setelah toast selesai
      } else {
        console.log("Registration failed");
        setError("Registration failed");
      }
    } catch (error:any) {
      const errorMessage = error?.response?.data?.payload?.message || "An unexpected error occurred.";
      console.error("Error occurred:", errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-2xl p-6">
        <h2 className="text-3xl font-extrabold text-orange-500 text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-shadow shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login here
          </Link>
        </p>
        {error && (
          <p className="text-center text-red-500 mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
