/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Loader } from "../../components/common/Loader/Loader"

export const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const requestToken = searchParams.get('request_token');
  const navigate = useNavigate();

  const handleToken = () => {
    if (requestToken) {
      localStorage.setItem("token", requestToken);
    }
  };

  useEffect(() => {
    handleToken();
    navigate('/authentication/step-2');
  }, []);

  return (
    <Loader />
  );
};
