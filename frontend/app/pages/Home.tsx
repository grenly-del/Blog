import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import Categories from "../components/Categories";
import Delivery from "../components/Delivery";
import FeaturedSection from "../components/FeaturedSection";
// import Meal from '../components/Meal';
import TopPicks from "../components/TopPicks";
import AllRecipes from "./AllRecipes";

const Home: React.FC = () => {
  return (
    <>
      <FeaturedSection />
      <Delivery />
      <AllRecipes />
      <TopPicks />
      {/* <Meal /> */}
      <Categories />

      {/* Floating Help Button */}
      <Link to="/help">
        <div className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition duration-300 z-50">
          <FaQuestionCircle className="text-2xl" />
        </div>
      </Link>
    </>
  );
};

export default Home;
