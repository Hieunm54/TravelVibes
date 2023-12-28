import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VisitingLocationPopUpInfo = ({ name, address, onDelete = null }) => {
  return (
    <>
      <h4 className="font-bold text-lg leading-tight">{name}</h4>
      <address className="mt-1">{address}</address>
      {onDelete && (
        <div className="flex items-center space-x-2 mt-2">
          <button className="hover:text-blue-500">
            <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={onDelete} />
          </button>
        </div>
      )}
    </>
  );
};

export default VisitingLocationPopUpInfo;
