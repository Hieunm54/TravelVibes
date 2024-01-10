import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VisitingLocation = () => {
  return (
    <div className="pt-1.5 flex flex-col items-center space-y-2">
      <FontAwesomeIcon
        icon="fa-solid fa-circle-dot"
        className="text-red-500 text-xs"
      />
      <div className="h-full">
        <div className="inline-block h-full w-0.5 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default VisitingLocation;
