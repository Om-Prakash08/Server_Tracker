import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  //Route,
  //Redirect,
  //Switch,
} from "react-router-dom";
import "./App.css";
import ServerPage from "./server-page/server-page";
import LoginPage from "../src/Component/LoginPageComponent/LoginPage";

function App() {
  const [Token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (Token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate - new Date().getTime();
      setTimeout(logout, remainingTime);
    } 
  }, [Token, logout, tokenExpirationDate]);

  let routes;
  if (Token) {
    routes = <ServerPage token={Token} logout={logout} />;
  } else {
    routes = <LoginPage onAuth={setToken} setTime={setTokenExpirationDate}  />;
  }

  return (
    <Router>
      <main>{routes}</main>
    </Router>
  );
}

export default App;
