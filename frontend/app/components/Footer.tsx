import React from 'react';
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="max-w-[1520px] m-auto px-4 py-2 bg-[#24262b]">
      <div className="py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-400">
        <div>
          <h1 className="text-3xl font-bold w-full text-orange-700">MERN Delights :) </h1>
          <p className="mb-4">🌟 Striving for Greatness 🌟 </p>
          <p className="mb-4">
            Thank you for using our Recipe Application! We're dedicated to providing you with a seamless experience.
          </p>
          <p className="mb-4">
            Explore the app to discover new culinary horizons, organize your recipes, and unleash your creativity.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaDribbble className="text-3xl" />
            <FaFacebook className="text-3xl" />
            <FaGithub className="text-3xl" />
            <FaInstagram className="text-3xl" />
            <FaTwitter className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
