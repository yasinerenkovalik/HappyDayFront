import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { organization } from '../../Api/api';

import './OrganizationDetail.css';

const API_BASE_URL = 'http://localhost:5268/api';

const OrganizationDetail = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    organization.getWithImages(id)
      .then(res => {
        if (res.data && res.data.data) {
          setOrganization(res.data.data);
          setSelectedImage(res.data.data.imageUrls[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!organization) return <p>Yükleniyor...</p>;

  return (
    <div className="org-detail-container">
      <div className="org-left">
        <img
          src={`http://localhost:5268${selectedImage}`}
          alt="Kapak Görseli"
          className="main-image"
        />

        <div className="thumbnail-gallery">
          {organization.imageUrls.map((url, i) => (
            <img
              key={i}
              src={`http://localhost:5268${url}`}
              alt={`Resim ${i + 1}`}
              className={`thumb ${selectedImage === url ? 'active' : ''}`}
              onClick={() => setSelectedImage(url)}
            />
          ))}
        </div>

        <h2>{organization.title}</h2>
        <p>{organization.description}</p>
        <p><strong>Kapasite:</strong> {organization.maxGuestCount} kişi</p>
        <p><strong>Kişi Başı:</strong> {organization.price} ₺</p>
      </div>

      <div className="org-right">
        <h3>İletişim Formu</h3>
        <form>
          <input placeholder="Ad Soyad" />
          <input placeholder="E-posta" />
          <input placeholder="Telefon" />
          <input placeholder="Tahmini Düğün Tarihi" />
          <input placeholder="Tahmini Davetli Sayısı" />
          <textarea placeholder="Fiyat, kapasite, menü gibi sorularınızı yazın..." />
          <div className="checkbox-area">
            <input type="checkbox" id="sozlesme" />
            <label htmlFor="sozlesme">Sözleşmeleri okudum, kabul ediyorum</label>
          </div>
          <button type="submit">Ücretsiz Teklif Al</button>
        </form>
      </div>
    </div>
  );
};

export default OrganizationDetail;
