import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import localImage from '../images/image1.png'; // pastikan path ini benar
import localImage1 from '../images/image2.png';
import localImage2 from '../images/image3.png';
import localImage3 from '../images/image4.png';
interface Slider {
  url: string;
}

const FeaturedSection: React.FC = () => {
  const sliders: Slider[] = [
    {
      url: localImage,
    },
    {
      url: localImage1,
    },
    {
      url: localImage2,
    },
    {
      url: localImage3,
    },
    {
      url: localImage,
    },
    {
      url: localImage,
    },
  ];

  const [current, setCurrent] = useState<number>(0);

  const prevSlider = () => {
    setCurrent(current === 0 ? sliders.length - 1 : current - 1);
  };

  const nextSlider = () => {
    setCurrent(current === sliders.length - 1 ? 0 : current + 1);
  };

  const moveToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="max-w-[1520px] h-[500px] w-full py-4 px-4 relative group">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 "
        style={{ backgroundImage: `url(${sliders[current].url})` }}
      ></div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer">
        <FaArrowLeft onClick={prevSlider} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer">
        <FaArrowRight onClick={nextSlider} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {sliders.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
              current === index ? 'bg-orange-700' : 'bg-gray-400'
            }`}
            onClick={() => moveToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
