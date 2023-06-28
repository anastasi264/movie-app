import { useEffect, useRef, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/fetchData";


export const LoginPageStep2 = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<any>('');
  const [incorrectData, setIncorrectData] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const userData = {
    username: username,
    password: password,
    request_token: localStorage.getItem('token'),
  };
  
  const request = {
    request_token: userData.request_token,
  };

  const handleCreateSession = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await api.post.authentication.validateUser(userData);      
      const sessionRequest = await api.post.authentication.createSession(request);
      
      localStorage.setItem('session_id', sessionRequest.session_id);
      navigate('/explore');
      window.location.reload();
    } catch {
      setIncorrectData(true);
    }
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      navigate('/');
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
        className="relative p-4 pb-8 text-sm rounded-2xl shadow w-full max-w-sm  bg-gray-700 bg-opacity-90"
      >
        <div className="flex justify-end">
          <button 
            type="button" 
            className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" 
            data-modal-toggle="authentication-modal"
            onClick={() => navigate('/')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <form className="px-4 flex flex-col gap-4 w-full" onSubmit={(event) => handleCreateSession(event)}>
          <h3 className="text-center text-2xl">Step №2</h3>
          <h3 className="text-center text-xl text-gray-300">Sign in to our platform</h3>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-gray-300"
            >
              Your name
            </label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              name="email"
              id="email"
              style={{
                WebkitBoxShadow: "0 0 0 1000px rgb(75,85,99) inset",
                WebkitTextFillColor: "#EFEFEF",
              }}
              className="block w-full p-2.5 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-600 border-gray-500 placeholder-gray-400"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-gray-300"
            >
              Your password
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              id="password"
              className="block w-full p-2.5 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-600 border-gray-500 placeholder-gray-400" 
              style={{
                WebkitBoxShadow: "0 0 0 1000px rgb(75,85,99) inset",
                WebkitTextFillColor: "#EFEFEF"
              }}
              placeholder="••••••••"
              required
            />
          </div>
          {incorrectData && (
            <div className="text-center text-orange-500">
              The username or password is incorrect!
            </div>
          )}
          <button
            type="submit"
            className="py-2 text-sm w-[70%] mx-auto my-3 text-center rounded-lg bg-blue-800 hover:bg-blue-700 duration-700"
          >
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
};
