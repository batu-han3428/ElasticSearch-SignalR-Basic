import { Navigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { useEffect, useState } from "react";
import axios from 'axios';
import { DateTimeFormat } from "../Helper/DateFormat";

const Home = props =>{

    const { userType, logout, companyId } = useAuth();
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(`https://localhost:7108/api/TimeZone/getData?companyId=${companyId}`);
      
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            alert('Beklenmeyen bir hata:', error);
        }
    };

    useEffect(()=>{
        if(userType){
            getData();
        }
       
    },[userType])


    return userType ? (
        <>
            <button onClick={()=>logout()}>Çıkış</button>
            <br/>
            <table>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={index}>
                        <td>{DateTimeFormat(item.date)}</td>
                        <td>{item.value}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    ): (
        <Navigate to="/login" />
    )
};

export default Home