import React, { useState, Fragment, useEffect } from "react";
import "./ScriptComponent.css";
import Button from "@material-ui/core/Button";
import ScriptErrorComponent from "./ScriptErrorComponent";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import { getScriptValue, sendScriptValue } from "./HandleScriptApi";
import LoadingSpinner from "../loadingSpinner";
import { CircularProgress } from "@material-ui/core";
import Select from "react-select";

const ScriptComponent = (props) => {
  const { serviceAlertData, AlertType, token } = props;
  const [sending, SetSending] = useState(false);
  const [Apierror, setApiError] = useState(false);
  const [emptyAlertError, setEmptyAlertError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const [blur, setBlur] = useState(false);
  const scriptList = [
    { id: 1, script: "script-1" },
    { id: 2, script: "script-2" },
    { id: 3, script: "script-3" },
    { id: 4, script: "script-4" },
    { id: 5, script: "script-5" },
    { id: 6, script: "script-6" },
    { id: 7, script: "script-7" },
  ];
  const emptyList = [];
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 45,
    }),
  };
  useEffect(() => {
    if (serviceAlertData.alertName && serviceAlertData.serverName) {
      setBlur(false);
      getScriptValue(
        setInputFields,
        serviceAlertData.serverId,
        serviceAlertData.alertId,
        token,
        setfetching
      );
    } else {
      setBlur(true);
      setInputFields([{ script: "" }]);
    }
    setSuccess(false);
    // eslint-disable-next-line
  }, [serviceAlertData.alertName, serviceAlertData.serverName]);

  const handleAddFields = (index) => {
    const values = [...inputFields];
    values.splice(index + 1, 0, { script: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };


  const handleInputChange = (index, obj) => {
    if (!blur) {
      const values = [...inputFields];
      values[index].script = obj.script;
      setInputFields(values);
    }}
  
  const handleSubmit = (e) => {
    if (AlertType) {
      const data = {
        alertId: serviceAlertData.alertId,
        serverId: serviceAlertData.serverId,
        scripts: inputFields,
      };
      sendScriptValue(
        SetSending,
        setApiError,
        setSuccess,
        data,
        token,
        setLoading
      );
      setEmptyAlertError(false);
    } else {
      setEmptyAlertError(true);
    }
    e.preventDefault();
  };

  return (
    <div className="col-lg-6 third">
      <LoadingSpinner loading={loading} />
      <div className="Script-heading">
        <h1
          id="Alert-heading"
          style={{ color: "red" }}
          className="Alert-heading"
        >
          {serviceAlertData.alertName}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className={`${blur === true && "Blur"}`}>
        {fetching ? (
          <div className="fetching-spinner">
            <CircularProgress />
          </div>
        ) : (
          <div className="script-form-div">
            <div className="form-row">
              {inputFields.map((inputField, index) => (
                <Fragment key={`${index}`}>
                  <div className="form-group ">
                    <div className="Script-select">
                      <Select
                        placeholder="Select Script"
                        components={{
                          IndicatorSeparator: () => null,
                          DropdownIndicator: () => null,
                        }}
                        value={scriptList.filter(
                          (obj) => obj.script === inputField.script
                        )}
                        options={blur ? emptyList : scriptList}
                        onChange={(obj) => handleInputChange(index, obj)}
                        getOptionLabel={(x) => x.script}
                        getOptionValue={(x) => x.id}
                        styles={customStyles}
                        maxMenuHeight={165}
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
                    <IconButton
                      aria-label="delete"
                      className="delete-script-btn"
                      type="button"
                      onClick={() => handleRemoveFields(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Fab
                      color="primary"
                      aria-label="add"
                      size="small"
                      className="add-script-btn"
                      type="button"
                      onClick={() => handleAddFields(index)}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </Fragment>
              ))}
              <div style={{ height: 165 }}></div>
            </div>
          </div>
        )}
        <Button
          variant="contained"
          size="small"
          color="primary"
          type="submit"
          className="script-submit-btn"
          disabled={sending || fetching || blur}
          style={{ textTransform: "none", fontSize: 18 }}
        >
          Save
        </Button>
      </form>
      <ScriptErrorComponent
        Apierror={Apierror}
        emptyAlertError={emptyAlertError}
        success={success}
        AlertType={AlertType}
        className="ScriptError"
      />
    </div>
  );
};
export default ScriptComponent;
