// src/pages/Register.jsx
import { useState } from 'react';
import { registerCompany } from '../Api/api';
import { CreateCompany } from '../entities/models';

const Register = () => {
  const [form, setForm] = useState({ ...CreateCompany });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] }); // ileride dosya desteği için
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    registerCompany(formData)
      .then(() => alert("Kayıt başarılı!"))
      .catch(err => alert("Hata: " + err.message));
  };

  return (
    <div className="container">
      <h2>Şirket Olarak Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Kullanıcı Adı" onChange={handleChange} required />
        <input type="text" name="adress" placeholder="E-posta" onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Şifre" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Şifre" onChange={handleChange} required />

        {/* İleride dosya alanı eklenecekse: */}
        {/* <input type="file" name="image" onChange={handleChange} /> */}

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
