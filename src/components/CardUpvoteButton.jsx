/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sGetUserInfo } from "../store/selectors";
import { toggleUpvoteAsync } from "../store/actions/posts";

const CardUpvoteButton = ({ postId, isUpvote, upvote = [] }) => {
  const dispatch = useDispatch();

  const handleToggleUpvote = async () => {
    try {
      dispatch(toggleUpvoteAsync(postId));
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
        className={`${isUpvote ? "text-blue-500" : ""}`}
      />
      <p>{upvote.length}</p>
    </button>
  );
};

export default CardUpvoteButton;
