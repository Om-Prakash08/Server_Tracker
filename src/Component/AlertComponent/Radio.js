import React from "react";
import "./radio.css";
// import CheckIcon from '@material-ui/icons/Check';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

const Radio = (props) => {
  const { selected, onChange, text, value, id,first,serverIsSelected ,setErr,status} = props;
  return (
    <div className={`modern-radio-container ${value === selected.name && "selected-container"}  ${first && "first-container"}`}
      onClick={() => {
        if(serverIsSelected)
         onChange({ id: id, name: value });
        else
          setErr(true) ;
      }}
    >   <div >
        <div className={`radio-outer-circle ${value !== selected.name && "unselected"}`}>
            <div className={`radio-inner-circle ${value !== selected.name && "unselected-circle" }`}/>
        </div> </div>
        <div className={`helper-text ${value === selected.name && "helper-selected-text"}`}>
          {text}
        </div>
        {status&&<div className="Active-status">
        <CloudDoneIcon style={{fill: "black",fontSize: 20}} />
        </div>}
    </div>
  );
};

export default Radio;
