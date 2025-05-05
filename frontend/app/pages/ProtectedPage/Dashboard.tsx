import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { GetAllRecipe } from "~/redux/features/recipes";
import { logout } from "~/redux/features/auth";
import CardItems from "~/components/CardItems";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import "./swiper.css";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [popupActive, setPopupActive] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { data: recipes, loading } = useAppSelector((state) => state.recipe);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3005/api/v1/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data?.payload ?? null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    dispatch(GetAllRecipe());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    toast.success("Berhasil Logout!");
  };

  const handleDeleteConfirmed = async () => {
    if (confirmDeleteId) {
      try {
        await axios.delete(
          `http://localhost:3005/api/v1/recipe/${confirmDeleteId}`
        );
        dispatch(GetAllRecipe());
        setConfirmDeleteId(null);
        toast.success("Resep berhasil dihapus!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("Gagal menghapus resep!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateRecipe/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 bg-white relative shadow-md">
        <div className="text-3xl font-bold">DiagnoAI</div>
        <div className="flex items-center gap-x-3 text-gray-800 font-semibold">
          <p>{user?.name || "Grantly"}</p>
          <button
            onClick={() => setPopupActive(!popupActive)}
            className="cursor-pointer"
          >
            <img src="./icons/userIcon.svg" alt="User Icon" width={40} />
          </button>
        </div>
        {popupActive && (
          <button
            onClick={handleLogout}
            className="absolute right-5 top-16 px-5 py-2 bg-white border border-gray-100 hover:bg-gray-50 rounded-md"
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
                className="w-full px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
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
            onClick={() => navigate("/createRecipe")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center cursor-pointer"
          >
            Tambah Resep
          </button>
        </section>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="loader"></div>
          </div>
        ) : recipes.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-20 text-gray-700">
            <p className="text-lg font-semibold mb-5">
              Kamu belum memiliki resep!
            </p>
            <button
              onClick={() => navigate("/createRecipe")}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
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
                {recipes.map((recipe) => (
                  <SwiperSlide key={recipe._id}>
                    <CardItems
                      key={recipe._id}
                      nama_pembuat={recipe?.userOwner?.name}
                      nama_resep={recipe.name ?? ""}
                      img={recipe.imageUrl ?? ""}
                      id_item={recipe._id ?? ""}
                      onDelete={() => setConfirmDeleteId(recipe._id)}
                      onUpdate={() => handleUpdate(recipe._id)}
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
