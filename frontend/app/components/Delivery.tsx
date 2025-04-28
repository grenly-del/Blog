import React from 'react';

const Delivery: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="text-orange-500 font-bold text-2xl text-center">
        <h3>Embark on a Journey of Flavors and Creativity</h3>
      </div>

      <div className="max-w-7xl mx-auto md:grid md:grid-cols-2">
        <img
          className="w-full md:w-auto mx-auto my-4"
          src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1672676822/NetflixApp/FC_two_phones.6ec9a842f905769677f9_m91off.webp"
          alt="loading"
        />
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold text-center md:text-left">
            Get The Best Experience
          </p>
          <h1 className="text-4xl md:text-5xl font-bold py-2 text-center md:text-left">
            Limitless Convenience on Demand
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
