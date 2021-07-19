import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, InputAdornment } from "@material-ui/core";
import "./LoginPage.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from "@material-ui/icons/Visibility";

const LoginPageRender = (props) => {
  const [isPasswordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    isPasswordShown ? setPasswordShown(false) : setPasswordShown(true);
  };
  const {
    loading,
    handleSubmit,
    username,
    updateLoginData,
    password,
    err,
  } = props;
  return (
    <div className="loginBox">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-primary"
          // fontSize="300"
          label="User name"
          fullWidth
          style={{ margin: 18 }}
          type="username"
          name="username"
          value={username}
          onChange={updateLoginData}
          required
          inputProps={{ style: { fontSize: 16 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <TextField
          id="standard-secondary"
          label="Password"
          fullWidth
          style={{ margin: 18 }}
          type={isPasswordShown ? "text" : "password"}
          name="password"
          value={password}
          onChange={updateLoginData}
          inputProps={{ style: { fontSize: 16 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }}
          required
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon onClick={togglePasswordVisiblity} />
              </InputAdornment>
            ),
          }}
        />
       
        <div className="login-div-btn">
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            className="login-btn"
            disabled={loading}
            style={{ margin: 20 }}
          > 
           {loading&&<CircularProgress disableShrink size={18} thickness={8} style={{position:"relative", right:8,color: 'white'}}/>}
            Login
          </Button>
        </div>
      </form>

      <div className="login-error">
        <p>{!loading && err}</p>
      </div>
    </div>
  );
};
export default LoginPageRender;
