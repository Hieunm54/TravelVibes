import React from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../enum/routes";

const AttractionSuggestion = ({ id, name, address }) => {
  return (
    <Link
      to={appRoutes.NEW_POST_VIEW_ATTRACTION.replace(":id", id)}
      className="block px-5 py-2 hover:cursor-pointer hover:bg-gray-200"
    >
      <h3 className="font-bold">{name}</h3>
      <address>{address}</address>
    </Link>
  );
};

export default AttractionSuggestion;
