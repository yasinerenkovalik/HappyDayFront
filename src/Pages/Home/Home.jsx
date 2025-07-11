import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { organization } from '../../Api/api'; // 🔁 burası önemli

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    organization.getFeatured()
      .then(res => {
        if (res.data.isSuccess) {
          setFeatured(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="home-wrapper">
      {/* HERO */}
      <section className="hero d-flex align-items-center justify-content-between">
        <div className="hero-content">
          <h1 className="display-5 fw-bold">Hayalinizdeki Etkinliği Planlayın</h1>
          <p className="lead">MutluGünüm ile düğün, kına, nişan ve özel gün organizasyonlarını kolayca bulun.</p>
          <Link to="/organizationlist" className="btn btn-primary btn-lg mt-3">Organizasyonları Keşfet</Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-img.svg" alt="Hero" className="img-fluid" />
        </div>
      </section>

      {/* ÖNE ÇIKANLAR */}
      <section className="featured py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Editörün Seçimi</h2>
          <div className="row">
            {featured.map(org => (
              <div className="col-md-4 mb-4" key={org.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:5268${org.coverPhotoPath}`}
                    alt={org.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{org.title}</h5>
                    <p className="card-text text-muted">
                      {org.description?.length > 80
                        ? org.description.slice(0, 80) + '...'
                        : org.description}
                    </p>
                    <Link to={`/organizationdetail/${org.id}`} className="btn btn-sm btn-outline-primary">
                      Detayları Gör
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
