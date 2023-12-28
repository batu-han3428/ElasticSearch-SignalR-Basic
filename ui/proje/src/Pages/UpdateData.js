import axios from 'axios';
import { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';
import { Navigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { Button, Select, Form, Row, Col, notification} from 'antd';

const UpdateData = () =>{

    const { userType, logout } = useAuth();

    const [selectedTimezone, setSelectedTimezone] = useState(null);

    const handleChange = (timezone) => {
        if (timezone && timezone.value) {
            console.log(timezone)
            setSelectedTimezone(timezone);
        } else {
            setSelectedTimezone(null);
        }
    };

    const companies = [
        { value: 1, label: 'Monitör CRO' },
        { value: 2, label: 'Medcase' },
        { value: 3, label: 'Amazon' },
        { value: 4, label: 'Microsoft' },
        { value: 5, label: 'Alphabet' },
        { value: 6, label: 'Meta' },
        { value: 7, label: 'Tesla' },
    ];

    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleCompanyChange = (event) => {
        const selectedCompany = companies.find(company => company.value === event);
        setSelectedCompany(selectedCompany);
        getCompanyTimeZone(event);
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const updateTimeZone = async (companyId, newTimeZone) => {
        
        if(companyId === null || newTimeZone === null){
            notification.info({
                message: 'Alanlar boş bırakılamaz'
            });
            return;
        }

        try {
            const response = await axios.post('https://localhost:7108/api/TimeZone/updateTimeZoneForCompany', {
                companyId: companyId,
                timeZone: newTimeZone,
            });

            notification.info({
                message: response.data
            });
        } catch (error) {
            notification.error({
                message: 'Beklenmeyen bir hata',
                description: error
            });
        }
    };

    const getCompanyTimeZone = async (companyId) => {
        try {
            const response = await axios.get(`https://localhost:7108/api/TimeZone/getCompanyTimeZone?companyId=${companyId}`);
            if(response.status === 200){
                setSelectedTimezone({value:response.data.timeZone})
            }else{
                setSelectedTimezone(null);
            }
        } catch (error) {
            notification.error({
                message: 'Beklenmeyen bir hata',
                description: error
            });
        }
    }

    return userType ? (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={10}>
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        clear:"both"
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Kullanıcı Adı">
                        <Select
                            showSearch
                            placeholder="Select a company"
                            optionFilterProp="children"
                            onChange={handleCompanyChange}
                            filterOption={filterOption}
                            options={companies}
                        />
                    </Form.Item>
                    <Form.Item label="Saat Dilimi">
                        <TimezoneSelect
                            value={selectedTimezone || ""}
                            onChange={handleChange}
                            className="timezone-select"
                            id="timezoneSelect"
                        />
                    </Form.Item>
                    <Button style={{float:"Right", margin:"5px"}} onClick={()=>updateTimeZone(selectedCompany ? selectedCompany.value : null, selectedTimezone ? selectedTimezone.value : null)} type="primary">Güncelle</Button>          
                    <Button style={{ float:"Right", margin:"5px" }} onClick={() => logout()} type="primary">Çıkış</Button>
                </Form>
            </Col>
        </Row>
    ): (
        <Navigate to="/login" />
    )
};

export default UpdateData