import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { GetAllRecipe } from "~/redux/features/recipes";
import CardItems from "~/components/CardItems";
import { FaUtensils, FaScroll, FaClock } from "react-icons/fa";

const RecipeListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    search_data,
    loading,
    success,
  } = useAppSelector((state) => state.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(GetAllRecipe());
  }, [dispatch]);

  useEffect(() => {
      // Enable/Disable scroll on body based on popup state
      if (showPopup) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }, [showPopup]);

  const handleShowPopup = (recipe: any) => {
    setSelectedRecipe(recipe);
    setShowPopup(true);
  };

  const handleCloseDetail = () => {
    setShowPopup(false);
    setSelectedRecipe(null);
  };


  return (
    <div className="recipe-popup bg-gray-100 min-h-screen">
      <div className="w-full px-20 mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">All Recipes</h1>

        {loading && <h1>Loading...</h1>}
        {success && search_data?.length > 0 ? (
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {search_data?.map((recipe) => (
              <CardItems
                key={recipe._id}
                nama_pembuat={recipe?.userOwner?.name}
                nama_resep={recipe.name ?? ''}
                img={recipe.imageUrl ?? ''}
                id_item={recipe._id ?? ''}
                onDetail={() => handleShowPopup(recipe)}
              />
            ))}
          </div>
        ) : (
          <h1>No recipes available!</h1>
        )}
      </div>

      {/* Pop-up Detail Recipe */}
      {showPopup && selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-left space-y-6 transform transition-all duration-500 ease-in-out opacity-100 scale-100 overflow-y-auto max-h-[90vh]">
            {/* Tombol Close */}
            <button
              onClick={handleCloseDetail}
              className="absolute cursor-pointer top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              X
            </button>

            {/* Konten Pop-up */}
            <h3 className="text-3xl font-semibold text-center text-orange-600 mb-4">
              {selectedRecipe.name}
            </h3>
            <img
              src={selectedRecipe.imageUrl}
              alt={selectedRecipe.name}
              className="w-full h-60 object-cover rounded-md mb-6 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            />
            <p className="text-lg text-gray-800 mb-4">
              {selectedRecipe.description}
            </p>
            <p className="mt-4 text-sm text-gray-600 font-medium">
              By:{" "}
              <span className="text-gray-800">
                {selectedRecipe.userOwner?.name}
              </span>
            </p>

            {/* Ingredients */}
            <div className="mt-6">
              <h4 className="font-semibold text-xl text-gray-800 mb-2 flex items-center">
                <FaUtensils className="text-orange-600 mr-2" />
                Ingredients:
              </h4>
              <p className="text-lg text-gray-600">
                {Array.isArray(selectedRecipe.ingredients)
                  ? selectedRecipe.ingredients.join(", ")
                  : selectedRecipe.ingredients}
              </p>
            </div>

            {/* Instructions */}
            <div className="mt-6">
              <h4 className="font-semibold text-xl text-gray-800 mb-2 flex items-center">
                <FaScroll className="text-blue-600 mr-2" />
                Instructions:
              </h4>
              <p className="text-lg text-gray-600">
                {selectedRecipe.instructions}
              </p>
            </div>

            {/* Cooking Time */}
            <div className="mt-6">
              <h4 className="font-semibold text-xl text-gray-800 mb-2 flex items-center">
                <FaClock className="text-green-600 mr-2" />
                Cooking Time:
              </h4>
              <p className="text-lg text-gray-600">
                {selectedRecipe.cookingTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeListing;
