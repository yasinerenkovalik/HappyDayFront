import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Register from '../Pages/Company/CompanyRegister';
import Profile from '../Pages/Profile';
import Reservasyon from '../Pages/Reservation/Reservasyon';
import PrivateRoute from './PrivateRoute';
import LoginUser from '../Pages/Login/LoginUser';
import LoginCompany from '../Pages/Login/LoginCompany';
import CompanyProfile from '../Pages/Company/CompanyProfile';
import Login from '../Pages/Login/Login';
import AddOrganization from '../Pages/Organization/OrganizationCreate';
import OrganizationList from '../Pages/Organization/OrganizationsList';
import OrganizationDetail from '../Pages/Organization/OrganizationDetail';
import OrganizationEdit from '../Pages/Organization/OrganizationEdit';
import NotFound from '../Components/NotFound';
import AdminApp from '../Admin/AdminApp';

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
      

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
      <Route path="/organizationdetail/:id" element={<OrganizationDetail />} />
      <Route path="/admin/*" element={<AdminApp />} />
            
        <Route path="/userprofile" element={<Profile />} />
        <Route path="/organizationEdit/:id" element={<OrganizationEdit />} />
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
