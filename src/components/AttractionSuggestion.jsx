import React from "react";

const AttractionSuggestion = ({ name, address }) => {
  return (
    <div className="px-5 py-2 hover:cursor-pointer hover:bg-gray-200">
      <h3 className="font-bold">{name}</h3>
      <address>{address}</address>
    </div>
  );
};

export default AttractionSuggestion;
