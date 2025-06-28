import axios from 'axios';

const API_BASE_URL = 'http://localhost:5268/api';

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
  add: (formData) =>
    axiosInstance.post('/Organization/AddOrganization', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    getById: (id) => axiosInstance.get(`/Organization/OrganizationGetById?id=${id}`),
  delete: (id) => axiosInstance.delete(`/Organization/DeleteOrganization/${id}`),
  getByCompanyId: (companyId) =>
    axiosInstance.get(`/Organization/GetOrganizationWithICompany?Id=${companyId}`),
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
