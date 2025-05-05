import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CardItems from "~/components/CardItems";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRecipe } from "~/redux/features/recipes";

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
  const dispatch = useAppDispatch();
  const recipesData = useAppSelector((state) => state.recipe);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    console.log(recipesData);
  }, [recipesData]);

  const fetchRecipes = async () => {
    try {
      dispatch(GetAllRecipe());
      // setRecipes(response.data);
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
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId)); // Remove deleted recipe from state
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="recipe-listing-page bg-gray-100 min-h-screen">
      <div className="w-full px-20 mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">All Recipes</h1>

        {recipesData.loading && <h1>Loading . . .</h1>}
        <>
          {recipesData.success && recipesData.data.length > 0 ? (
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {recipesData.data.map((recipe) => (
                <CardItems
                  key={recipe._id}
                  nama_pembuat={recipe?.userOwner?.name}
                  nama_resep={recipe.name ?? ""}
                  img={recipe.imageUrl ?? ""}
                  id_item={recipe._id ?? ""}
                />
              ))}
            </div>
          ) : (
            <div>
              <h1>Tidak ada resep !</h1>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default RecipeListing;
