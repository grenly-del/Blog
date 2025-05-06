import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { GetAllRecipe, GetAllRecipeByUser } from "~/redux/features/recipes";
import CardItems from "~/components/CardItems";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { FaUtensils, FaScroll, FaClock } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import "./swiper.css";
import { logoutThunk } from "~/redux/features/logoutThunk";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipeUser = useAppSelector((state) => state.recipe);
  const navigate = useNavigate();

  const [popupActive, setPopupActive] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { data: recipes, loading } = useAppSelector((state) => state.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  const token = Cookies.get("auth_token");

  useEffect(() => {
    setUser(jwtDecode(token ?? ""));
  }, []);

  useEffect(() => {
    dispatch(GetAllRecipeByUser());
  }, []);

  useEffect(() => {
    // Enable/Disable scroll on body based on popup state
    if (showDetailPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showDetailPopup]);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    window.location.href = "/";
    toast.success("Logout Berhasil!");
  };

  const handleShowDetail = (recipe: any) => {
    setSelectedRecipe(recipe);
    setShowDetailPopup(true);
  };

  const handleCloseDetail = () => {
    setShowDetailPopup(false);
    setSelectedRecipe(null);
  };

  const handleDeleteConfirmed = async () => {
    if (confirmDeleteId) {
      try {
        await axios.delete(
          `http://localhost:3005/api/v1/recipe/${confirmDeleteId}`
        );
        setConfirmDeleteId(null);
        toast.success("Resep berhasil dihapus!");
        dispatch(GetAllRecipeByUser());
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("Gagal menghapus resep!");
      }
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/updateRecipe/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 bg-white relative shadow-md">
        <div className="text-3xl font-bold">DiagnoAI</div>
        <div className="flex items-center gap-x-3 text-gray-800 font-semibold">
          <p>{user?.username || "Grantly"}</p>
          <button onClick={() => setPopupActive(!popupActive)}>
            <img src="./icons/userIcon.svg" alt="User Icon" width={40} />
          </button>
        </div>
        {popupActive && (
          <button
            onClick={handleLogout}
            className="absolute right-5 top-16 px-5 py-2 bg-white border hover:bg-gray-50 rounded-md"
          >
            <p className="text-[#D73434]">Keluar</p>
            <img src="./icons/iconOut.svg" alt="Logout Icon" />
          </button>
        )}
      </header>

      {/* Konfirmasi Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
            <h2 className="text-lg font-semibold">Hapus Resep?</h2>
            <p className="text-sm text-gray-600">
              Apakah kamu yakin ingin menghapus resep ini?
            </p>
            <div className="flex justify-between gap-3 mt-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="w-full px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-5 py-8">
        <section className="flex justify-between items-center mb-6">
          <div className="flex items-center text-orange-500">
            <span className="mr-2">☰</span>
            <h2 className="text-xl font-semibold">RESEP KAMU</h2>
          </div>
          <button
            onClick={() => navigate("/protect-page/createRecipe")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center cursor-pointer"
          >
            Tambah Resep
          </button>
        </section>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="loader"></div>
          </div>
        ) : recipeUser.filter_data?.length == 0 ? (
          <section className="flex flex-col items-center justify-center py-20 text-gray-700">
            <p className="text-lg font-semibold mb-5">
              Kamu belum memiliki resep!
            </p>
            <button
              onClick={() => navigate("/protect-page/createRecipe")}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 cursor-pointer"
            >
              Tambahkan Resep Pertama Kamu
            </button>
          </section>
        ) : (
          <section className="w-full">
            <Swiper
              slidesPerView={1}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              spaceBetween={10}
              pagination={{ clickable: true }}
              grid={{ rows: 2, fill: "row" }}
              modules={[Pagination, Grid]}
              className="mySwiper"
            >
              <div className="flex justify-start gap-5">
                {recipeUser.filter_data?.map((recipe) => (
                  <SwiperSlide key={recipe._id}>
                    <CardItems
                      key={recipe._id}
                      nama_pembuat={recipe?.userOwner?.name}
                      nama_resep={recipe.name ?? ""}
                      img={recipe.imageUrl ?? ""}
                      id_item={recipe._id ?? ""}
                      onDelete={() => setConfirmDeleteId(recipe._id ?? "")}
                      onUpdate={() => handleUpdate(recipe._id)}
                      onDetail={() => handleShowDetail(recipe)} // Pass onDetail handler
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </section>
        )}
      </main>

      {/* Pop-up Detail Recipe */}
      {showDetailPopup && selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-left space-y-6 transform transition-all duration-500 ease-in-out opacity-100 scale-100 overflow-y-auto max-h-[90vh] popup-content">
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
                {selectedRecipe.cookingTime} Minutes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
