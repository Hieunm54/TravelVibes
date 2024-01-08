import React from "react";

const Button = ({ children, onClick, disabled, type }) => {
  return (
    <button
      className={` text-white rounded-md  px-2 py-1 flex items-center space-x-2 justify-center ${
        disabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
