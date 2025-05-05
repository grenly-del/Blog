import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axioConfig from "~/config/axiosConfig"; // Adjust the import path as necessary

const UpdateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    ingredients: "",
    instructions: "",
    cookingTime: 0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const authToken = Cookies.get("auth_token") || "";

  const fetchRecipe = async (recipeId: string) => {
    try {
      const res = await axioConfig.get(`/recipe/${recipeId}`);
      const recipe = res.data.payload.payload;
      console.log(recipe);

      setFormData({
        _id: recipe._id,
        name: recipe.name,
        ingredients: recipe.ingredients.join(", "),
        instructions: recipe.instructions,
        cookingTime: recipe.cookingTime,
        imageUrl: recipe.imageUrl,
      });
    } catch (err) {
      toast.error("Recipe not found or error fetching data");
      navigate("/protect-page");
    }
  };

  useEffect(() => {
    const stateRecipe = location.state?.recipe;
    if (stateRecipe) {
      setFormData({
        _id: stateRecipe._id,
        name: stateRecipe.name,
        ingredients: stateRecipe.ingredients.join(", "),
        instructions: stateRecipe.instructions,
        cookingTime: stateRecipe.cookingTime,
        imageUrl: stateRecipe.imageUrl,
      });
    } else if (id) {
      fetchRecipe(id);
    } else {
      toast.error("Invalid recipe ID");
      navigate("/protect-page");
    }
  }, [location.state, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.cookingTime ||
      (!formData.imageUrl && !imageFile)
    ) {
      alert("Please fill out all required fields and upload an image.");
      return;
    }

    const ingredients = formData.ingredients
      ? formData.ingredients.split(",").map((i) => i.trim())
      : [];

    const instructions = formData.instructions.trim();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("ingredients", JSON.stringify(ingredients));
    form.append("instructions", instructions);
    form.append("cookingTime", String(formData.cookingTime));

    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      setLoading(true);
      console.log("Form data:", formData);
      const response = await axioConfig.put(`/recipe/${formData._id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Recipe updated successfully!", { autoClose: 3000 });
        navigate("/protect-page");
      } else {
        toast.error("Recipe update failed", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error instanceof AxiosError) {
        console.error("Server error:", error.response?.data);
      }
      toast.error("An error occurred while updating the recipe", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, imageUrl: "" });
    setPreviewUrl("");
    setImageFile(null);
  };

  return (
    <div className="update-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          Update Recipe
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Recipe Name */}
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

          {/* Ingredients */}
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

          {/* Instructions */}
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

          {/* Cooking Time */}
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

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Image
            </label>
            {formData.imageUrl && !previewUrl ? (
              <div className="relative">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-2 max-w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  X
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                className="w-full"
              />
            )}

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-700 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              {loading ? "Updating..." : "Update Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
