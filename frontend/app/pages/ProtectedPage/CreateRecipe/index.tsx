import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import RequestAxios from "../../../config/axiosConfig";
import { FaCamera } from "react-icons/fa"; // Import Icon from react-icons

// Define the form data type
interface FormData {
  name: string;
  ingredients: string;
  instructions: string;
  cookingTime: string;
  imageUrl: File | null;
}

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();

  // Define formData state with the proper type
  const [formData, setFormData] = useState<FormData>({
    name: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    imageUrl: null, // Change to accept File object
  });

  // Define handleChange type
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, imageUrl: file });
  };

  // Define handleSubmit type
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.cookingTime || !formData.imageUrl) {
      alert("Please fill out all required fields");
      return;
    }

    const ingredients = formData.ingredients
      ? formData.ingredients.split(",").map((ingredient) => ingredient.trim())
      : [];

    const instructions = formData.instructions
      ? formData.instructions.trim()
      : "";

    // Create a FormData object to send the data including the image
    const form = new FormData();
    form.append("name", formData.name);
    form.append("ingredients", JSON.stringify(ingredients)); // Convert array to string
    form.append("instructions", instructions);
    form.append("cookingTime", formData.cookingTime);

    // Add image file to FormData
    if (formData.imageUrl) {
      form.append("image", formData.imageUrl);
    } else {
      alert("Please upload an image.");
      return;
    }

    try {
      const response = await RequestAxios.post("/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Recipe created successfully");
        navigate("/"); // Redirect after successful creation
      } else {
        console.log("Recipe creation failed");
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);

      if (error instanceof AxiosError) {
        console.error(
          "Server returned an error with status:",
          error.response?.status
        );
        console.error("Error data:", error.response?.data);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  };

  return (
    <div className="create-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          Create Recipe
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Recipe Name
            </label>
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
            <label className="block text-gray-600 font-semibold mb-2">
              Ingredients (comma-separated)
            </label>
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
            <label className="block text-gray-600 font-semibold mb-2">
              Instructions
            </label>
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
            <label className="block text-gray-600 font-semibold mb-2">
              Cooking Time (minutes)
            </label>
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
            <label className="block text-gray-600 font-semibold mb-2">
              Image
            </label>
            {/* Custom Input Style for Image */}
            <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
              <FaCamera className="text-gray-500 text-4xl" />
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
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
