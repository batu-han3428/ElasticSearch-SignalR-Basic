import axios from 'axios';
import { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';
import { Navigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const UpdateData = () =>{

    const { userType, logout } = useAuth();

    const [selectedTimezone, setSelectedTimezone] = useState(null);

    const handleChange = (timezone) => {
        if (timezone && timezone.value) {
            setSelectedTimezone(timezone);
        } else {
            setSelectedTimezone(null);
        }
    };

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
    };

    const updateTimeZone = async (companyId, newTimeZone) => {
        
        if(companyId === null || newTimeZone === null){
            alert('Alanlar boş bırakılamaz');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7108/api/TimeZone/updateTimeZoneForCompany', {
                companyId: companyId,
                timeZone: newTimeZone,
            });
      
            alert(response.data);
        } catch (error) {
            alert('Beklenmeyen bir hata:', error);
        }
    };

    return userType ? (
        <>
                <button onClick={()=>logout()}>Çıkış</button>
        <div>
            <label htmlFor="companySelect">Şirket Seç:</label>
            <select id="companySelect" onChange={handleCompanyChange} value={selectedCompany?.companyId || ''}>
                <option value="" disabled>Şirket Seçiniz</option>
                {companies.map(company => (
                <option key={company.companyId} value={company.companyId}>
                    {company.value}
                </option>
                ))}
            </select>
        </div>
        <div>
            <label htmlFor="timezoneSelect">Saat Dilimi Seç:</label>
            <TimezoneSelect
                value={selectedTimezone || ""}
                onChange={handleChange}
                className="timezone-select"
                id="timezoneSelect"
            />
        </div>
        <button onClick={()=>updateTimeZone(selectedCompany ? selectedCompany.companyId : null, selectedTimezone ? selectedTimezone.value : null)}>Time Zone güncelle</button>
        </>
    ): (
        <Navigate to="/login" />
    )
};

export default UpdateData