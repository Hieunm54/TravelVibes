import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VisitingLocationActionBtn = ({ disabled, className, onClick, icon }) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default VisitingLocationActionBtn;
