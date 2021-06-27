import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import LoginPageRender from "./LoginPageRender";
import LoadingSpinner from "../loadingSpinner";

const LoginPage = (props) => {
  const [checkToken, setCheckToken] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginData;

  function handleSubmit(event) {
    event.preventDefault();
    const sendAuthData = async () => {
      try {
        const resp = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_BACKEND_API_URL}/auth/login`,
          data: {
            email: username,
            password,
          },
          headers: {
            "x-auth-token": props.token,
          },
        });
        const tokenExpirationDate = new Date().getTime() + 1000 * 60 * 60;
        const data = {
          token: resp.data,
          expiration: tokenExpirationDate,
        };
        props.setTime(tokenExpirationDate);
        props.onAuth(resp.data);
        var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          `${process.env.REACT_APP_SECRET_KEY}`
        ).toString();
        localStorage.setItem("userData", ciphertext);
        
      } catch (err) {
        if (err.response && err.response.status === 400)
          setErr("Invalid Username or password.");
        else setErr("Bad network!");
      }
    };
    setLoading(true);
    setErr("") ;
    sendAuthData();
  }

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const bytes = CryptoJS.AES.decrypt(
        data,
        `${process.env.REACT_APP_SECRET_KEY}`
      ); if (bytes.sigBytes === 223) {
           const storedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
           //const storedData = JSON.parse(localStorage.getItem("userData"));
             if (
               storedData &&
               storedData.token &&
              new Date(storedData.expiration) > new Date()
                ) {
                     props.onAuth(storedData.token);
                     props.setTime(storedData.expiration);
                  }
           }
    } // eslint-disable-next-line
    setCheckToken(true);
   // eslint-disable-next-line
  }, [props]);

  useEffect(()=>{
    if(err)
      setLoading(false);
  },[err])

  const updateLoginData = (event) =>
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });

  return (
    <div>
      {!checkToken ? (
        <LoadingSpinner loading={true} />
      ):(
        <LoginPageRender
          loading={loading}
          handleSubmit={handleSubmit}
          username={username}
          updateLoginData={updateLoginData}
          password={password}
          err={err}
        />
      ) }
    </div>
  );
};

export default LoginPage;
