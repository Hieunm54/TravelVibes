import React from "react";

const CardCaption = ({ children, className = "" }) => {
  return <p className={className}>{children}</p>;
};

export default CardCaption;
