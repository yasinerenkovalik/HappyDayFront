// src/admin/AdminApp.jsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';

import { UserList } from './Users';

const AdminApp = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
    </Admin>
  );
};

export default AdminApp;
