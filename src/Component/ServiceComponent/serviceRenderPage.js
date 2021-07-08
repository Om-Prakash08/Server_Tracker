import Select from "react-select";
import LoadingSpinner from "../loadingSpinner";
const ServiceRenderPage = (props) => {
  const {
    service,
    serviceList,
    handleserviceChange,
    group,
    groupList,
    handleGroupChange,
    server,
    serverList,
    handleServerChange,
    loading ,
    status,
    statusList ,
    handleStatusChange
  } = props;
  const customStyles = {
    control: base => ({
      ...base,
      height: 43,
    })
  };
  return (
    <div className="col-lg-3 first">
     <LoadingSpinner loading={loading}/>
      <div className="Dropdown-container">
        <div className="select-div">
          <b style={{ margin: 4 }}>Component</b>
          <Select
            placeholder="Select Component"
            components={{  IndicatorSeparator:() => null }}
            value={service}
            options={serviceList}
            onChange={handleserviceChange}
            getOptionLabel={(x) => x.serviceName}
            getOptionValue={(x) => x.serviceId}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                neutral0: "white",
                neutral50: "rgb(148, 3, 3)",
              },
            })}
          />
        </div>
        <br />
        <div className="select-div">
          <b style={{ margin: 4 }}>Server Group</b>
          <Select
            placeholder="Select Server Group"
            components={{  IndicatorSeparator:() => null }}
            value={group}
            options={groupList}
            onChange={handleGroupChange}
            getOptionLabel={(x) => x.serverGrpName}
            getOptionValue={(x) => x.serverGrpId}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,

                neutral0: "white",
                neutral50: "rgb(148, 3, 3)",
              },
            })}
          />
        </div>
        <br />
        <div className="select-div">
          <b style={{ margin: 4 }}>Server</b>
          <Select
            placeholder="Select Server"
            components={{  IndicatorSeparator:() => null }}
            value={server}
            options={serverList}
            onChange={handleServerChange}
            getOptionLabel={(x) => x.serverName}
            getOptionValue={(x) => x.serverId}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,

                neutral0: "white",
                neutral50: "rgb(148, 3, 3)",
              },
            })}
          />
        </div>
        <br/>
        <div className="select-div">
          <b style={{ margin: 4 }}>Status</b>
          <Select
            placeholder="Select Status"
            components={{  IndicatorSeparator:() => null }}
            value={status}
            options={statusList}
            onChange={handleStatusChange}
            getOptionLabel={(x) => x.statusName}
            getOptionValue={(x) => x.statusId}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,

                neutral0: "white",
                neutral50: "rgb(148, 3, 3)",
              },
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default ServiceRenderPage;
