import React from "react";

const SecondaryButton = ({ children, onClick, ...otherProps }) => {
  return (
    <button className="hover:text-blue-500" onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

export default SecondaryButton;
