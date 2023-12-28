import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardCommentCount = ({ count }) => {
  return (
    <div className="flex items-center space-x-1">
      <FontAwesomeIcon icon="fa-solid fa-comment" />
      <p>{count}</p>
    </div>
  );
};

export default CardCommentCount;
