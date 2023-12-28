import React from "react";

const Feeds = ({ children }) => {
  return (
    <div className="col-span-8 bg-gray-50 h-screen overflow-y-scroll py-10 flex flex-col items-center space-y-10">
      {children}
    </div>
  );
};

export default Feeds;
