import MainContent from "../Server-Content/MainContent";
import "./server-page.css";
import logo from "../img/Samsung_logo .png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";

const ServerPage = (props) => {
  return (
    <div className="row outer-div">
      <div className="col-xxl-2">
        <img src={logo} className="logo-png" alt="logo" />
        <div className="Logout-div-outer" onClick={props.logout}>
          <Button variant="contained" color="primary" style={{ textTransform: "none", fontSize: 20 }}>
            <ExitToAppIcon fontSize="large" />
            Logout
          </Button>
        </div>
      </div>
      <MainContent token={props.token} logout={props.logout} />
    </div>
  );
};

export default ServerPage;
