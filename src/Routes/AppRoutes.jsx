import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '../Pages/Home';
import Register from '../Pages/CompanyRegister';
import Profile from '../Pages/Profile';
import Reservasyon from '../Pages/Reservasyon';
import PrivateRoute from './PrivateRoute';
import LoginUser from '../Pages/LoginUser';
import LoginCompany from '../Pages/LoginCompany';
import CompanyProfile from '../Pages/CompanyProfile';
import Login from '../Pages/Login';
import AddOrganization from '../Pages/OrganizationCreate';
import OrganizationList from '../Pages/OrganizationsList';
import OrganizationDetail from '../Pages/OrganizationDetail';
import NotFound from '../Pages/NotFound';

const ProtectedLayout = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginuser" element={<LoginUser />} />
      <Route path="/logincompany" element={<LoginCompany />} />
      <Route path="/organizationlist" element={<OrganizationList />} />
      <Route path="/organizationdetail/:id" element={<OrganizationDetail />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/reservasyon" element={<Reservasyon />} />
        <Route path="/organizationCreate" element={<AddOrganization />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default AppRoutes;
