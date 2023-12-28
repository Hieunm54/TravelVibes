import React from "react";

const CommentForm = ({ onSubmit, children }) => {
  return (
    <form className="flex items-center space-x-2" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default CommentForm;
