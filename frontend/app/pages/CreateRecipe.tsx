import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define the form data type
interface FormData {
  name: string;
  ingredients: string;
  instructions: string;
  cookingTime: string;
  imageUrl: string;
}

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Define formData state with the proper type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    imageUrl: '',
  });

  // Define handleChange type
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const userId = user ? user._id : '';
  const authToken = user?.token || null;

  // Define handleSubmit type
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    if (!formData.name || !formData.cookingTime || !formData.imageUrl) {
      alert('Please fill out all required fields');
      return;
    }

    const ingredients = formData.ingredients
      ? formData.ingredients.split(',').map((ingredient) => ingredient.trim())
      : [];

    const instructions = formData.instructions ? formData.instructions.trim() : '';

    try {
      
      const response = await axios.post(
        'http://localhost:7000/api/v1/create',
        {
          name: formData.name,
          ingredients: ingredients,
          instructions: instructions,
          cookingTime: formData.cookingTime,
          imageUrl: formData.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Recipe created successfully');
        navigate('/'); // Redirect after successful creation
      } else {
        console.log('Recipe creation failed');
      }
    } catch (error: unknown) {
      console.error('Error occurred:', error);

      // Type guard to check if the error is an AxiosError
      if (error instanceof AxiosError) {
        console.error('Server returned an error with status:', error.response?.status);
        console.error('Error data:', error.response?.data);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  return (
    <div className="create-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Create Recipe</h1>

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
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-700 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
