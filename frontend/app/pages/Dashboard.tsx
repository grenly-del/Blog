export default function Dashboard() {
  return (
    <div>
      <div>
        <header className="flex justify-between items-center px-10 py-5 bg-white">
          <div className="text-xl font-bold">DiagnoAI</div>
          <div className="text-sm flex items-center">
            Grantly <span className="ml-2 w-3 h-3 bg-gray-400 rounded-full" />
          </div>
        </header>

        <main className="px-10 py-5">
          <section className="flex justify-between items-center mb-5">
            <div className="flex items-center text-orange-500">
              <span className="mr-2">☰</span>
              <h2 className="text-xl font-semibold">RESEP DIBUAT</h2>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              + Buat Resep
            </button>
          </section>

          <section className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {/* Card resep */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
              <img
                src="https://source.unsplash.com/200x130/?nasi-goreng"
                alt="Nasi Goreng"
                className="w-full h-[130px] object-cover"
              />
              <div className="p-3 relative">
                <h3 className="text-base mb-1 font-semibold">Nasi Goreng - Terenak</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Dibuat oleh:</strong> Grantly Sorongan
                </p>
                <a href="#" className="text-xs text-orange-500 no-underline">
                  Selengkapnya &gt;&gt;
                </a>
                <div className="absolute bottom-2 right-2 flex space-x-2 text-lg cursor-pointer">
                  <span className="hover:text-gray-700">✎</span>
                  <span className="hover:text-red-500">🗑️</span>
                </div>
              </div>
            </div>
            {/* Duplikat sesuai jumlah kartu */}
          </section>

          <div className="flex justify-center my-5">
            <button className="bg-orange-500 text-white px-3 py-1 mx-1 rounded">1</button>
            <button className="bg-gray-300 px-3 py-1 mx-1 rounded">2</button>
            <button className="bg-gray-300 px-3 py-1 mx-1 rounded">3</button>
          </div>
        </main>
      </div>
    </div>
  );
}
