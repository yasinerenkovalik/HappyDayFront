// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  let role = null;
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.role; // backend'de "role" olarak gönderilmişse
    } catch (err) {
      console.error("Token çözümlenemedi:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🎉 HappyDay</Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/organizationlist">Organizasyonlar</Link>
        {isLoggedIn ? (
          <>
            <Link to={role === "company" ? "/companyprofile" : "/userprofile"}>Profil</Link>
            <button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button>
          </>
        ) : (
          <>
            <Link to="/register">Kayıt Ol</Link>
            <Link to="/login">Giriş Yap</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
