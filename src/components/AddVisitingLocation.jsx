import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appRoutes } from "../enum/routes";

const AddVisitingLocation = () => {
  return (
    <Link
      to={appRoutes.NEW_POST_FIND_ATTRACTIONS}
      className="flex space-x-3 px-1 py-1 text-gray-300 hover:text-blue-500"
    >
      <div>
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </div>
      <div>
        <span>Add an attraction to visit</span>
      </div>
    </Link>
  );
};

export default AddVisitingLocation;
