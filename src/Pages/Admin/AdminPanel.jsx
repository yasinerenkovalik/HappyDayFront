import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import OrganizationList from '../Organization/OrganizationsList';

const dataProvider = simpleRestProvider('http://localhost:5268/api');

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="Organization" list={OrganizationList} />
    </Admin>
  );
};

export default AdminPanel;