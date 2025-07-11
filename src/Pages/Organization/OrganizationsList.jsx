import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { organization, categoryApi, cityApi, IMAGE_BASE_URL } from '../../Api/api';
import './OrganizationList.css';

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [isOutdoor, setIsOutdoor] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    categoryApi.getAll()
      .then(res => setCategories(res.data.data || []))
      .catch(console.error);

    cityApi.getCities()
      .then(res => setCities(res.data.data || []))
      .catch(console.error);

    const initialCategory = searchParams.get('category') || '';
    setSelectedCat(initialCategory);
  }, []);

  useEffect(() => {
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
  }, [selectedCat, isOutdoor, maxPrice, selectedCity]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
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

        <div className="col-md-9">
          {organizations.map((org) => (
            <div key={org.id} className="card mb-3 shadow-sm">
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  {org.coverPhotoPath && (
                    <img
                      src={`${IMAGE_BASE_URL}${org.coverPhotoPath}`}
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