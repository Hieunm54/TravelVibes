import React from "react";

const VisitingLocationInfo = ({ name, address }) => {
  return (
    <div>
      <h3 className="font-bold text-xl">{name}</h3>
      <address className="mt-1">{address}</address>
    </div>
  );
};

export default VisitingLocationInfo;
