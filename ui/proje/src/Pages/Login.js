import React, {useState} from 'react';
import { useAuth } from '../Providers/AuthProvider';

const Login = () => {

  const { loginAsAdmin, loginAsCompany } = useAuth();

  const companies = [
    { companyId: 1, value: 'Monitör CRO' },
    { companyId: 2, value: 'Medcase' },
    { companyId: 3, value: 'Amazon' },
    { companyId: 4, value: 'Microsoft' },
    { companyId: 5, value: 'Alphabet' },
    { companyId: 6, value: 'Meta' },
    { companyId: 7, value: 'Tesla' },
];

const [selectedCompany, setSelectedCompany] = useState(null);

const handleCompanyChange = (event) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    const selectedCompany = companies.find(company => company.companyId === selectedCompanyId);
    setSelectedCompany(selectedCompany);
    handleLogin("company", selectedCompanyId, loginAsCompany)
};

const handleLogin = (userType, companyId = null) => {
  if (userType === 'admin') {
    loginAsAdmin();
  } else if (userType === 'company') {
    loginAsCompany(companyId);
  }
};

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin('admin', loginAsAdmin)}>Login as Admin</button><br/>
      or <br/>
      <select id="companySelect" onChange={handleCompanyChange} value={selectedCompany?.companyId || ''}>
                <option value="" disabled>Şirket Seçiniz</option>
                {companies.map(company => (
                <option key={company.companyId} value={company.companyId}>
                    {company.value}
                </option>
                ))}
            </select>
    </div>
  );
};

export default Login;