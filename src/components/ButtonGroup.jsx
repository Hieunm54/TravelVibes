import React from "react";

const ButtonGroup = ({ children, className }) => {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
};

export default ButtonGroup;
