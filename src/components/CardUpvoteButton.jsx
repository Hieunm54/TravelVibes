import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleUpvote } from "../services/posts";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CardUpvoteButton = ({ postId, isUpvote, upvoteCount }) => {
  const auth = useSelector((state) => state.auth);
  const [upvoted, setUpvoted] = useState(isUpvote);
  const [count, setCount] = useState(upvoteCount);

  const handleToggleUpvote = async () => {
    try {
      const response = await toggleUpvote(auth.token, postId);
      setUpvoted(!upvoted);
      setCount(response.data.upvote.length);
    } catch (e) {
      toast.error("Unable to upvote/downvote.");
    }
  };

  return (
    <button
      className="flex items-center space-x-1"
      onClick={handleToggleUpvote}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-up-long"
        className={`${upvoted ? "text-blue-500" : ""}`}
      />
      <p>{count}</p>
    </button>
  );
};

export default CardUpvoteButton;
