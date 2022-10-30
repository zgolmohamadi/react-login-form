import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import logo from "./ui/Assets/Capture.svg"
import "./ui/login.css"

// import axios from './api/axios';
// const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(LOGIN_URL,
      //     JSON.stringify({ user, pwd }),
      //     {
      //         headers: { 'Content-Type': 'application/json' },
      //         withCredentials: true
      //     }
      // );
      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;

      setAuth({ user, pwd });
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="container">
      {success ? (
        <section className='login'>
         <div className='login__message'>
         <h1>You are logged in!</h1>
          <p>
            <a href="#">Go to Home</a>
          </p>
         </div>
        </section>
      ) : (
        <section className='login'>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <img src={logo} alt="logo" className='login__logo'/>
          <form onSubmit={handleSubmit} className='login__form'>
           
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="Email"
                className='login__form-input'
                required
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                placeholder="PassWord"
                className='login__form-input'
                required
              />
       
            <div className='login__forgot-label'>
              <a href="#">Forgot Password?</a>
            </div>

            <button className='login__button'>Continue</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Login;
