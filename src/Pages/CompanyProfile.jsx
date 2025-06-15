// src/components/CompanyProfile.jsx
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../Api/jwtdecode";
import { getCompanyById } from "../Api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from 'react-bootstrap';

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
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
        const response = await getCompanyById(userId);
        if (!response.data.isSuccess) {
          throw new Error(response.data.message || "Profil alınamadı.");
        }
        setCompany(response.data.data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        {error}
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-gray-600 text-center py-8">
        Şirket bilgisi bulunamadı.
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
    <div className="row">
      {/* Sol Profil Paneli */}
      <div className="col-md-4">
        <div className="card">
          <div className="card-body text-center">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Profile"
              className="rounded-circle"
              width="120"
            />
            <h5 className="mt-3">{company.name}</h5>
            <p className="text-muted mb-1">Full Stack Developer</p>
            <p className="text-muted">Bay Area, San Francisco, CA</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary me-2">Follow</button>
              <button className="btn btn-outline-primary">Message</button>
            </div>
          </div>
        </div>

        <div className="card mt-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <i className="bi bi-globe me-2"></i> Website: <span className="float-end">https://bootdey.com</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-github me-2"></i> Github: <span className="float-end">bootdey</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-twitter me-2"></i> Twitter: <span className="float-end">@bootdey</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-instagram me-2"></i> Instagram: <span className="float-end">bootdey</span>
            </li>
            <li className="list-group-item">
              <i className="bi bi-facebook me-2"></i> Facebook: <span className="float-end">bootdey</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sağ Profil Detayları */}
      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="mb-3">User Details</h5>
            <div className="row mb-2">
              <div className="col-sm-4"><strong>Full Name</strong></div>
              <div className="col-sm-8">{company.name}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4"><strong>Email</strong></div>
              <div className="col-sm-8">{company.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4"><strong>Phone</strong></div>
              <div className="col-sm-8">{company.phoneNumber}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4"><strong>Mobile</strong></div>
              <div className="col-sm-8">(320) 380-4539</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4"><strong>Address</strong></div>
              <div className="col-sm-8">{company.adress}</div>
            </div>
            <div className="text-end mt-3">
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>

        {/* Proje Durum Kartları */}
        <div className="row">
          {[1, 2].map((box) => (
            <div className="col-md-6 mb-3" key={box}>
              <div className="card">
                <div className="card-body">
                  <h6 className="text-primary">assignment</h6>
                  <p className="mb-2">Project Status</p>
                  {[
                    { title: 'Web Design', value: 80 },
                    { title: 'Website Markup', value: 70 },
                    { title: 'One Page', value: 90 },
                    { title: 'Mobile Template', value: 50 },
                    { title: 'Backend API', value: 65 }
                  ].map((item, i) => (
                    <div key={i} className="mb-2">
                      <small>{item.title}</small>
                      <ProgressBar now={item.value} striped />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default CompanyProfile;