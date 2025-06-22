import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getUserIdFromToken } from "../../Api/jwtdecode";
import { company, organization } from "../../Api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [organizationList, setOrganizationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("Geçersiz token — lütfen tekrar giriş yapın.");
        setLoading(false);
        return;
      }

      try {
        const companyRes = await company.getById(userId);
        if (!companyRes.data.isSuccess) throw new Error(companyRes.data.message);
        setCompanyProfile(companyRes.data.data);

        const orgRes = await organization.getByCompanyId(userId);
        if (orgRes.data && Array.isArray(orgRes.data.data)) {
          setOrganizationList(orgRes.data.data);
        }
      } catch (err) {
        setError(err.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-5">Yükleniyor...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;
  if (!companyProfile) return <div className="text-muted text-center py-5">Şirket bilgisi bulunamadı.</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Sol Kısım */}
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

        {/* Sağ Kısım */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 mb-4">
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
                <div className="col-sm-8">{companyProfile.description || 'Henüz açıklama girilmemiş.'}</div>
              </div>
              <div className="text-end">
                <button className="btn btn-outline-dark">Profili Düzenle</button>
              </div>
            </div>
          </div>

          {/* Organizasyonlar */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">Organizasyonlarım</h5>
              {organizationList.length === 0 ? (
                <div className="alert alert-info">Henüz bir organizasyon eklemediniz.</div>
              ) : (
                <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 pb-2">
                  {organizationList.map((org) => (
                    <div key={org.id} className="card shadow-sm" style={{ minWidth: "250px" }}>
                      <div className="card-body">
                      <img
                      src={`http://localhost:5268${org.coverPhotoPath}`}
                      alt={org.title}
                      className="img-fluid rounded-start"
                      style={{ maxHeight: '180px', objectFit: 'cover' }}
                    />
                        <h6 className="fw-bold">{org.title}</h6>
                        <p className="text-muted small">
                          {org.description?.length > 60 ? `${org.description.slice(0, 60)}...` : org.description}
                        </p>
                        <Link to={`/organizationdetail/${org.id}`} className="btn btn-sm btn-primary">
                          Profili Gör
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <Link to="/organizationCreate" className="btn btn-outline-success btn-sm">+ Organizasyon Ekle</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
