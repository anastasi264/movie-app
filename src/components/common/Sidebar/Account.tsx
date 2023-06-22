/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { api } from "../../../api/fetchData";
import { FaUserAstronaut } from "react-icons/fa";


export const Account = () => {
  const [username, setUsername] = useState<string>('');

  const activeSession = localStorage.getItem('session_id');

  const getAccountDetails = async () => {
    if (activeSession) {
      const accountDetails = await api.get.account.accountDetails(activeSession);
  
      setUsername(accountDetails.username);
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, [activeSession]);

  return (
    <div className="flex items-center gap-3 lg:gap-2 p-2 rounded-lg bg-gray-600 bg-opacity-20">
      <FaUserAstronaut className="shrink-0 text-[40px] xl:text-4xl lg:text-3xl bg-blue-900 rounded-[50%]"/>
      <div className="grow flex flex-col  overflow-hidden">
        <span className="truncate">
          {username || 'Guest'}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-2 lg:hidden">
          Welcome to the club
        </span>
      </div>
    </div>
  );
}
