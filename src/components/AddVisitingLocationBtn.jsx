import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appRoutes } from "../enum/routes";

const AddVisitingLocationBtn = ({ onClick }) => {
  return (
    <button
      className="flex space-x-3 px-1 py-1 text-gray-300 hover:text-blue-500"
      onClick={onClick}
    >
      <div>
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </div>
      <div>
        <span>Add an attraction to visit</span>
      </div>
    </button>
  );
};

export default AddVisitingLocationBtn;
