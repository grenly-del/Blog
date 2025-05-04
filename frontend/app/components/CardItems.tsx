import React from 'react';
import Cookies from "js-cookie";

interface CardItemParams {
  nama_resep: string;
  nama_pembuat: string;
  id_item: string;
  img: string;
  isUser?: string
}

const CardItems: React.FC<CardItemParams> = ({ 
  nama_pembuat, 
  nama_resep, 
  id_item, 
  img,
  isUser
}) => {

  return (
    <section className="relative bg-white w-[300px] rounded-xl overflow-hidden shadow-lg shadow-gray-200">
      <div className="text-color-txt relative">
        <div className="w-full h-[198px] rounded-b-xl overflow-hidden">
          <img src={img} alt={nama_resep} className="w-full hover:scale-105 transition-all duration-200" />
        </div>
        <div className="px-5 py-3">
        <h3 className="text-lg mb-1 font-bold text-gray-900 ">{nama_resep}</h3>
          <p className="text-sm text-gray-600 mb-2">
                  <strong>Dibuat oleh:</strong> {nama_pembuat}
                </p>
          <button className="text-sm text-primary mt-7 cursor-pointer">{'Lihat >> '}</button>
        </div>
        {isUser === "true" && (
          <div className="flex items-center gap-x-5 absolute bottom-5 right-3">
            <button 
              className="cursor-pointer"
            >
              <img src="./icons/updateIcon.svg" alt="Update" width={16} />
            </button>
            <button 
              className="cursor-pointer"
            >
              <img src="./icons/deleteIcon.svg" alt="Delete" width={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardItems;
