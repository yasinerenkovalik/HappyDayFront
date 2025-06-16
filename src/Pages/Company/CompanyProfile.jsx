// src/components/CompanyProfile.jsx
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../../Api/jwtdecode";
import { company } from "../../Api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("Geçersiz token — lütfen tekrar giriş yapın.");
        setLoading(false);
        return;
      }

      try {
        const response = await company.getById(userId);
        if (!response.data.isSuccess) {
          throw new Error(response.data.message || "Profil alınamadı.");
        }
        setCompanyProfile(response.data.data);
        console.log("Şirket bilgisi:", response.data.data);
      } catch (err) {
        console.error("Profil çekme hatası:", err);
        setError(err.message || "Profil bilgileri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-5">Yükleniyor...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;
  if (!companyProfile) return <div className="text-muted text-center py-5">Şirket bilgisi bulunamadı.</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Profile"
                className="rounded-circle mb-3"
                width="120"
              />
              <h4 className="fw-bold mb-1">{companyProfile.name}</h4>
              <span className="badge bg-secondary mb-2">{companyProfile.category || 'Organizasyon Firması'}</span>
              <p className="text-muted small">{companyProfile.adress}</p>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary btn-sm">Rezervasyonlarım</button>
                <button className="btn btn-outline-secondary btn-sm">Yorumlarım</button>
              </div>
            </div>
          </div>

          <div className="card mt-3 shadow-sm border-0">
            <div className="card-header bg-white fw-bold">İletişim ve Sosyal</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">📧 Email: {companyProfile.email}</li>
              <li className="list-group-item">📞 Telefon: {companyProfile.phoneNumber}</li>
              <li className="list-group-item">📍 Adres: {companyProfile.adress}</li>
              <li className="list-group-item">🌐 Website: <a href="#">happyday.com</a></li>
              <li className="list-group-item">📸 Instagram: <a href="#">@happyday</a></li>
            </ul>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="mb-4">Firma Bilgileri</h4>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Firma Adı</div>
                <div className="col-sm-8">{companyProfile.name}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Kategori</div>
                <div className="col-sm-8">{companyProfile.category || 'Belirtilmemiş'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Hizmet Açıklaması</div>
                <div className="col-sm-8">
                  {companyProfile.description || 'Henüz açıklama girilmemiş.'}
                </div>
              </div>
              <div className="text-end">
                <button className="btn btn-outline-dark">Profili Düzenle</button>
              </div>
            </div>
          </div>

          <div className="card mt-4 shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Organizasyonlarım</h5>
              <div className="alert alert-info">Henüz bir organizasyon eklemediniz.</div>
              <button className="btn btn-success">+ Organizasyon Ekle</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;