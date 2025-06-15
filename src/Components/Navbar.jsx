// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // veya navigate('/login') kullanabilirsin
  };
  const isLoggedIn = localStorage.getItem('token');
  return (
    <nav className="navbar">
      <Link to="/"><h1>Happy Day</h1></Link>
      <div>
        <Link to="/">Ana Sayfa</Link>
        <Link to="/organizationlist">Organizasyonlar</Link>
        {!isLoggedIn && <Link to="/register">Kayıt Ol</Link>}
        {!isLoggedIn && <Link to="/login">Giriş Yap</Link>}
        

        {isLoggedIn && <Link to="/profile">Profil</Link>}
        {isLoggedIn && <Link onClick={handleLogout} className="logout-button">Çıkış Yap</Link>}

      </div>
    </nav>
  );
};

export default Navbar;
