import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsFillPersonFill, BsSearch } from 'react-icons/bs';
import { FaUtensils, FaHome } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { AiOutlineBook, AiOutlineReload } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

// Typing untuk NavItem props
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text }) => (
  <li className='text-xl py-4 flex'>
    <Link to={to} className='flex items-center'>
      {icon}
      <p className='ml-4'>{text}</p>
    </Link>
  </li>
);

const TopNavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className='max-w-[1520px] mx-auto flex justify-between items-center p-4'>
        {/* Logo and menu */}
        <div className='flex items-center'>
          <div onClick={() => setShow(!show)} className='cursor-pointer'>
            <AiOutlineMenu size={25} />
          </div>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
            MERN
            <span className='font-bold bg-yellow-100 filter rounded-full'>
              Delights :)
            </span>
          </h1>
          <div className='hidden lg:flex items-center bg-gray-300 rounded-full p-1 text-[14px]'>
            <p className='p-2 font-bold'>Awaken Your Inner </p>
            <p className='bg-orange-700 text-white rounded-full p-2 font-bold'>Chef</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className='bg-gray-300 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
          <AiOutlineSearch size={25} className='mr-2' />
          <input
            className='bg-transparent p-2 w-full h-10 focus:outline-none text-sm'
            type='text'
            placeholder='Find Recipe by ID'
          />
          <Link to='/recipe/123'>
            <BsSearch size={20} className='text-green-500 cursor-pointer' />
          </Link>
        </div>

        {/* Login/Logout Button */}
        {user ? (
          <button
            className='bg-green-400 text-black hidden md:flex items-center py-2 rounded-full'
            onClick={handleLogout}
          >
            <BsFillPersonFill size={25} /> <span className="ml-2">Logout</span>
          </button>
        ) : (
          <Link to="/login">
            <button className='bg-green-400 text-black hidden md:flex items-center py-2 rounded-full'>
              <BsFillPersonFill size={25} /> <span className="ml-2">Login/SignUp</span>
            </button>
          </Link>
        )}

        {/* Mobile Menu Background */}
        {show && (
          <div
            className='bg-black/60 fixed w-full h-screen z-10 top-0 left-0'
            onClick={() => setShow(false)}
          />
        )}

        {/* Side Menu */}
        <div
          className={`fixed top-0 ${show ? 'left-0' : 'left-[-100%]'} w-[300px] h-screen bg-white z-10 duration-300`}
        >
          <AiOutlineClose
            size={25}
            className='cursor-pointer absolute top-2 right-4'
            onClick={() => setShow(false)}
          />
          <h2 className='text-2xl p-6'>
            Infuse, Imagine, <span className='text-orange-700 font-bold'>Inspire</span>
          </h2>
          <nav>
            <ul className='flex flex-col p-4 text-gray-900'>
              <NavItem to='/' icon={<FaHome size={25} />} text='Home' />
              <NavItem to='/createRecipe' icon={<FaUtensils size={25} />} text='Create Recipe' />
              <NavItem to='/all' icon={<AiOutlineReload size={25} />} text='Get All Recipe' />
              <NavItem to='/savedRecipes' icon={<AiOutlineBook size={25} />} text='Saved Recipes' />
              <NavItem to='/help' icon={<IoChatboxEllipsesOutline size={25} />} text='Help' />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
