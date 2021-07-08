import { useEffect, useState } from "react";
import AlertComponent from "../Component/AlertComponent/AlertComponent";
import ScriptComponent from "../Component/ScriptComponent/ScriptComponent.jsx";
import ServerComponent from "../Component/ServiceComponent/ServiceComponent";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";

const MainContent = (props) => {
  const { token, logout } = props;
  const [serverSelected, setServerSelected] = useState(false);
  const [service_name,setService_name]=useState('') ;
  const [serviceAlertData, setServiceAlertData] = useState({
    serviceId: "",
    ServiceName: "",
    groupId: "",
    groupName: "",
    serverId: "",
    serverName: "",
    alertId: "",
    alertName: "",
  });

  useEffect(() => {
    if (serviceAlertData.serverId) {
      setServerSelected(true);
    } else {
      setServerSelected(false);
    }
  }, [serviceAlertData]);
  return (
    <div className="col-xxl-10 containt">
      <div className="containt-heading-div">
        <h1 className="containt-heading">L2 Automation Portal</h1>
      </div>
      <div className="External-link Grafana-dashboard" >
        <a href={`${process.env.REACT_APP_Grafana_Dashboard_URL}`} target="_blank" rel="noopener noreferrer" >Grafana dashboard</a>
      </div>
      <div className="External-link Jenkins" >
      <a href={`${process.env.REACT_APP_Jenkins_Base_URL}/${service_name}`}target="_blank" rel="noopener noreferrer" >Jenkins</a>
      </div>
      <div className="External-link Sample-Jobs" >
      <a href={`${process.env.REACT_APP_Sample_Jobs_URL}`}target="_blank" rel="noopener noreferrer" >Sample jobs</a>
      </div>
      <div className="Logout-div" onClick={logout}>
        <Button style={{ textTransform: "none", fontSize: 18 }}>
          <ExitToAppIcon fontSize="medium" />
          Logout
        </Button>
      </div>
      <div className="row three-part-outer-div">
        <ServerComponent
          token={token}
          setServiceData={setServiceAlertData}
          serviceData={serviceAlertData}
          logout={logout}
          setServiceName={setService_name}
        />
        <AlertComponent
          token={token}
          serverIsSelected={serverSelected}
          serviceData={serviceAlertData}
          onChanged={setServiceAlertData}
        />
        <ScriptComponent
          token={token}
          serviceAlertData={serviceAlertData}
          AlertType={serviceAlertData.alertName}
        />
      </div>
    </div>
  );
};

export default MainContent;
