import React from 'react';

const Logout: React.FC = () => {
  return (
    <div className='bg-gray-900 h-screen flex flex-col justify-center items-center text-white'>
      <h1 className='text-4xl font-bold text-center mb-4'>
        LogOut successfully!
      </h1>
      <p className='text-lg hidden lg:block text-center mb-4'>
        It seems like you've wandered off the chat. Let's get you back to the Home page.
      </p>
      <div className='rounded-full overflow-hidden mt-8 max-w-md'>
        <img
          src='https://imgs.search.brave.com/8dvYQvu8pmv2WfWkAXMjcP5C1Na0Kt1nx42rF8Quuo4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdC5k/ZXBvc2l0cGhvdG9z/LmNvbS8xMDA1OTIw/LzI2NjcvaS82MDAv/ZGVwb3NpdHBob3Rv/c18yNjY3ODgwOS1z/dG9jay1waG90by1s/b2dvdXQtaWNvbi5q/cGc'
          alt='Page Not Found'
        />
      </div>
      <a href='/' className='text-orange-500 hover:text-orange-700 mt-4 text-lg'>
        Back to HomePage
      </a>
    </div>
  );
};

export default Logout;
