import axios from 'axios';

const API_BASE_URL = 'http://localhost:5268/api';

export const registerCompany = async (formData) => {
  return axios.post(`${API_BASE_URL}/Company/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getOrganizations = async () => {
  return axios.get(`${API_BASE_URL}/Organization/CompanyGetAll`);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_BASE_URL}/User/login`, credentials);
};
export const loginCompany = async (credentials) => {
  return axios.post(`${API_BASE_URL}/Company/login`, credentials);
};

export const getUserById = async (id) => {
  console.log('merhaba',id)
  return axios.post(
    `${API_BASE_URL}/User/getbyid`,
    { id },

  );
};
export const getCompanyById = async (id) => {
  console.log('merhaba',id)
  return axios.post(
    `${API_BASE_URL}/Company/getbyid`,
    { id },

  );
};

