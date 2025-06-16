import React, { useEffect, useState } from "react";
import { user as userApi } from "../Api/api"; // user yerine userApi yazdık
import { getUserIdFromToken } from "../Api/jwtdecode";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();
    userApi.getById(userId) // user yerine userApi kullandık
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profil bilgisi alınamadı:", err));
  }, []);

  if (!user) return <div>Yükleniyor...</div>;

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="avatar-container">
          <img
            className="avatar"
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt="Profile"
          />
          <label htmlFor="fileUpload" className="upload-icon">📷</label>
        </div>
        <h2>{user.data.name}</h2>
        <p>Kullanıcı</p>
        <div className="stats">
          <div><span>Katıldığı Etkinlik</span> <strong style={{ color: "orange" }}>5</strong></div>
          <div><span>Yorumlar</span> <strong style={{ color: "green" }}>3</strong></div>
          <div><span>Rezervasyonlar</span> <strong>2</strong></div>
        </div>
      </div>

      <div className="form-section">
        <h3>Hesap Bilgileri</h3>
        <form>
          <div className="form-group">
            <div className="readonly-field">{user.data.name}</div>
            <div className="readonly-field">{user.data.birtDay}</div>
          </div>
          <div className="form-group">
            <div className="readonly-field">{user.data.email}</div>
            <div className="readonly-field">{user.data.lastName}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
