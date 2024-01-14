import React from "react";

const Feeds = ({ children, className }) => {
  return (
    <div className={`h-screen flex flex-col items-center pb-5 ${className}`}>
      {children}
    </div>
  );
};

export default Feeds;
