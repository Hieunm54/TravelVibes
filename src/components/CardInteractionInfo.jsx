import React from "react";

const CardInteractionInfo = ({ children, className }) => {
  return (
    <div className={`grid grid-cols-12 gap-3 mt-5 ${className}`}>
      {children}
    </div>
  );
};

export default CardInteractionInfo;
