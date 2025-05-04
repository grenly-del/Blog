import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CardItems from "~/components/CardItems";

interface Recipe {
  _id: string;
  name: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  imageUrl: string;
}

const RecipeListing: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("/api/v1/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleUpdate = (recipe: Recipe) => {
    navigate("/updateRecipe", { state: { recipe } });
  };

  const handleDelete = async (recipeId: string) => {
    try {
      await axios.delete(`/api/v1/recipes/${recipeId}`);
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId)); // Remove deleted recipe from state
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="recipe-listing-page bg-gray-100 min-h-screen">
      <div className="w-full px-20 mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">All Recipes</h1>
        <div className="flex justify-center items-center gap-6 flex-wrap">
            <CardItems
              key="1"
              nama_pembuat="Grantly Sorongan"
              nama_resep="Nasi Goreng"
              img="./images/nasi-goreng.jpeg"
              id_item="124"
            />
        </div>
      </div>
    </div>
  );
};

export default RecipeListing;
