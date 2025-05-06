import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import RequestAxios from "../../../config/axiosConfig";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import MultiInput from "~/components/MultiInput";
import { useAppSelector } from "~/redux/store";

interface FormData {
  name: string;
  ingredients: string;
  instructions: string;
  cookingTime: string;
  iamge: File | null;
}

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const tags = useAppSelector(state => state.tags)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    iamge: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, iamge: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.cookingTime || !formData.iamge) {
      alert("Please fill out all required fields");
      return;
    }

    const ingredients = formData.ingredients

    const instructions = formData.instructions
      ? formData.instructions.trim()
      : "";

    console.log(`Ingredients : ${ingredients}`)
    const form = new FormData();
    form.append("name", formData.name);
    form.append("ingredients", ingredients);
    form.append("instructions", instructions);
    form.append("cookingTime", formData.cookingTime);

    if (formData.iamge) {
      form.append("image", formData.iamge);
    } else {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);
      const response = await RequestAxios.post(
        "http://localhost:3005/api/v1/recipe",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);

      if (response.status === 200) {
        toast.success("Recipe created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/protect-page");
      } else {
        toast.error("Recipe creation failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
      toast.error("An error occurred while creating the recipe", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ingredients: tags.value.join(',')
    }))
  }, [tags])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <div className="create-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          Create Recipe
        </h1>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/protect-page")}
          className="mb-4 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition cursor-pointer"
        >
          ← Back
        </button>

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
              Ingredients
            </label>
            <div className="w-full relative">
              <MultiInput/>
            </div>
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
            <div className="flex items-center space-x-4">
              <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
                <FaCamera className="text-gray-500 text-2xl" />
                <input
                  type="file"
                  name="iamge"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>

              {previewImage && (
                <div className="w-20 h-20 overflow-hidden rounded-lg border border-gray-300">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-orange-700 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-orange-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

{/* <textarea
name="ingredients"
value={formData.ingredients}
onChange={handleChange}
rows={4}
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-700"
required
></textarea> */}

export default CreateRecipe;
