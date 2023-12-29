import React from "react";

const SecondaryButton = ({ children, onClick }) => {
  return (
    <button className="hover:text-blue-500" onClick={onClick}>
      {children}
    </button>
  );
};

export default SecondaryButton;
