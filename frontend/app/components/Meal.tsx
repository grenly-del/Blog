import React, { useState } from 'react';
import { mealData } from '../data/data';

interface MealItem {
  id: number;
  name: string;
  category: string;
  image: string;
}

const Meal: React.FC = () => {
  const [meal, setMeal] = useState<MealItem[]>(mealData);

  const filterByCategory = (category: string) => {
    if (category === 'All') {
      setMeal(mealData);
      return;
    }
    const newItems = mealData.filter((item) => item.category === category);
    setMeal(newItems);
  };

  return (
    <div className='max-w-[1520px] m-auto px-4 py-12'>
      <h1 className='text-orange-500 font-bold text-2xl text-center py-2'>
        Elite Plates
      </h1>

      <div className='flex flex-col lg:flex-row justify-center'>
        <div className='flex justify-center md:justify-center'>
          <button
            onClick={() => filterByCategory('All')}
            className='m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700'>
            All
          </button>

          <button
            onClick={() => filterByCategory('Salad')}
            className='m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700'>
            Salad
          </button>

          <button
            onClick={() => filterByCategory('Pizza')}
            className='m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700'>
            Pizza
          </button>

          <button
            onClick={() => filterByCategory('Chicken')}
            className='m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700 hover:border-orange-700'>
            Chicken
          </button>
        </div>
      </div>

      <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-6'>
        {meal.map((item) => (
          <div key={item.id} className='border-none hover:scale-105 duration-300'>
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-[200px] rounded-3xl object-cover cursor-pointer'
            />
            <div className='flex justify-between items-center py-2 px-4'>
              <p className='bg-slate-400 rounded-full text-xl font-bold items-center'>
                {item.name}
              </p>
              <p className='bg-orange-700 font-bold h-18 w-18 rounded-full text-white py-4 px-2 border-8'>
                {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meal;
