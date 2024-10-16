import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './components/login/Login';
import ResetPass from './components/login/ResetPass';
import Home from './pages/Home';
import useAuthStore from './store/authStore';

function App() {
  const PrivateRoute = ({ children }) => {
    const { token } = useAuthStore();
    return token ? children : <Navigate to="/ingresar" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ingresar" />} />
        <Route path="/ingresar" element={<Login />} />
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/recuperar-contraseña" element={<ResetPass />} />
        <Route path="/*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
