import React from "react";

const Feeds = ({ children, className }) => {
  return (
    <div
      className={`bg-gray-100 h-screen overflow-y-scroll flex flex-col items-center space-y-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Feeds;
