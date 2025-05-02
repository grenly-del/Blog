import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppDispatch } from "~/redux/store";
import { setAuth } from "~/redux/features/auth";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"; // ← Tambah ini

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // ← Tambah ini
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ← Start loading

    try {
      const base_url = `http://${import.meta.env.VITE_HOSTNAME_BE}:${import.meta.env.VITE_PORT_BE}`;
      const response = await axios.post(
        `${base_url}/api/v1/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const data = response;
        setSuccess(true)
        dispatch(setAuth(data.data.payload.payload.token));
        setTimeout(() => {
          setIsLoggedIn(true);
          setLoading(false);
        }, 1000);
      } else {
        console.log("Login failed");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false); // ← Stop loading on error
      setSuccess(false)
      const errorMessage =
        error?.response?.data?.payload?.message || "An unexpected error occurred.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoggedIn) return <Navigate to="/protect-page" />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-500">
        <h2 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="email">
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
            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="password">
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
            className="w-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-shadow shadow-md hover:shadow-2xl cursor-pointer"
            disabled={loading}
          >
            Login
            {loading && success ? (
                <div className="fixed z-[9999] top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,.8)]">
                   <ClipLoader size={30} color="#fff" />
                </div>
            ): (
              <></> 
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
