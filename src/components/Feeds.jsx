import React from "react";

const Feeds = ({ children, className }) => {
  return (
    <div
      className={`h-screen overflow-y-scroll flex flex-col items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Feeds;
