import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Define the Recipe type
interface Recipe {
  _id: string;
  name: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  imageUrl: string;
}

const RecipeListing: React.FC = () => {
  const { user } = useAuth();
  const authToken = user?.token || null;
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Use Recipe[] type for state

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "/api/v1/all",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.data;
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleUpdate = (recipe: Recipe) => { // Use Recipe type here
    navigate("/updateRecipe", { state: { recipe } });
  };

  const handleDelete = async (recipeId: string) => { // Use string for recipeId
    try {
      const response = await axios.delete(
        `/api/v1/delete/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        fetchRecipes();
      } else {
        console.error("Error deleting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="recipe-listing-page bg-gray-100 min-h-screen">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">All Recipes</h1>

        {user ? null : (
          <p className="text-red-500 mb-4">Please login to view recipes</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="recipe-card bg-white p-4 rounded-md shadow-md"
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  Ingredients: {recipe.ingredients}
                </p>
                <p className="text-gray-600 mb-2">
                  Instructions: {recipe.instructions}
                </p>
                <p className="text-gray-600 mb-2">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(recipe)} // Call handleUpdate with typed recipe
                    className="text-green-500 hover:underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)} // Pass the recipe's _id
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeListing;
