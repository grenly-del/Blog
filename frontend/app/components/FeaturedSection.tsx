import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Slider {
  url: string;
}

const FeaturedSection: React.FC = () => {
  const sliders: Slider[] = [
    {
      url: 'https://bestanimations.com/media/food/690171314taco-animated-gif.gif',
    },
    {
      url: 'https://usagif.com/wp-content/uploads/2022/fzk5d/taco-acegif-14-hot-taco.gif',
    },
    {
      url: 'https://cdn.dribbble.com/userupload/5509815/file/original-f3ac92426bc61e1c87bcb5ac8c7a5516.gif',
    },
    {
      url: 'https://usagif.com/wp-content/uploads/gifs/spaghetti-73.gif',
    },
    {
      url: 'https://cdn.dribbble.com/users/1539273/screenshots/15742029/media/c744f8a6fa8a7f723c8684ce26809f1a.gif',
    },
    {
      url: 'https://bestanimations.com/media/food/638823173food-animated-gif-6.gif',
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
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${sliders[current].url})` }}
      ></div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer">
        <FaArrowLeft onClick={prevSlider} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer">
        <FaArrowRight onClick={nextSlider} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {sliders.map((slide, index) => (
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
