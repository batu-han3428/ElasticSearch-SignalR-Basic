import React, { createContext, useContext, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthProvider';

const SignalRContext = createContext();

export const SignalRProvider = ({children}) => {

  const { userType, companyId, setCompanyId } = useAuth();

  const hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7108/timeZoneHub', {
        withCredentials: false
    })
    .withAutomaticReconnect()
    .build();

    const joinGroup = async (companyId) => {
        await hubConnection.invoke('JoinCompanyGroup', companyId);
      };

      const leaveGroup = async (companyId) => {
        await hubConnection.invoke('LeaveCompanyGroup', companyId);
      };
    

      useEffect(() => {
        if (userType && userType === 'company') {
            hubConnection.start().then(() => {
              joinGroup(companyId);
            });
      
            hubConnection.on('ReceiveTimeZoneUpdate', (message) => {
              toast.success(message);
            });
          }

        return () => {
            if (hubConnection.state === 'Connected') {
              leaveGroup(companyId).then(() => {
                hubConnection.stop().then(() => {
                  setCompanyId(null);
                });
              }).catch((error) => {
                console.error('Error leaving group:', error);
              });
              }
        };
      }, [companyId, hubConnection, setCompanyId]);
  

  return (
    <SignalRContext.Provider value={{ hubConnection }}>
      {children}
      <ToastContainer />
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  return useContext(SignalRContext);
};