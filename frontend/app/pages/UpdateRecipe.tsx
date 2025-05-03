import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const UpdateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const recipe = location.state?.recipe; // Mendapatkan data resep yang dikirimkan

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

  useEffect(() => {
    if (recipe) {
      setFormData({
        _id: recipe._id,
        name: recipe.name,
        ingredients: recipe.ingredients.join(", "),
        instructions: recipe.instructions,
        cookingTime: recipe.cookingTime,
        imageUrl: recipe.imageUrl,
      });
    }
  }, [recipe]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const authToken = user ? user.token : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let finalImageUrl = formData.imageUrl;

      // Jika ada file gambar yang diunggah, lakukan upload
      if (imageFile) {
        if (!imageFile.type.startsWith("image/")) {
          toast.error("Please upload a valid image file.");
          return;
        }

        const formDataImg = new FormData();
        formDataImg.append("file", imageFile);
        formDataImg.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Ganti dengan upload preset yang benar
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // Ganti dengan Cloudinary cloud name Anda
          formDataImg
        );
        finalImageUrl = uploadRes.data.secure_url;
      }

      const updatedData = {
        ...formData,
        imageUrl: finalImageUrl,
        ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      };

      await axios.put(
        `http:localhost:3005/api/v1/update/${formData._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Recipe updated successfully!");
      navigate("/all"); // Mengarahkan kembali ke halaman daftar resep setelah berhasil update
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe.");
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
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Update Recipe</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          {/* Recipe Name */}
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

          {/* Cooking Time */}
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

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Image</label>

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
