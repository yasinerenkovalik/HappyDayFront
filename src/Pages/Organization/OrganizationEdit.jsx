import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { organization } from '../../Api/api';
import { getUserIdFromToken } from '../../Api/jwtdecode';

const OrganizationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    maxGuestCount: '',
    categoryId: '',
    location: '',
    services: '',
    duration: '',
    isOutdoor: false,
    reservationNote: '',
    cancelPolicy: '',
    videoUrl: ''
  });
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchOrganization = async () => {
      const form = new FormData();
      form.append("Id", id);
      const res = await axios.post('http://localhost:5268/api/Organization/OrganizationGetById', form);
      const data = res.data.data;
      setFormData({
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        maxGuestCount: data.maxGuestCount,
        categoryId: data.categoryId,
        location: data.location,
        services: data.services.join(', '),
        duration: data.duration,
        isOutdoor: data.isOutdoor,
        reservationNote: data.reservationNote,
        cancelPolicy: data.cancelPolicy,
        videoUrl: data.videoUrl
      });
    };

    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5268/api/Category/OrganizationGetAll");
      setCategories(res.data.data);
    }

    fetchOrganization();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromToken();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'services') {
        value.split(',').forEach(s => data.append('Services', s.trim()));
      } else {
        data.append(key, value);
      }
    });

    data.append('CompanyId', userId);

    if (coverPhoto) data.append('CoverPhoto', coverPhoto);
    for (let i = 0; i < images.length; i++) {
      data.append('Images', images[i]);
    }

    try {
      await axios.post('http://localhost:5268/api/Organization/EditOrganization', data);
      alert('Güncelleme başarılı!');
      navigate('/company-profile');
    } catch (err) {
      console.error(err);
      alert('Hata oluştu.');
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <h3>Organizasyonu Güncelle</h3>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Başlık" className="form-control mb-2" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Açıklama" className="form-control mb-2" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Fiyat" className="form-control mb-2" required />
        <input name="maxGuestCount" type="number" value={formData.maxGuestCount} onChange={handleChange} placeholder="Max Katılımcı" className="form-control mb-2" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Lokasyon" className="form-control mb-2" required />

        <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-select mb-2">
          <option value="">Kategori Seçiniz</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input name="services" value={formData.services} onChange={handleChange} placeholder="Hizmetler (virgülle ayırın)" className="form-control mb-2" />
        <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Süre" className="form-control mb-2" />
        <input name="reservationNote" value={formData.reservationNote} onChange={handleChange} placeholder="Rezervasyon Notu" className="form-control mb-2" />
        <input name="cancelPolicy" value={formData.cancelPolicy} onChange={handleChange} placeholder="İptal Politikası" className="form-control mb-2" />
        <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Video URL" className="form-control mb-2" />
        <div className="form-check mb-2">
          <input type="checkbox" className="form-check-input" id="outdoor" name="isOutdoor" checked={formData.isOutdoor} onChange={handleChange} />
          <label className="form-check-label" htmlFor="outdoor">Açık Alan</label>
        </div>
        <label>Kapak Fotoğrafı:</label>
        <input type="file" onChange={e => setCoverPhoto(e.target.files[0])} className="form-control mb-2" />
        <label>Galeri Görselleri:</label>
        <input type="file" multiple onChange={e => setImages(e.target.files)} className="form-control mb-2" />

        <button type="submit" className="btn btn-primary w-100">Kaydet</button>
      </form>
    </div>
  );
};

export default OrganizationEdit;
