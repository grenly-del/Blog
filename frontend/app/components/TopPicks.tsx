import React from 'react';
import { topPicks } from '../data/data';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


// Definisikan tipe data item
interface TopPickItem {
  id: number;
  title: string;
  img: string;
}

const TopPicks: React.FC = () => {
  return (
    <>
      <h1 className="text-orange-500 font-bold text-2xl text-center py-2">
        Finest Picks
      </h1>
      <div className="lg:flex max-w-[1520px] m-auto py-2 px-2">
        <Splide options={{ perPage: 3, gap: '1rem', drag: 'free' }}>
          {topPicks.map((item: TopPickItem) => (
            <SplideSlide key={item.id}>
              <div className="rounded-3xl relative">
                <div className="absolute w-full h-full bg-black/50 rounded-3xl text-white">
                  <p className="px-2">{item.title}</p>
                  <button className="border-dotted border-white text-black bg-slate-300 mx-1 absolute bottom-4">
                    craft a recipe
                  </button>
                </div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[200px] rounded-3xl object-cover cursor-pointer hover:scale-105 ease-out duration-300"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default TopPicks;
