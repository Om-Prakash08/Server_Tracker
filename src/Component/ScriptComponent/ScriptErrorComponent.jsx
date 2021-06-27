import React from "react";

const ScriptErrorComponent = (props) => {
  const { Apierror, emptyAlertError, success, AlertType} = props;
  return (
    <React.Fragment>
     <div style={{ height:10}}>
      {Apierror && (
        <p className="error-occured" >
          Failed, please try again.
        </p>
      )}
      {emptyAlertError && !AlertType && (
        <p className="error-occured" >
          Please select alert first.
        </p>
      )}
      {success && !Apierror && !emptyAlertError && (
        <p className="success-occured" >
          Successfully saved!
        </p>
      )}
      </div>
    </React.Fragment>
  );
};
export default ScriptErrorComponent;
