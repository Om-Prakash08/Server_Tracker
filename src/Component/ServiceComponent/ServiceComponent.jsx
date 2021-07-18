import React, { useState, useEffect } from "react";
import "./ServiceComponent.css";
import ServiceRenderPage from "./serviceRenderPage";
import { getServiceList, getGroupList, getServerList ,getJenkinsJobs} from "./fetchServerList";

const ServerComponent = (props) => {
  const { setServiceData, serviceData, token, logout, setServiceName, setJenkinsJob } = props;
  const [service, setService] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [group, setGroup] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [server, setServer] = useState(null);
  const [serverList, setServerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalidToken, setInValidity] = useState(false);
  const [status, setStatus] = useState(null);
  const statusList = [
    { statusName: "production", statusId: 1 },
    { statusName: "development", statusId: 2 },
  ];
  useEffect(() => {
    getServiceList(setServiceList, token, setLoading, setInValidity);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (invalidToken) logout();
    // eslint-disable-next-line
  }, [invalidToken]);

  useEffect(() => {
    if (service) {
      setServiceData({
        serviceId: service.serviceId,
        serviceName: service.ServiceName,
        groupId: "",
        groupName: "",
        serverId: "",
        serverName: "",
        alertId: "",
        alertName: "",
      });
    } else {
      setServiceData({
        serviceId: "",
        serviceName: "",
        groupId: "",
        groupName: "",
        serverId: "",
        serverName: "",
        alertId: "",
        alertName: "",
      });
    } // eslint-disable-next-line
  }, [service]);
  useEffect(() => {
    if (status && service) {
      getGroupList(setGroupList, service, token, setLoading);
      getJenkinsJobs(setJenkinsJob,service,status,token,setLoading)
    } // eslint-disable-next-line
  }, [status, service]);

  useEffect(() => {
    if (group) {
      getServerList(setServerList, group, token, setLoading);

      setServiceData({
        ...serviceData,
        groupId: group.serverGrpId,
        groupName: group.serverGrpName,
        serverId: "",
        serverName: "",
        alertId: "",
        alertName: "",
      });
    } else {
      setServiceData({
        ...serviceData,
        groupId: "",
        groupName: "",
        serverId: "",
        serverName: "",
        alertId: "",
        alertName: "",
      });
      setServerList([]);
      setServer(null);
    }
    // eslint-disable-next-line
  }, [group]);

  useEffect(() => {
    if (server) {
      setServiceData({
        ...serviceData,
        serverId: server.serverId,
        serverName: server.serverName,
        alertId: "",
        alertName: "",
      });
    } else {
      setServiceData({
        ...serviceData,
        serverId: "",
        serverName: "",
        alertId: "",
        alertName: "",
      });
    }
    // eslint-disable-next-line
  }, [server]);

  // handle change event of the service dropdown
  const handleserviceChange = (obj) => {
    setService(obj);
    setServiceName(obj.serviceName.toLowerCase());
    setGroup(null);
  };

  // handle change event of the group dropdown
  const handleGroupChange = (obj) => {
    setGroup(obj);
    setServer(null);
  };
  // handle change event of the server dropdown
  const handleServerChange = (obj) => {
    setServer(obj);
  };
  const handleStatusChange = (obj) => {
    setStatus(obj);
  };

  return (
    <ServiceRenderPage
      service={service}
      serviceList={serviceList}
      handleserviceChange={handleserviceChange}
      group={group}
      groupList={groupList}
      handleGroupChange={handleGroupChange}
      server={server}
      serverList={serverList}
      handleServerChange={handleServerChange}
      loading={loading}
      status={status}
      statusList={statusList}
      handleStatusChange={handleStatusChange}
    />
  );
};

export default ServerComponent;
