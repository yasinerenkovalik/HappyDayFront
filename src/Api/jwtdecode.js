import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  console
  if (!token) 
    console.warn('Token bulunamadı.');
  try {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
    return decoded?.nameid || decoded?.userId ;
  } catch (error) {
    console.error('Token decode edilemedi:', error);
    return null;
  }
};
