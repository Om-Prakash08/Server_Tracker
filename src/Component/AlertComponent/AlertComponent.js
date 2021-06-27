import { useState, useEffect } from "react";
import Radio from "./Radio";
import axios from "axios";
import LoadingSpinner from "../loadingSpinner";

const AlertComponent = (props) => {
  const { onChanged, serviceData, token } = props;
  const [serverIsSelected, setServerSelected] = useState(false);
  const [alertList, setAlertList] = useState([]);
  const[loading ,setLoading]=useState(false) ;
  const [selected, setSelected] = useState({
    id: "",
    name: "",
  });
  useEffect(() => {
    const getAlertList = async () => {
      setLoading(true) ;
      try {
        const resp = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_BACKEND_API_URL}/alert`,
          headers: {
            "x-auth-token": token,
          },
        });
        setAlertList(resp.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false) ;
    };
   getAlertList();
   setSelected({
    id: "",
    name: "",
  }) ;
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
    <LoadingSpinner loading={loading}/>
      <div className="radio-container">
        {alertList.map((alert) => (
          <Radio
            key={alert.alertId}
            id={alert.alertId}
            value={alert.alertName}
            selected={selected}
            text={alert.alertName}
            onChange={setSelected}
            first={alert===alertList[0]}
          />
        ))}
      </div>
      {!serverIsSelected && selected.id && (
        <div>
        <p className="error-occured" style={{ marginTop: 8 }}>
          Please select server first.
        </p>
        </div>
      )}
    </div>
  );
};
export default AlertComponent;
