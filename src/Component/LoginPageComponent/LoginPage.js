import React, { useState, useEffect } from "react";
import axios from "axios";
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
        });
        const tokenExpirationDate = new Date().getTime() + 1000 * 60 * 60;
        const data = {
          token: resp.data,
          expiration: tokenExpirationDate,
        };
        props.setTime(tokenExpirationDate);
        props.onAuth(resp.data);
        localStorage.setItem("userData", JSON.stringify(data));
      } catch (err) {
        if (err.response && err.response.status === 400)
          setErr("Invalid Username or password.");
        else setErr("Bad network!");
      }
    };
    setLoading(true);
    setErr("");
    sendAuthData();
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      props.onAuth(storedData.token);
      props.setTime(storedData.expiration);
    }
    setCheckToken(true);
    // eslint-disable-next-line
  }, [props]);

  useEffect(() => {
    if (err) setLoading(false);
  }, [err]);

  const updateLoginData = (event) =>
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });

  return (
    <div>
      {!checkToken ? (
        <LoadingSpinner loading={true} />
      ) : (
        <LoginPageRender
          loading={loading}
          handleSubmit={handleSubmit}
          username={username}
          updateLoginData={updateLoginData}
          password={password}
          err={err}
        />
      )}
    </div>
  );
};

export default LoginPage;
