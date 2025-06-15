// React Component: OrganizationDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5268/api';

const OrganizationDetail = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/Organization/GetOrganizationWithImages?Id=${id}`)
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '40px', justifyContent: 'center' }}>
      <div style={{ flex: '1 1 500px' }}>
        {/* Ana Görsel */}
        <img
          src={`http://localhost:5268${selectedImage}`}
          alt="Seçilen"
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />

        {/* Küçük Görseller */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginTop: '10px' }}>
          {organization.imageUrls.map((url, index) => (
            <img
              key={index}
              src={`http://localhost:5268${url}`}
              alt={`Resim ${index + 1}`}
              style={{ height: '80px', width: '120px', borderRadius: '4px', cursor: 'pointer', objectFit: 'cover', border: selectedImage === url ? '2px solid #007BFF' : '1px solid #ccc' }}
              onClick={() => setSelectedImage(url)}
            />
          ))}
        </div>

        <h1 style={{ marginTop: '20px' }}>{organization.title}</h1>
        <p>{organization.description}</p>
        <p><strong>Kapasite:</strong> {organization.maxGuestCount} kişi</p>
        <p><strong>Kişi Başı:</strong> {organization.price} ₺</p>
      </div>

      <div style={{ flex: '1 1 350px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h3>İletişim Formu</h3>
        <form>
          <input placeholder="Ad Soyad" style={inputStyle} /><br />
          <input placeholder="E-posta" style={inputStyle} /><br />
          <input placeholder="Telefon" style={inputStyle} /><br />
          <input placeholder="Tahmini Düğün Tarihi" style={inputStyle} /><br />
          <input placeholder="Tahmini Davetli Sayısı" style={inputStyle} /><br />
          <textarea placeholder="Fiyat, kapasite, menü gibi sorularınızı yazın..." style={{ ...inputStyle, height: '80px' }} />
          <div style={{ margin: '10px 0' }}>
            <input type="checkbox" id="sozlesme" /> <label htmlFor="sozlesme">Sözleşmeleri okudum, kabul ediyorum</label>
          </div>
          <button style={{ ...inputStyle, backgroundColor: '#e91e63', color: 'white', cursor: 'pointer' }}>
            Ücretsiz Teklif Al
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '5px 0',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

export default OrganizationDetail;