import React, { useState } from 'react';
import CardItems from '~/components/CardItems';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import './swiper.css'
import 'swiper/css';


export default function Dashboard() {
  const [popupActive, setPopupActive] = useState(false);
  const pagination = {
    clickable: true
  };

  const cards = [
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    {
      nama_pembuat: 'Grantly Sorongan',
      nama_resep: 'Nasi Goreng',
      img: './images/nasi-goreng.jpeg',
      id_item: '124',
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ];

  return (
    <div>
      <header className="flex justify-between items-center px-10 py-5 bg-white relative">
        <div className="text-3xl font-bold">DiagnoAI</div>
        <div className="text-base text-gray-800 font-semibold gap-x-3 flex items-center">
          <p>Grantly</p>
          <button onClick={() => setPopupActive(!popupActive)} className="cursor-pointer">
            <img src="./icons/userIcon.svg" alt="" width={40} />
          </button>
        </div>
        {popupActive && (
          <div className="w-[250px] flex items-center justify-between px-5 py-2 bg-white border-[0.5px] border-gray-100 right-10 top-20 absolute hover:bg-gray-50 cursor-pointer">
            <p className="text-[#D73434]">Keluar</p>
            <img src="./icons/iconOut.svg" alt="" />
          </div>
        )}
      </header>

      <main className="px-10 py-5">
        <section className="flex justify-between items-center mb-5">
          <div className="flex items-center text-orange-500">
            <span className="mr-2">☰</span>
            <h2 className="text-xl font-semibold">RESEP KAMU</h2>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            + Buat Resep
          </button>
        </section>

        <section className="w-full">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            spaceBetween={10}
            pagination={pagination}
            grid={{ rows: 2, fill: 'row' }}
            modules={[Pagination, Grid]}
            className="mySwiper"

          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <CardItems
                  nama_pembuat={card.nama_pembuat}
                  nama_resep={card.nama_resep}
                  img={card.img}
                  id_item={card.id_item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* PAGINATION */}
      </main>
    </div>
  );
}

// <div className="flex justify-center my-5">
// <button className="bg-orange-500 text-white px-3 py-1 mx-1 rounded">1</button>
// <button className="bg-gray-300 px-3 py-1 mx-1 rounded">2</button>
// <button className="bg-gray-300 px-3 py-1 mx-1 rounded">3</button>
// </div>
