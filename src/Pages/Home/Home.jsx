import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Hayalinizdeki Etkinliği Planlayın</h1>
          <p>MutluGünüm ile düğün, kına, nişan ve özel gün organizasyonlarını kolayca bulun.</p>
          <Link to="/organizationlist" className="hero-btn">Organizasyonları Keşfet</Link>
        </div>
        <div className="hero-image" />
      </section>

      {/* KATEGORİLER */}
      <section className="categories">
        <h2>Hizmet Kategorileri</h2>
        <div className="category-grid">
          <CategoryCard title="Düğün Mekanları" />
          <CategoryCard title="Kına Gecesi" />
          <CategoryCard title="Catering" />
          <CategoryCard title="Fotoğraf & Video" />
        </div>
      </section>

      {/* NEDEN MUTLUGÜNÜM */}
      <section className="why-us">
        <h2>Neden MutluGünüm?</h2>
        <ul>
          <li>📍 Türkiye genelinde yüzlerce firma</li>
          <li>💬 Gerçek kullanıcı yorumları</li>
          <li>📸 Görsel ve detaylı tanıtımlar</li>
          <li>💌 Hızlı teklif alma ve iletişim</li>
        </ul>
      </section>
    </div>
  );
};

const CategoryCard = ({ title }) => (
  <div className="category-card">
    <h3>{title}</h3>
    <p>Hemen keşfet →</p>
  </div>
);

export default Home;
