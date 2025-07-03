import React, { useEffect, useState } from 'react';
import { organization } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import './OrganizationList.css';
import axios from 'axios';

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]); // 🔁 şehirler için state
  const [selectedCat, setSelectedCat] = useState('');
  const [isOutdoor, setIsOutdoor] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const fetchFilteredOrganizations = () => {
    const filters = {
      categoryId: selectedCat || undefined,
      isOutdoor: isOutdoor !== '' ? isOutdoor : undefined,
      maxPrice: maxPrice || undefined,
      cityId: selectedCity || undefined,
    };

    organization.getFiltered(filters)
      .then(res => {
        setOrganizations(res.data.data || []);
      })
      .catch(console.error);
  };

  useEffect(() => {
    // Kategorileri getir
    axios.get("http://localhost:5268/api/Category/OrganizationGetAll")
      .then(res => setCategories(res.data.data || []))
      .catch(console.error);

    // 🔁 Şehirleri getir
    axios.get("http://localhost:5268/api/City/CityGetAll")
      .then(res => setCities(res.data.data || []))
      .catch(console.error);

    fetchFilteredOrganizations();
  }, []);

  useEffect(() => {
    fetchFilteredOrganizations();
  }, [selectedCat, isOutdoor, maxPrice, selectedCity]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sol Filtre Paneli */}
        <div className="col-md-3 mb-4">
          <h5 className="mb-3">Filtrele</h5>

          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <select className="form-select" value={selectedCat} onChange={e => setSelectedCat(e.target.value)}>
              <option value="">Tümü</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Şehir</label>
            <select className="form-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
              <option value="">Tümü</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.cityName}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Açık Alan</label>
            <select className="form-select" value={isOutdoor} onChange={e => setIsOutdoor(e.target.value)}>
              <option value="">Tümü</option>
              <option value="true">Evet</option>
              <option value="false">Hayır</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Maksimum Fiyat</label>
            <input
              type="number"
              className="form-control"
              value={maxPrice}
              placeholder="5000"
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Sağ Liste Görünümü */}
        <div className="col-md-9">
          {organizations.map((org) => (
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

          {organizations.length === 0 && (
            <div className="text-muted text-center">Filtreye uygun organizasyon bulunamadı.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationList;
