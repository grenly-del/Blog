import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UpdateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const recipe = location.state?.recipe; // Access the recipe from location state

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: 0,
    imageUrl: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        _id: recipe._id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cookingTime: recipe.cookingTime,
        imageUrl: recipe.imageUrl,
      });
    }
  }, [recipe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const authToken = user ? user.token : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://recipe-server-kidx.onrender.com/api/v1/update/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Recipe updated:', response.data);
      navigate('/all');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="update-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Update Recipe</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Recipe Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-orange-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ingredients (comma-separated)</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-700"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-700"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Cooking Time (minutes)</label>
            <input
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-orange-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-orange-700"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="mt-2 max-w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-700 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
