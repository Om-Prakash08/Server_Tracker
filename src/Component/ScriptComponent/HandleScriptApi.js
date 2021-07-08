import axios from "axios";

const getScriptValue = async (setInputFields, serverId, alertId, token,setfetching) => {
  setfetching(true) ;
  try {
    const resp = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_API_URL}/script/`,
      headers: {
        "x-auth-token": token,
      },
      params: {
        alert:alertId,
        server:serverId
      }
    });
    const values = [];
    resp.data.sort(function (a, b) {
      return a.scriptId - b.scriptId;
    });
    resp.data.forEach(function (scriptRow) {
      values.push({ script: scriptRow.scriptFile });
    });
    if (values.length) setInputFields(values);
    else {
      setInputFields([{ script: "" }]);
    }
  } catch (err) {
   // console.error(err);
  }
  setfetching(false) ;
};

const sendScriptValue = async (
  SetSending,
  setApiError,
  setSuccess,
  data,
  token,
  setLoading
) => {
  SetSending(true);
  setApiError(false);
  setLoading(true) ;
  try {
   await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_API_URL}/script/new`,
      data,
      headers: {
        "x-auth-token": token,
      },
    }); 
    setSuccess(true);
  } catch (err) {
    if (err) setApiError(true);
    //console.error(err);
  }
  SetSending(false);
  setLoading(false) ;
};

export { getScriptValue, sendScriptValue };
