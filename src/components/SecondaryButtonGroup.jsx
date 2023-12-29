import React from "react";

const SecondaryButtonGroup = ({ children, className }) => {
  return (
    <div
      className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}
    >
      {children}
    </div>
  );
};

export default SecondaryButtonGroup;
