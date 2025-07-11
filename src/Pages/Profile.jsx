import React, { useEffect, useState } from "react";
import { user as userApi } from "../Api/api";
import { getUserIdFromToken } from "../Api/jwtdecode";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();
    userApi.getById(userId)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profil bilgisi alınamadı:", err));
  }, []);

  if (!user) return <div className="loading">Yükleniyor...</div>;

  const company = user.data.company;
  const organizations = user.data.organizations;

  return (
    <div className="profile-layout">
      <div className="left-panel">
        <div className="profile-avatar-section">
          <img
            className="avatar"
            src={user.data.avatarUrl || "https://bootdey.com/img/Content/avatar/avatar7.png"}
            alt="Profil"
          />
          <h2>{user.data.name} {user.data.lastName}</h2>
          <p className="role-label">{user.data.role}</p>
      
        </div>

        <div className="contact-box">
          <h4>İletişim ve asd</h4>
          <p><strong>Email:</strong> {company.email}</p>
          <p><strong>Telefon:</strong> {company.phone}</p>
          <p><strong>Adres:</strong> {company.address}</p>
          <p><strong>Website:</strong> {company.website}</p>
          <p><strong>Instagram:</strong> {company.instagram}</p>
        </div>
      </div>

      <div className="center-panel">
        <div className="company-info-card">
          <h3>Firma Bilgileri</h3>
          <p><strong>Firma Adıas:</strong> {company.name}</p>
          <p><strong>Kategori:</strong> {company.category}</p>
          <p><strong>Hizmet Açıklaması:</strong> {company.description}</p>
          <button className="btn-secondary">Profili Düzenle</button>
        </div>

        <div className="organization-section">
          <h3>Organizasyonlarım</h3>
          {organizations.map(org => (
            <div key={org.id} className="organization-card">
              <img src={org.imageUrl} alt="org" />
              <div>
                <h4>{org.title}</h4>
                <p>{org.description}</p>
                <button className="btn-primary">Profili Gör</button>
              </div>
            </div>
          ))}
          <button className="btn-success">+ Organizasyon Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;