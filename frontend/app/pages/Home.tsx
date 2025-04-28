import React from 'react';
import Categories from '../components/Categories';
import Delivery from '../components/Delivery';
import FeaturedSection from '../components/FeaturedSection';
// import Meal from '../components/Meal';
import TopPicks from '../components/TopPicks';
import AllRecipes from './AllRecipes';

const Home: React.FC = () => {
  return (
    <>
      <FeaturedSection />
      <Delivery />
      <AllRecipes />
      <TopPicks />
      {/* <Meal /> */}
      <Categories />
    </>
  );
};

export default Home;
