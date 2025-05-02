
import '../styles/style.css';
 // Import CSS file for styling
export default function Dashboard() {
  return (
    <div>
        <div>
  <header className="topbar">
    <div className="logo">DiagnoAI</div>
    <div className="user">Grantly <span className="dot" /></div>
  </header>
  <main className="container">
    <section className="section-header">
      <div className="section-title">
        <span className="icon">☰</span>
        <h2>RESEP DIBUAT</h2>
      </div>
      <button className="btn-add">+ Buat Resep</button>
    </section>
    <section className="cards-grid">
      {/* Card resep */}
      <div className="card">
        <img src="https://source.unsplash.com/200x130/?nasi-goreng" alt="Nasi Goreng" />
        <div className="card-body">
          <h3>Nasi Goreng - Terenak</h3>
          <p><strong>Dibuat oleh:</strong> Grantly Sorongan</p>
          <a href="#">Selengkapnya &gt;&gt;</a>
          <div className="card-actions">
            <span className="edit">✎</span>
            <span className="delete">🗑️</span>
          </div>
        </div>
      </div>
      {/* Duplikat sesuai jumlah kartu */}
      {/* Tambahkan lebih banyak card sesuai kebutuhan */}
    </section>
    <div className="pagination">
      <button className="active">1</button>
      <button>2</button>
      <button>3</button>
    </div>
  </main>
</div>

    </div>
  );
}