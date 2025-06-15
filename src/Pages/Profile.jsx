import React, { useEffect, useState } from "react";
import { getUserById } from "../Api/api";
import { getUserIdFromToken } from "../Api/jwtdecode";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();
    getUserById(userId)
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
            src=""
            alt="Profile"
          />
          <label htmlFor="fileUpload" className="upload-icon">
            📷
          </label>
         
        </div>
        <h2>{user.data.name} </h2>
        <p>CEO of Apple</p>
        <div className="stats">
          <div>
            <span>Opportunities applied</span>{" "}
            <strong style={{ color: "orange" }}>32</strong>
          </div>
          <div>
            <span>Opportunities won</span>{" "}
            <strong style={{ color: "green" }}>26</strong>
          </div>
          <div>
            <span>Current opportunities</span> <strong>6</strong>
          </div>
        </div>
       
       
      </div>

      <div className="form-section">
        <h3>Account Settings</h3>
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
