import React, { useState, useEffect } from 'react';
import { getUserIdFromToken } from '../../Api/jwtdecode';
import { organization } from '../../Api/api';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddOrganization = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    maxGuestCount: '',
    categoryId: '',
    cityId: '',
    districtId: '',
    services: '',
    duration: '',
    isOutdoor: false,
    reservationNote: '',
    cancelPolicy: '',
    videoUrl: ''
  });

  const [companyId, setCompanyId] = useState('');
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [images, setImages] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    const id = getUserIdFromToken();
    setCompanyId(id);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5268/api/Category/OrganizationGetAll")
      .then(res => setCategories(res.data.data || []))
      .catch(console.error);

    axios.get("http://localhost:5268/api/City/CityGetAll")
      .then(res => setCities(res.data.data || []))
      .catch(console.error);
  }, []);

  // 🔁 İl seçildiğinde ilçeleri çekmek için POST isteği:
  useEffect(() => {
    if (formData.cityId) {
      axios.post("http://localhost:5268/api/District/GetAllDisctrictByCity", {
        cityId: parseInt(formData.cityId)
      })
        .then(res => setDistricts(res.data.data || []))
        .catch(console.error);
    } else {
      setDistricts([]);
    }
  }, [formData.cityId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => setImages(e.target.files);
  const handleCoverChange = (e) => setCoverPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyId) return alert("Kullanıcı ID alınamadı.");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("companyId", companyId);
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }
    if (coverPhoto) data.append("coverPhoto", coverPhoto);

    try {
      await organization.add(data);
      alert("Organizasyon başarıyla eklendi");
    } catch (error) {
      console.error(error);
      alert("Hata oluştu");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Organizasyon Ekle</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Diğer form alanları */}
          <div className="mb-3">
            <label className="form-label">Başlık</label>
            <input className="form-control" name="title" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Açıklama</label>
            <textarea className="form-control" name="description" onChange={handleChange} required />
          </div>

          {/* Fiyat, Katılımcı */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Fiyat</label>
              <input type="number" className="form-control" name="price" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Maksimum Katılımcı</label>
              <input type="number" className="form-control" name="maxGuestCount" onChange={handleChange} required />
            </div>
          </div>

          {/* Kategori */}
          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <select className="form-select" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
              <option value="">Kategori Seçiniz</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Şehir ve İlçe */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Şehir</label>
              <select className="form-select" name="cityId" value={formData.cityId} onChange={handleChange}>
                <option value="">Şehir Seçiniz</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.cityName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">İlçe</label>
              <select className="form-select" name="districtId" value={formData.districtId} onChange={handleChange}>
                <option value="">İlçe Seçiniz</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{d.districtName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Diğer form alanları */}
          <div className="mb-3">
            <label className="form-label">Hizmetler</label>
            <input className="form-control" name="services" onChange={handleChange} placeholder="Virgülle ayırınız" />
          </div>

          <div className="mb-3">
            <label className="form-label">Süre</label>
            <input className="form-control" name="duration" onChange={handleChange} />
          </div>

          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" name="isOutdoor" checked={formData.isOutdoor} onChange={handleChange} />
            <label className="form-check-label">Açık Hava Organizasyonu</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Rezervasyon Notu</label>
            <input className="form-control" name="reservationNote" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">İptal Politikası</label>
            <input className="form-control" name="cancelPolicy" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Tanıtım Videosu</label>
            <input className="form-control" name="videoUrl" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Galeri Görselleri</label>
            <input className="form-control" type="file" multiple accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Kapak Fotoğrafı</label>
            <input className="form-control" type="file" accept="image/*" onChange={handleCoverChange} />
          </div>

          <button type="submit" className="btn btn-primary">Organizasyonu Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrganization;
