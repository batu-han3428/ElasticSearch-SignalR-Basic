import './App.css';
import UpdateData from './Pages/UpdateData';
import Home from './Pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SignalRProvider } from './Providers/SignalRProvider';
import { AuthProvider, useAuth } from './Providers/AuthProvider';
import Login from './Pages/Login';
import { useState } from 'react';

function App() {

  const [setCompanyId] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (userType, companyId = null, loginAsAdmin = null, loginAsCompany = null) => {
    if (userType === 'admin') {
      setCompanyId(companyId);
      loginAsAdmin();
      navigate("/update-data");
    } else if (userType === 'company') {
      loginAsCompany();
      navigate("/");
    }
  };

  return (
    <AuthProvider>
      <SignalRProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update-data" element={<UpdateData />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </SignalRProvider>
  </AuthProvider>
  );
}

export default App;
