// src/components/OrganizationList.jsx
import React, { useEffect, useState } from 'react';
import { organization } from '../../Api/api';
import { data, useNavigate } from 'react-router-dom';
import './OrganizationList.css';
import axios from 'axios';

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    organization.getAll()
      .then(res => {
        const data = res.data.data;
        setOrganizations(data);
        setFiltered(data);
      })
      .catch(console.error);
      console.log(data);

    axios.get("http://localhost:5268/api/Category/OrganizationGetAll")
      .then(res => setCategories(res.data.data || []))
      .catch(console.error);
      
  }, []);

  const handleFilterChange = (catId) => {
    setSelectedCat(catId);
    if (catId === '') {
      setFiltered(organizations);
    } else {
      setFiltered(organizations.filter(org => org.categoryId === catId));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sol Filtre Paneli */}
        <div className="col-md-3 mb-4">
          <h5 className="mb-3">Kategoriler</h5>
          <ul className="list-group">
            <li className={`list-group-item ${selectedCat === '' ? 'active' : ''}`}
                onClick={() => handleFilterChange('')}>Tümü</li>
            {categories.map(cat => (
              <li key={cat.id}
                  className={`list-group-item ${selectedCat === cat.id ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cat.id)}>
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ Liste Görünümü */}
        <div className="col-md-9">
          {filtered.map((org, index) => (
            <div key={org.id} className="card mb-3 shadow-sm">
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  {org.coverPhotoPath && (
                    <img
                      src={`http://localhost:5268${org.coverPhotoPath}`}
                      alt={org.title}
                      className="img-fluid rounded-start"
                      style={{ maxHeight: '180px', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title mb-1">{org.title}</h5>
                    <p className="card-text text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                      {org.description?.slice(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-success fs-5">{org.price} ₺</strong>
                        <span className="ms-3 text-muted">Max {org.maxGuestCount} kişi</span>
                      </div>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/organizationdetail/${org.id}`)}>
                        Detayları Gör
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-muted text-center">Filtreye uygun organizasyon bulunamadı.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationList;