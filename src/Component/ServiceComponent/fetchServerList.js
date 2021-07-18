import axios from "axios";
const getServiceList = async (
  setServiceList,
  token,
  setLoading,
  setInValidity
) => {
  setLoading(true);
  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_URL}/service/`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    setServiceList(resp.data);
  } catch (err) {
    if (err.response.status === 401) setInValidity(true);
  }
  setLoading(false);
};

const getGroupList = async (setGroupList, service, token, setLoading) => {
  setLoading(true);
  const Id = service.serviceId;
  try {
    const resp = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_API_URL}/serverGrp/`,
      headers: {
        "x-auth-token": token,
      },
      params: {
        service: Id,
      },
    });
    setGroupList(resp.data);
  } catch (err) {
    //console.error(err);
  }
  setLoading(false);
};

const getServerList = async (setServerList, group, token, setLoading) => {
  setLoading(true);
  const Id = group.serverGrpId;
  try {
    const resp = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_API_URL}/server/`,
      headers: {
        "x-auth-token": token,
      },
      params: {
        servergrp: Id,
      },
    });
    setServerList(resp.data);
  } catch (err) {
    //console.error(err);
  }
  setLoading(false);
};

const getJenkinsJobs = async (
  setJenkinsJob,
  service,
  status,
  token,
  setLoading
) => {
  setLoading(true);
  const serviceName = service.serviceName.toLowerCase();
  try {
    const resp = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_API_URL}/jobs`,
      headers: {
        "x-auth-token": token,
      },
      params: {
        service: serviceName,
        stage: status.statusName.toLowerCase(),
      },
    });
    const arr = [];
    for (let i = 0; i < resp.data.length(); i++) {
      arr.push({ id: i + 1, script: resp.data[i] });
    }
    setJenkinsJob(arr);
  } catch (err) {
    //console.error(err);
  }
  setLoading(false);
};

export { getServiceList, getGroupList, getServerList, getJenkinsJobs };
