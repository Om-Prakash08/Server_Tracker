import { useState, useEffect } from "react";
import Radio from "./Radio";
import LoadingSpinner from "../loadingSpinner";
import { getAlertList } from "./handleAlertApi";

const AlertComponent = (props) => {
  const {onChanged, serviceData, token,setAlertList,alertList} = props;
  const [serverIsSelected, setServerSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err,setErr]=useState(false) ;
  const [selected, setSelected] = useState({
    id: "",
    name: "",
  });
  useEffect(() => {
    getAlertList(setLoading,setAlertList,token);
    setSelected({
      id: "",
      name: "",
    });
    // eslint-disable-next-line
  }, [serviceData.serverName]);
  

  useEffect(() => {
    if (serverIsSelected && selected) {
      onChanged({
        ...serviceData,
        alertId: selected.id,
        alertName: selected.name,
      });
    }
    // eslint-disable-next-line
  }, [selected, serverIsSelected]);

  useEffect(() => {
    if (serviceData.serverId) {
      setServerSelected(true);
    } else {
      setServerSelected(false);
    }
  }, [serviceData]);

  return (
    <div className="col-lg-2 second">
      <LoadingSpinner loading={loading} />
      <div className="radio-container">
        {alertList.map((alert) => (
          <Radio
            key={alert.alertId}
            id={alert.alertId}
            value={alert.alertName}
            selected={selected}
            text={alert.alertName}
            first={alert === alertList[0]}
            onChange={setSelected}
            status={alert.status}
            serverIsSelected={serverIsSelected}
            setErr={setErr} 
          />
        ))}
      </div>
      <div className="error-occured">
        {!serverIsSelected && err &&(
          <p  style={{ marginTop: 0 }}>
            Please select server first.
          </p>
        )}
      </div>
    </div>
  );
};
export default AlertComponent;
