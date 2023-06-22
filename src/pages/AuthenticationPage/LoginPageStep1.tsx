import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from 'react-icons/fa';
import { api } from "../../api/fetchData";


export const LoginPageStep1 = () => {
  const authenticateUser = async () => {
    const token = await api.get.authentication.token();
    const url = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000/%23/authentication`;
    window.open(url, '_blank');
  };

  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      navigate(-1);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },[ref, navigate]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70 backdrop-blur-[2px] overflow-hidden">
      <div
        ref={ref}
        className="relative p-4 pb-8 text-sm rounded-2xl shadow w-full max-w-sm h-full md:h-auto bg-gray-700 bg-opacity-90"
      >
        <div className="flex justify-end">
          <button 
            type="button" 
            className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" 
            data-modal-toggle="authentication-modal"
            onClick={() =>  navigate(-1)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>  
          </button>
        </div>
        <div className="px-4 flex flex-col items-center gap-4 w-full">
          <h3 className="text-center text-2xl">Step №1</h3>
          <h3 className="text-center text-lg text-gray-300">
            To sign in to our platform, please approve your account first!
          </h3>
          <FaUserPlus className="text-3xl"/>
          <button
            type="button"
            className="py-2 text-sm w-[70%] text-center rounded-lg bg-blue-800 hover:bg-blue-700 duration-700"
            onClick={() => authenticateUser()}
          >
            Approve account
          </button>
        </div>
      </div>
    </div>
  );
};
