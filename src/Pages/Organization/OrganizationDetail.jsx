import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { organization as organizationApi } from '../../Api/api';
import { IMAGE_BASE_URL } from '../../Api/api'; // <-- Bunu ekleyin
import './OrganizationDetail.css';

const OrganizationDetail = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    organizationApi.getWithImages(id)
      .then(res => {
        if (res.data?.data) {
          setOrganization(res.data.data);
          const firstImage = res.data.data.images?.[0];
          setSelectedImage(firstImage?.imageUrl || null);
          console.log('Organization data:', res.data.data);
        }
      })
      .catch(console.error);
  }, [id]);

  if (!organization) return <p>Yükleniyor...</p>;

  return (
    <div className="container-fluid px-5 py-5">
      <div className="row gx-5 gy-5">
        {/* Sol Kısım: Görseller ve Detaylar */}
        <div className="col-lg-8">
          <div className="position-relative rounded overflow-hidden shadow">
            <img
              src={selectedImage ? `${IMAGE_BASE_URL}${selectedImage}` : ''}
              alt="Kapak Görseli"
              className="img-fluid w-100 rounded"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>

          <div className="d-flex gap-3 mt-3 flex-wrap">
            {organization.images?.map((img, i) => (
              <img
                key={img.id}
                src={`${IMAGE_BASE_URL}${img.imageUrl}`}
                alt={`Resim ${i + 1}`}
                className={`rounded border shadow-sm ${selectedImage === img.imageUrl ? 'border-primary border-3' : 'border-light'}`}
                onClick={() => setSelectedImage(img.imageUrl)}
                style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
              />
            ))}
          </div>

          <div className="mt-4 p-5 bg-white rounded shadow-sm border border-light-subtle">
            <h1 className="text-primary fw-bold mb-4 border-bottom pb-2">{organization.title}</h1>
            <p className="text-muted fs-5 mb-4">{organization.description}</p>

            <div className="row gy-4">
              <div className="col-md-6">
                <div className="border rounded p-3 h-100 bg-light">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i><strong>Adres:</strong><br /> {organization.location || 'Bilgi yok'}
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3 h-100 bg-light">
                  <i className="bi bi-telephone-fill text-success me-2"></i><strong>Telefon:</strong><br /> {organization.phoneNumber || 'Bilgi yok'}
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3 h-100 bg-light">
                  <i className="bi bi-clock-fill text-info me-2"></i><strong>Hizmet Saatleri:</strong><br /> {organization.duration || 'Bilgi yok'}
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3 h-100 bg-light">
                  <i className="bi bi-people-fill text-warning me-2"></i><strong>Kapasite:</strong><br /> {organization.maxGuestCount} kişi
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3 h-100 bg-light">
                  <i className="bi bi-cash-coin text-primary me-2"></i><strong>Kişi Başı Fiyat:</strong><br /> {organization.price} ₺
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3 h-100 bg-light">
                  <strong className="d-block mb-2">💡 Hizmetler:</strong>
                  {organization.services?.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {organization.services.map((s, i) => (
                        <li key={i}>✔️ {s}</li>
                      ))}
                    </ul>
                  ) : (
                    ' Belirtilmemiş'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kısım: İletişim Formu */}
        <div className="col-lg-4">
          <div className="p-5 bg-white rounded shadow border border-primary-subtle">
            <h4 className="text-center text-primary mb-4">📩 İletişim Formu</h4>
            <form className="d-flex flex-column gap-3">
              <input placeholder="Ad Soyad" className="form-control" />
              <input placeholder="E-posta" className="form-control" />
              <input placeholder="Telefon" className="form-control" />
              <input placeholder="Tahmini Düğün Tarihi" className="form-control" />
              <input placeholder="Tahmini Davetli Sayısı" className="form-control" />
              <textarea placeholder="Fiyat, kapasite, menü gibi sorularınızı yazın..." className="form-control" rows={3} />
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="sozlesme" />
                <label className="form-check-label" htmlFor="sozlesme">
                  Sözleşmeleri okudum, kabul ediyorum
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Ücretsiz Teklif Al</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;
