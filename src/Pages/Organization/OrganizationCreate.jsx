import React, { useState, useEffect } from 'react';
import { getUserIdFromToken } from '../../Api/jwtdecode';
import { organization } from '../../Api/api';

const AddOrganization = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    maxGuestCount: ''
  });

  const [companyId, setCompanyId] = useState('');
  const [images, setImages] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null); // ✅ Yeni alan

  useEffect(() => {
    const id = getUserIdFromToken();
    setCompanyId(id);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleCoverChange = (e) => {
    setCoverPhoto(e.target.files[0]); // ✅ Tek dosya
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      alert("Kullanıcı ID alınamadı, giriş yapmış olmalısınız.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("maxGuestCount", formData.maxGuestCount);
    data.append("companyId", companyId);

    // ✅ Çoklu görseller
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    // ✅ Cover Photo
    if (coverPhoto) {
      data.append("coverPhoto", coverPhoto);
    }

    try {
      await organization.add(data);
      alert("Organizasyon başarıyla eklendi");
    } catch (error) {
      console.error(error);
      alert("Hata oluştu");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Organizasyon Ekle</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" placeholder="Başlık" onChange={handleChange} required /><br /><br />
        <textarea name="description" placeholder="Açıklama" onChange={handleChange} required /><br /><br />
        <input name="price" type="number" placeholder="Fiyat" onChange={handleChange} required /><br /><br />
        <input name="maxGuestCount" type="number" placeholder="Maksimum Katılımcı" onChange={handleChange} required /><br /><br />

        <label>Galeri Görselleri:</label><br />
        <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} /><br /><br />

        <label>Kapak Fotoğrafı:</label><br />
        <input type="file" name="coverPhoto" accept="image/*" onChange={handleCoverChange} /><br /><br />

        <button type="submit">Ekle</button>
      </form>
    </div>
  );
};

export default AddOrganization;
