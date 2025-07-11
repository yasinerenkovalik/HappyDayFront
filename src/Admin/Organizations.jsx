import { List, Datagrid, TextField } from 'react-admin';

export const OrganizationList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="price" />
      <TextField source="location" />
    </Datagrid>
  </List>
);
