import React from "react";

const Card = ({ children }) => {
  return (
    <div className="border border-gray-200 w-4/5 bg-white p-3 rounded-sm">
      {children}
    </div>
  );
};

export default Card;
