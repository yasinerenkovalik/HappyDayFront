import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="secim-container">
      <button onClick={() => navigate('/logincompany')} className="secim-button">Firma Girişi</button>
      <button onClick={() => navigate('/loginuser')} className="secim-button">Müşteri Girişi</button>
    </div>
  );
};

export default Login;