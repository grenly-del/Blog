import React from 'react';
import Cookies from "js-cookie";

interface CardItemParams {
  nama_resep: string;
  nama_pembuat: string;
  id_item: string;
  img: string;
  onUpdate?: () => void;
  onDelete?: () => void;
  onDetail?: () => void; // Tambahan prop
}

const CardItems: React.FC<CardItemParams> = ({ 
  nama_pembuat, 
  nama_resep, 
  id_item, 
  img, 
  onUpdate, 
  onDelete,
  onDetail
}) => {
  const token: any = Cookies.get('auth_token') || '';

  return (
    <section className="relative bg-white w-[300px] rounded-xl overflow-hidden shadow-lg shadow-gray-200">
      <div className="text-color-txt relative">
        <div className="w-full h-[198px] rounded-b-xl overflow-hidden">
          <img src={img} alt={nama_resep} className="w-full hover:scale-105 transition-all duration-200" />
        </div>
        <div className="px-5 py-3">
          <h1 className="text-lg font-bold">{nama_resep}</h1>
          <p className="text-sm font-semibold mt-2">Dibuat Oleh : <span className="font-normal">{nama_pembuat}</span></p>
          <button 
            className="text-sm text-primary mt-7 cursor-pointer"
            onClick={onDetail} // Memicu detail
          >
            {'Selengkapnya >> '}
          </button>
        </div>
        {token.length > 0 && (
          <div className="flex items-center gap-x-5 absolute bottom-3 right-3">
            <button className="cursor-pointer" onClick={onUpdate}>
              <img src="./icons/updateIcon.svg" alt="Update" width={15} />
            </button>
            <button className="cursor-pointer" onClick={onDelete}>
              <img src="./icons/deleteIcon.svg" alt="Delete" width={13} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardItems;
