import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { organization, categoryApi, IMAGE_BASE_URL } from '../../Api/api';
import { CiTrash } from "react-icons/ci";

const OrganizationEdit = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    maxGuestCount: 0,
    categoryId: '',
    location: '',
    services: [],
    duration: '',
    isOutdoor: false,
    reservationNote: '',
    cancelPolicy: '',
    videoUrl: '',
    companyId: ''
  });
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [organizationImages, setOrganizationImages] = useState([]);
  const [newImage, setNewImage] = useState(null);

  // Kategorileri çek
  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Kategori verisi alınamadı", err);
    }
  };

  // Organizasyon bilgilerini çek
  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await organization.getWithImages(id);
        const org = res.data.data;

        if (!org) return alert("Veri bulunamadı.");

        setFormData({
          title: org.title || '',
          description: org.description || '',
          price: org.price || 0,
          maxGuestCount: org.maxGuestCount || 0,
          categoryId: org.categoryId?.toString() || '',
          location: org.location || '',
          services: org.services || [],
          duration: org.duration || '',
          isOutdoor: org.isOutdoor || false,
          reservationNote: org.reservationNote || '',
          cancelPolicy: org.cancelPolicy || '',
          videoUrl: org.videoUrl || '',
          companyId: org.companyId || ''
        });

        if (org.coverPhotoPath) {
          setCoverPreview(`${IMAGE_BASE_URL}${org.coverPhotoPath}`);
        }

        setOrganizationImages(org.images || []);
      } catch (err) {
        console.error("Veri çekme hatası:", err);
        alert("Veri çekilemedi.");
      }
    };

    fetchCategories();
    fetchOrg();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceChange = (e) => {
    setFormData({ ...formData, services: e.target.value.split(',') });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhoto(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('Id', id);
    data.append('Title', formData.title);
    data.append('Description', formData.description);
    data.append('Price', String(formData.price));
    data.append('MaxGuestCount', String(formData.maxGuestCount));
    data.append('CategoryId', formData.categoryId);
    data.append('Location', formData.location);
    data.append('Duration', formData.duration);
    data.append('IsOutdoor', String(formData.isOutdoor));
    data.append('ReservationNote', formData.reservationNote);
    data.append('CancelPolicy', formData.cancelPolicy);
    data.append('VideoUrl', formData.videoUrl);
    data.append('CompanyId', formData.companyId);

    formData.services.forEach(s => data.append('Services', s));

    if (coverPhoto) {
      data.append('CoverPhoto', coverPhoto);
    }

    try {
      await organization.edit(data);
      alert("Organizasyon başarıyla güncellendi!");
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Güncelleme başarısız.");
    }
  };

  const handleDeleteImage = async (imageId) => {
    const confirmDelete = window.confirm("Bu görseli silmek istediğinize emin misiniz?");
    if (!confirmDelete) return;

    try {
      await organization.deleteImage(imageId);
      setOrganizationImages(prev => prev.filter(img => img.id !== imageId));
      alert("Görsel silindi!");
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("Görsel silinemedi.");
    }
  };

  const handleAddImage = async () => {
    if (!newImage) return alert("Lütfen bir görsel seçin.");

    const formData = new FormData();
    formData.append('OrganizationId', id);
    formData.append('OrganizationImage', newImage);

    try {
      await organization.addImage(formData);
      alert("Görsel başarıyla yüklendi.");

      const res = await organization.getWithImages(id);
      setOrganizationImages(res.data.data.images || []);
      setNewImage(null);
    } catch (err) {
      console.error("Yükleme hatası:", err);
      alert("Görsel yüklenemedi.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Organizasyon Güncelle</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" value={formData.title} onChange={handleChange} className="form-control my-2" placeholder="Başlık" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control my-2" placeholder="Açıklama" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} className="form-control my-2" placeholder="Fiyat" />
        <input name="maxGuestCount" type="number" value={formData.maxGuestCount} onChange={handleChange} className="form-control my-2" placeholder="Max Katılımcı" />

        {/* Kategori Dropdown */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="form-select my-2"
        >
          <option value="">Kategori Seçin</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input name="location" value={formData.location} onChange={handleChange} className="form-control my-2" placeholder="Lokasyon" />
        <input name="duration" value={formData.duration} onChange={handleChange} className="form-control my-2" placeholder="Süre" />
        <textarea name="reservationNote" value={formData.reservationNote} onChange={handleChange} className="form-control my-2" placeholder="Rezervasyon Notu" />
        <textarea name="cancelPolicy" value={formData.cancelPolicy} onChange={handleChange} className="form-control my-2" placeholder="İptal Politikası" />
        <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="form-control my-2" placeholder="Video URL" />
        <input type="text" name="services" value={formData.services.join(',')} onChange={handleServiceChange} placeholder="Hizmetler (virgülle ayır)" className="form-control my-2" />

        <div className="form-check mb-2">
          <input type="checkbox" name="isOutdoor" checked={formData.isOutdoor} onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">Açık Hava</label>
        </div>

        <div className="mb-3">
          <label>Kapak Fotoğrafı:</label><br />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Kapak"
              style={{ maxWidth: '100%', height: '150px', objectFit: 'cover' }}
            />
          )}
          <input type="file" name="coverPhoto" accept="image/*" onChange={handleCoverChange} className="form-control mt-2" />
        </div>

        <button type="submit" className="btn btn-success">Güncelle</button>
      </form>

      <div className="mt-4">
        <h5>Yüklenmiş Görseller</h5>
        <div className="d-flex gap-3 flex-wrap">
          {organizationImages.map((img) => (
            <div key={img.id} style={{ position: 'relative' }}>
              <img
                src={`http://localhost:5268${img.imageUrl}`}
                alt="organizasyon"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(img.id)}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'white',
                  color: 'red',
                  border: '1px solid red',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px'
                }}
                title="Görseli Sil"
              >
                <CiTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-5" />
      <h5>Yeni Görsel Ekle</h5>
      <div className="d-flex align-items-center gap-3 mb-5">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
          className="form-control"
          style={{ maxWidth: '300px' }}
        />
        <button
          className="btn btn-success"
          onClick={handleAddImage}
          disabled={!newImage}
        >
          Görseli Ekle
        </button>
      </div>
    </div>
  );
};

export default OrganizationEdit;
