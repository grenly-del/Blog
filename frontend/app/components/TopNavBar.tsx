import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill, BsSearch } from "react-icons/bs";
import { FaUtensils, FaHome } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { AiOutlineBook, AiOutlineReload } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text }) => (
  <li className="text-xl py-4 flex">
    <Link to={to} className="flex items-center">
      {icon}
      <p className="ml-4">{text}</p>
    </Link>
  </li>
);

const TopNavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  // const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // await logout();
      toast.success("Logout successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-[1520px] mx-auto flex justify-between items-center p-4">
          {/* Logo and menu */}
          <div className="flex items-center">
            <div onClick={() => setShow(!show)} className="cursor-pointer">
              <AiOutlineMenu size={25} />
            </div>
            <Link to="/" className="px-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                MERN
                <span className="font-bold bg-yellow-100 filter rounded-full">
                  Delights :)
                </span>
              </h1>
            </Link>
            <div className="hidden lg:flex items-center bg-gray-300 rounded-full p-1 text-[14px]">
              <p className="p-2 font-bold">Awaken Your Inner </p>
              <p className="bg-orange-700 text-white rounded-full p-2 font-bold">
                Chef
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-gray-300 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
            <AiOutlineSearch size={25} className="mr-2" />
            <input
              className="bg-transparent p-2 w-full h-10 focus:outline-none text-sm"
              type="text"
              placeholder="Find Recipe by ID"
            />
            <Link to="/recipe/123">
              <BsSearch size={20} className="text-green-500 cursor-pointer" />
            </Link>
          </div>

          <Link to="/login">
            <button className="border border-orange-500 text-orange-500 hidden md:flex items-center py-2 px-4 rounded-full cursor-pointer hover:bg-orange-100 transition">
              <BsFillPersonFill size={25} />
              <span className="ml-2">Login</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Background */}
      {show && (
        <div
          className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0"
          onClick={() => setShow(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } w-[300px] h-screen bg-white z-20 duration-300 shadow-lg`}
      >
        <AiOutlineClose
          size={25}
          className="cursor-pointer absolute top-2 right-4"
          onClick={() => setShow(false)}
        />
        <h2 className="text-2xl p-6">
          Infuse, Imagine,{" "}
          <span className="text-orange-700 font-bold">Inspire</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-900">
            <NavItem to="/" icon={<FaHome size={25} />} text="Home" />
            <NavItem
              to="/protect-page/createRecipe"
              icon={<FaUtensils size={25} />}
              text="Create Recipe"
            />
            <NavItem
              to="/all"
              icon={<AiOutlineReload size={25} />}
              text="Get All Recipe"
            />
            <NavItem
              to="/help"
              icon={<IoChatboxEllipsesOutline size={25} />}
              text="Help"
            />
          </ul>
        </nav>
      </div>

      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default TopNavBar;
