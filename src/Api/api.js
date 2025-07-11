import axios from 'axios';

const API_BASE_URL = 'http://localhost:5268/api';
const IMAGE_BASE_URL = 'http://localhost:5268'; // <-- Bunu ekleyin

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Otomatik token ekleme
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📦 ORGANİZASYON API
export const organization = {
  getAll: () => axiosInstance.get('/Organization/OrganizationGetAll'),
  getWithImages: (id) =>
    axiosInstance.get(`/Organization/GetOrganizationWithImages?Id=${id}`),
  addImage: (formData) =>
    axiosInstance.post('/OrganizationImages/AddOrganizationImages', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    getFiltered: (filters) =>
      axiosInstance.get('/Organization/Filter', {
        params: filters
      }),
      getFeatured: () => axiosInstance.get(`/Organization/GetFeatured`),

  deleteImage: (imageId) => 
    axiosInstance.delete(`/OrganizationImages/DeleteOrganizationImages/${imageId}`), // ✔️ düzeltildi

  add: (formData) =>
    axiosInstance.post('/Organization/AddOrganization', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  edit: (formData) =>
    axiosInstance.put('/Organization/OrganizationUpdate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getById: (id) =>
    axiosInstance.get(`/Organization/OrganizationGetById?id=${id}`),
  delete: (id) =>
    axiosInstance.delete(`/Organization/DeleteOrganization/${id}`),
  getByCompanyId: (companyId) =>
    axiosInstance.get(`/Organization/GetOrganizationWithICompany?Id=${companyId}`),
};

export const categoryApi = {
  getAll: () => axiosInstance.get('/Category/OrganizationGetAll'),
};

export const cityApi = {
  getCities: () => axiosInstance.get('/City/CityGetAll'),
  getDistricts: (cityId) => axiosInstance.post('/District/GetAllDisctrictByCity', { cityId: parseInt(cityId) }),
};


// 🧑‍💼 KULLANICI API
export const user = {
  login: (credentials) => axiosInstance.post('/User/login', credentials),
  getById: (id) => axiosInstance.post('/User/getbyid', { id }),
};

// 🏢 FİRMA API
export const company = {
  login: (credentials) => axiosInstance.post('/Company/login', credentials),
  register: (formData) =>
    axiosInstance.post('/Company/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getById: (id) => axiosInstance.post('/Company/getbyid', { id }),
};
export { IMAGE_BASE_URL };
