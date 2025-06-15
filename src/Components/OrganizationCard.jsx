// src/components/OrganizationCard.jsx
import './OrganizationCard.css';

const OrganizationCard = ({ org }) => {
  return (
    <div className="org-card">
      <h3>{org.name}</h3>
      <p>{org.description}</p>
      <span>{org.date}</span>
    </div>
  );
};

export default OrganizationCard;
