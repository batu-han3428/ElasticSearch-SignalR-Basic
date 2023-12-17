import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const navigate = useNavigate();

  const loginAsAdmin = () => {
    setUserType('admin');
    navigate("/update-data");
  };

  const loginAsCompany = (companyId) => {
    setCompanyId(companyId);
    setUserType('company');
    navigate("/");
  };

  const logout = () => {
    setUserType(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ userType, loginAsAdmin, loginAsCompany, logout, companyId, setCompanyId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};