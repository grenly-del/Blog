import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaImage } from 'react-icons/fa'; // Import ikon gambar

interface Recipe {
  _id: string;
  name: string;
  imageUrl: string;
  cookingTime: number;
  ingredients: string[];
  instructions: string;
}

const SavedRecipes: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const userId = 'user_id'; // Replace with the actual user ID

  useEffect(() => {
    // Fetch the user's saved recipes from the server
    axios.get(`http://localhost:7000/api/v1/${userId}`)
      .then((response) => {
        setSavedRecipes(response.data.savedRecipes);
      })
      .catch((error) => {
        console.error('Error fetching saved recipes:', error);
      });
  }, [userId]);

  return (
    <div className="saved-recipes-page">
      <div className="max-w-[1520px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Saved Recipes</h1>

        {savedRecipes.length === 0 ? (
          <p>No saved recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image Section */}
                <div className="relative w-full h-[200px] bg-gray-300 flex justify-center items-center">
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaImage className="text-white text-5xl" /> // Fallback icon when no image
                  )}
                </div>

                {/* Recipe Details */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                  <p className="text-gray-600 mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
                  <p className="text-gray-600 mb-2">Ingredients: {recipe.ingredients.join(', ')}</p>
                  <p className="text-gray-600">Instructions: {recipe.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
