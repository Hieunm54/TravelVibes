import React from "react";

const ButtonGroup = ({ children, className }) => {
  return (
    <div className={`px-5 py-4 flex space-x-2 items-center ${className}`}>
      {children}
    </div>
  );
};

export default ButtonGroup;
