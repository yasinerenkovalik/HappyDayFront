import React, { useState } from 'react';
import { loginCompany } from '../Api/api'; // doğru path'e göre düzelt
import './LoginUser.css';

const LoginCompany = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');
    setLoading(true);

    try {
        //burayı değiştir
      const response = await loginCompany({ email, password });

      const result = response.data;

      if (result.isSuccess && result.data?.token) {
        localStorage.setItem('token', result.data.token);
        alert('Giriş başarılı!');
        window.location.href = '/dashboard'; // örnek yönlendirme
      } else {
        setError(result.message || 'Giriş başarısız.');
      }

    } catch (err) {
      console.error('Login Hatası:', err);
      setError('Sunucu hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Şirket Giriş Yap</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="tesxt"
              id="email"
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="footer">
          <a href="/register">Hesabın yok mu? Kayıt ol</a>
        </div>
      </div>
    </div>
  );
};

export default LoginCompany;
