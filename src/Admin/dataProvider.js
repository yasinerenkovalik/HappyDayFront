// src/admin/dataProvider.js
import { fetchUtils } from 'react-admin';
import axios from 'axios';

const apiUrl = 'http://localhost:5268/api';

const dataProvider = {
  getList: async (resource, params) => {
    if (resource === 'users') {
      const response = await axios.get(`${apiUrl}/User/getall`);
      return {
        data: response.data.map(user => ({
          id: user.id, // zorunlu: react-admin id ister
          ...user
        })),
        total: response.data.length
      };
    }

    return { data: [], total: 0 };
  },

  // Diğer metodlar (getOne, create, update, delete) istersen sonra ekleriz
};

export default dataProvider;
