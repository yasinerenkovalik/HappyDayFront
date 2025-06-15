// React Component: OrganizationList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrganizations } from '../api/api'; // ✅ API fonksiyonu

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizations()
      .then(res => {
        console.log("Gelen veri:", res.data); // görsel kontrol için
        if (Array.isArray(res.data.data)) {
          setOrganizations(res.data.data);
          console.log(setOrganizations) // ✅ sadece organization array'ini al
        } else {
          console.warn("Veri beklenmedik formatta:", res.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {organizations.map(org => (
        <div key={org.id} style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          backgroundColor: '#fff'
        }}>
         
          <div style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px' }}>{org.title}</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4CAF50' }}>{org.price} ₺</p>
            <button
              onClick={() => navigate(`/organizationdetail/${org.id}`)}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Detay
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationList;
