import React, {useEffect} from 'react';
import { useAuth } from '../Providers/AuthProvider';
import { Button, Select, Form, Row, Col} from 'antd';

const Login = () => {

  const { loginAsAdmin, loginAsCompany } = useAuth();

  const companies = [
    { value: 1, label: 'Monitör CRO' },
    { value: 2, label: 'Medcase' },
    { value: 3, label: 'Amazon' },
    { value: 4, label: 'Microsoft' },
    { value: 5, label: 'Alphabet' },
    { value: 6, label: 'Meta' },
    { value: 7, label: 'Tesla' },
  ];

  const handleCompanyChange = (event) => {
    handleLogin("company", event, loginAsCompany)
  };

  const handleLogin = (userType, companyId = null) => {
    if (userType === 'admin') {
      loginAsAdmin();
    } else if (userType === 'company') {
      loginAsCompany(companyId);
    }
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const selectElement = document.querySelector('.ant-select');
    if (selectElement) {
      const parentElement = selectElement.parentNode;
      const grandparentElement = parentElement.parentNode;
      const greatGrandparentElement = grandparentElement.parentNode;
      greatGrandparentElement.style.margin = '0 auto';
    }
  }, []); 

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              
            initialValues={{
            remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item >
            <Button onClick={() => handleLogin('admin', loginAsAdmin)} type="primary">Login as Admin</Button> 
            </Form.Item>
            <Form.Item>
              <span>or</span>
            </Form.Item>
            <Form.Item style={{ width: '100%' }}>
            <Select
                    id="companySelect"
                    showSearch
                    placeholder="Select a company"
                    optionFilterProp="children"
                    onChange={handleCompanyChange}
                    filterOption={filterOption}
                    options={companies}
                />
            </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;