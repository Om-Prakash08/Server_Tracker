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

const ScriptComponent = (props) => {
  const { serviceAlertData, AlertType, token } = props;
  const [sending, SetSending] = useState(false);
  const [Apierror, setApiError] = useState(false);
  const [emptyAlertError, setEmptyAlertError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [inputFields, setInputFields] = useState([
    { script: "" },
    { script: "" },
    { script: "" },
    { script: "" },
    { script: "" },
  ]);

  useEffect(() => {
    if (serviceAlertData.alertName && serviceAlertData.serverName) {
      getScriptValue(
        setInputFields,
        serviceAlertData.serverId,
        serviceAlertData.alertId,
        token,
        setfetching
      );
    } else {
      setInputFields([{ script: "" }, { script: "" }, { script: "" }]);
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

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].script = event.target.value;
    setInputFields(values);
  };

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
      <form onSubmit={handleSubmit}>
        {fetching  ? (
          <div className="fetching-spinner">
            <CircularProgress />
          </div>
        ) : (
          <div className="script-form-div">
            <div className="form-row">
              {inputFields.map((inputField, index) => (
                <Fragment key={`${index}`}>
                  <div className="form-group ">
                    <textarea
                      type="text"
                      cols="76"
                      rows="2"
                      className={
                        index !== 0 && index !== inputFields.length - 1
                          ? "textarea-input"
                          : ""
                      }
                      id={index}
                      name="script"
                      placeholder={"Script " + JSON.stringify(index + 1)}
                      value={inputField.script}
                      onChange={(event) => handleInputChange(index, event)}
                      autoComplete="off"
                      data-gramm_editor="false"
                    />
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
            </div>
          </div>
        )}
        <Button
          variant="contained"
          size="small"
          color="primary"
          type="submit"
          className="script-submit-btn"
          disabled={sending||fetching}
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
