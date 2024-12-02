import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Products } from './pages/products';
import { Map } from './pages/map';
import { Reports } from './pages/reports';
import { Settings } from './pages/settings';
import { Login } from './pages/login';
import { Signup } from './pages/signup';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/map" element={<Map />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}