import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CardItems from "~/components/CardItems";

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
      <div className="w-full px-20 mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">All Recipes</h1>

        {user ? null : (
          <p className="text-red-500 mb-4">Please login to view recipes</p>
        )}
        <div className="flex justify-center gap-x-6">
          <CardItems nama_pembuat="Grantly Sorongan" nama_resep="Nasi Goreng - Terenak" img="./images/nasi-goreng.jpeg" id_item="01"/>
          <CardItems nama_pembuat="Grantly Sorongan" nama_resep="Nasi Goreng - Terenak" img="./images/nasi-goreng.jpeg" id_item="01"/>
          <CardItems nama_pembuat="Grantly Sorongan" nama_resep="Nasi Goreng - Terenak" img="./images/nasi-goreng.jpeg" id_item="01"/>
          <CardItems nama_pembuat="Grantly Sorongan" nama_resep="Nasi Goreng - Terenak" img="./images/nasi-goreng.jpeg" id_item="01"/>
        </div>
      </div>
    </div>
  );
};

export default RecipeListing;
