import axios from 'axios' ;
const getAlertList = async (setLoading,setAlertList,token) => {
    setLoading(true);
    try {
      const resp = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_API_URL}/alert`,
        headers: {
          "x-auth-token": token,
        },
      });
      const arr=[] ;
      resp.data.forEach(function(r){
          arr.push({alertId:r.alertId,alertName:r.alertName,status:false}) ;
      })
      setAlertList(arr);
    } catch (err) {
      //console.error(err);
    }
    setLoading(false);
  };
const getAlertStatus = async (token,serverId,setAlertList,alertList) => {
    //setLoading(true);
    try {
      const resp = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_API_URL}/alert/status/${serverId}`,
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(resp.data) ;
      const arr=alertList ;
      resp.data.forEach(function(r){
        arr.find(x => x.alertId=== r.alertId).status=true ;
      })
     setAlertList(arr) ;
    } catch (err) {
    }
  };

export { getAlertList, getAlertStatus };