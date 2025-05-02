import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectUserPage = () => {
  const [isLoading, setIsLoading] = useState(true);  // ❗ Tambahkan state loading
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = Cookies.get("auth_token");

  const base_url = `http://${import.meta.env.VITE_HOSTNAME_BE}:${import.meta.env.VITE_PORT_BE}`;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post(`${base_url}/api/v1/user/checkToken`, { token });

        // Cek apakah backend validasi token dengan benar
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);  // ✅ Set loading selesai
      }
    };

    if (token) {
      checkToken();
    } else {
      setIsLoading(false);  // Tidak ada token juga selesai loading
    }
  }, [token, base_url]);

  //  Jangan tampilkan Outlet atau Navigate dulu kalau masih loading
  if (isLoading) return <div>Loading...</div>;

  //  Setelah loading selesai, tampilkan Outlet atau Navigate
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectUserPage;
