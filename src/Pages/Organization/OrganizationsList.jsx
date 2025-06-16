import React, { useEffect, useState } from 'react';
import { organization } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import './OrganizationList.css';

const OrganizationList = () => {
  const [organizations, setOrgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    organization.getAll()
      .then(res => {
        const data = res.data.data;
        if (Array.isArray(data)) setOrgs(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="org-list">
      {organizations.map(org => (
        <div className="org-card" key={org.id}>
          {org.coverPhotoPath && (
            <img src={`http://localhost:5268${org.coverPhotoPath}`} alt={org.title} className="org-img" />
          )}
          <div className="org-info">
            <h3>{org.title}</h3>
            <p className="price">{org.price} ₺</p>
            <button onClick={() => navigate(`/organizationdetail/${org.id}`)}>Detay</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationList;
