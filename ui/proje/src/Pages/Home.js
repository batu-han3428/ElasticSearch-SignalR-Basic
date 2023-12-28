import { Navigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { useEffect, useState } from "react";
import axios from 'axios';
import { DateTimeFormat } from "../Helper/DateFormat";
import { Button, Table, notification } from 'antd';

const Home = props =>{

    const { userType, logout, companyId } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            setTimeout(async () => {
                const response = await axios.get(`https://localhost:7108/api/TimeZone/getData?companyId=${companyId}`);
      
                if(response.status === 200){
                    const formattedData = response.data.map((data, i) => ({
                        key: i,
                        date: DateTimeFormat(data.date),
                        description: data.value,
                    }));
                    setData(formattedData);
                    setLoading(false);
                }
            }, 1000);
        } catch (error) {
            notification.error({
                message: 'Beklenmeyen bir hata',
                description: error,
            });
        }
    };

    useEffect(()=>{
        if(userType){
            getData();
        }
    },[userType])

    const columns = [
        {
          title: 'Tarih',
          dataIndex: 'date',
          sorter: (a, b) => new Date(a.date) - new Date(b.date),
          defaultSortOrder: 'ascend', 
        }
    ];

    const tableColumns = columns.map((item) => ({
        ...item,
        ellipsis:true,
    }));

    const tableProps = {
        bordered: true,
        loading: loading,
        size: 'large',
        expandedRowRender: (record) => <p>{record.description}</p>,
        title: undefined,
        showHeader: true,
        footer: undefined,
        rowSelection: undefined,
        scroll: {},
        tableLayout: 'fixed',
      };

    return userType ? (
        <>
            <Button style={{float:"Right", margin:"5px"}} onClick={()=>logout()} type="primary">Çıkış</Button>
            <br/>
            <Table
                {...tableProps}
                pagination={{
                position: 'bottomRight',
                }}
                columns={tableColumns}
                dataSource={data}
            />
        </>
    ): (
        <Navigate to="/login" />
    )
};

export default Home