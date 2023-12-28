import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../components/Layout";
import PostMap from "../components/PostMap";
import CardRoute from "../components/CardRoute";
import CardCaption from "../components/CardCaption";
import CardAuthor from "../components/CardAuthor";
import CardAuthorAva from "../components/CardAuthorAva";
import CardAuthorName from "../components/CardAuthorName";
import CardInteractionInfo from "../components/CardInteractionInfo";
import CardUpvoteButton from "../components/CardUpvoteButton";
import CardCommentCount from "../components/CardCommentCount";
import RouteContainer from "../components/RouteContainer";
import VisitingLocationContainer from "../components/VisitingLocationContainer";
import VisitingLocationInfoContainer from "../components/VisitingLocationInfoContainer";
import VisitingLocationInfo from "../components/VisitingLocationInfo";
import VisitingLocationMarker from "../components/VisitingLocationMarker";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Form from "../components/Form";
import { deletePost, getPost, updatePost } from "../services/posts";
import {
  deleteComment,
  getComments,
  sendComment,
  updateComment,
} from "../services/comments";
import SecondaryButtonGroup from "../components/SecondaryButtonGroup";
import SecondaryButton from "../components/SecondaryButton";
import AddVisitingLocationBtn from "../components/AddVisitingLocationBtn";
import { getAttractions } from "../services/attractions";
import AttractionSuggestion from "../components/AttractionSuggestion";
import VisitingLocationCTA from "../components/VisitingLocationCTA";
import VisitingLocationActionBtn from "../components/VisitingLocationActionBtn";
import { buttonStyle } from "../styles/button";

const Post = () => {
  const [post, setPost] = useState(null);
  const [backupPost, setBackupPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editCommentInput, setEditCommentInput] = useState("");
  const [commentToBeEdited, setCommentToBeEdited] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [captionInput, setCaptionInput] = useState("");
  const [isFindingAttraction, setIsFindingAttraction] = useState(false);
  const [attrractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const { id: userId } = jwtDecode(auth.token);

  const handleCommentInputChange = (evt) => setCommentInput(evt.target.value);
  const handleEditCommentInputChange = (evt) =>
    setEditCommentInput(evt.target.value);
  const handleCaptionInputChange = (evt) => setCaptionInput(evt.target.value);
  const handleAttractionInput = (evt) => {
    console.log("Fuck");
    setAttractionInput(evt.target.value);
    getAttractionSuggestions();
  };

  const getPostDetails = async () => {
    try {
      const response = await getPost(auth.token, id);
      setPost(response.data);
    } catch (e) {
      toast.error("Unable to retrieve post details.");
    }
  };

  const handleUpdatePost = async () => {
    try {
      const editedPost = {
        ...post,
        caption: captionInput,
      };
      await updatePost(auth.token, id, editedPost);
      setPost(editedPost);
      setIsEditing(false);
    } catch (e) {
      toast.error("Unable to update post.");
    }
  };

  const activeRearrangeBtnClassName = (callback) =>
    callback() ? buttonStyle.disabled : buttonStyle.hover;

  const isMovingDownBtnDisabled = (index) =>
    index === post.attractions.length - 1;
  const handleMoveDownAttraction = (index) => {
    setPost({
      ...post,
      attractions: [
        ...post.attractions.slice(0, index),
        post.attractions[index + 1],
        post.attractions[index],
        ...post.attractions.slice(index + 2),
      ],
    });
  };

  const isMovingUpBtnDisabled = (index) => index == 0;
  const handleMoveUpAttraction = (index) => {
    setPost({
      ...post,
      attractions: [
        ...post.attractions.slice(0, index - 1),
        post.attractions[index],
        post.attractions[index - 1],
        ...post.attractions.slice(index + 1),
      ],
    });
  };

  const handleDeleteAttraction = (index) => {
    setPost({
      ...post,
      attractions: [
        ...post.attractions.slice(0, index),
        ...post.attractions.slice(index + 1),
      ],
    });
  };

  const getAttractionSuggestions = async () => {
    try {
      const response = await getAttractions(auth.token, {
        q: attrractionInput,
      });
      setAttractionSuggestions(response.data);
    } catch (e) {
      setAttractionSuggestions([]);
    }
  };

  const handleAddAttraction = (attraction) => {
    setPost({
      ...post,
      attractions: [...post.attractions, attraction],
    });
    setIsFindingAttraction(false);
    setAttractionSuggestions([]);
  };

  const handleCancelAddingAttraction = () => {
    setAttractionSuggestions([]);
    setIsFindingAttraction(false);
  };

  const handleFindAttraction = async () => {
    setIsFindingAttraction(true);
  };

  const handleEditPost = async () => {
    setCaptionInput(post.caption);
    setBackupPost({ ...post });
    setIsEditing(true);
  };

  const handleCancelEditingPost = () => {
    setCaptionInput("");
    setPost({ ...backupPost });
    setIsEditing(false);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(auth.token, id);
      navigate("/");
    } catch (e) {
      toast.error("Unable to delete post.");
    }
  };

  const getCommentList = async () => {
    try {
      const response = await getComments(auth.token, id);
      setComments(response.data);
    } catch (e) {
      toast.error("Unable to retrieve comments.");
    }
  };

  const handleSendComment = async (evt) => {
    evt.preventDefault();
    try {
      await sendComment(auth.token, id, {
        content: commentInput,
      });
      getCommentList();
      setCommentInput("");
    } catch (e) {
      toast.error("Unable to send comment.");
    }
  };

  const handleEditComment = (comment) => {
    setCommentToBeEdited(comment);
    setEditCommentInput(comment.content);
  };

  const handleUpdateComment = async (evt) => {
    evt.preventDefault();
    try {
      await updateComment(auth.token, id, commentToBeEdited._id, {
        content: editCommentInput,
      });
      setComments(
        comments.map((comment) =>
          comment._id === commentToBeEdited._id
            ? { ...comment, content: editCommentInput }
            : comment
        )
      );
      setCommentToBeEdited(null);
      setEditCommentInput("");
    } catch (e) {
      toast.error("Unable to send comment.");
    }
  };

  const handleCancelEditingComment = () => setCommentToBeEdited(null);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(auth.token, id, commentId);
      const index = comments.findIndex((comment) => comment._id === commentId);
      setComments([...comments.slice(0, index), ...comments.slice(index + 1)]);
    } catch (e) {
      toast.error("Unable to delete comment.");
    }
  };

  useEffect(() => {
    getPostDetails();
    getCommentList();
  }, []);

  return (
    <Layout>
      {post && (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <section className="col-span-4 border-r-2 border-gray-300 px-5 py-10 h-screen overflow-y-scroll">
            <div>
              <CardAuthor>
                <CardAuthorAva size={12} />
                <div>
                  <CardAuthorName
                    name={`${post.author.firstName} ${post.author.lastName}`}
                  />
                  <SecondaryButtonGroup className="mt-1">
                    {isEditing ? (
                      <>
                        <SecondaryButton onClick={handleUpdatePost}>
                          Save
                        </SecondaryButton>
                        <SecondaryButton onClick={handleCancelEditingPost}>
                          Cancel
                        </SecondaryButton>
                      </>
                    ) : (
                      <>
                        <SecondaryButton onClick={handleEditPost}>
                          Edit
                        </SecondaryButton>
                        <SecondaryButton onClick={handleDeletePost}>
                          Delete
                        </SecondaryButton>
                      </>
                    )}
                  </SecondaryButtonGroup>
                </div>
              </CardAuthor>
              <div className="mt-3">
                {isEditing ? (
                  <FormInput
                    label={false}
                    multiline={true}
                    value={captionInput}
                    onChange={handleCaptionInputChange}
                    placeholder="What are your experience?"
                    onFocus={() => getAttractionSuggestions()}
                  />
                ) : (
                  <CardCaption>{post.caption}</CardCaption>
                )}
              </div>
              <CardRoute>
                <RouteContainer>
                  {post.attractions.map((attraction, index) => (
                    <VisitingLocationContainer key={attraction._id}>
                      <VisitingLocationMarker />
                      <VisitingLocationInfoContainer>
                        <VisitingLocationInfo
                          name={attraction.name}
                          address={attraction.address}
                        />
                        {isEditing && (
                          <VisitingLocationCTA>
                            <VisitingLocationActionBtn
                              disabled={isMovingUpBtnDisabled(index)}
                              className={activeRearrangeBtnClassName(() =>
                                isMovingUpBtnDisabled(index)
                              )}
                              onClick={() => handleMoveUpAttraction(index)}
                              icon="fa-solid fa-arrow-up"
                            />
                            <VisitingLocationActionBtn
                              disabled={isMovingDownBtnDisabled(index)}
                              className={activeRearrangeBtnClassName(() =>
                                isMovingDownBtnDisabled(index)
                              )}
                              onClick={() => handleMoveDownAttraction(index)}
                              icon="fa-solid fa-arrow-down"
                            />
                            <VisitingLocationActionBtn
                              className={buttonStyle.hover}
                              onClick={() => handleDeleteAttraction(index)}
                              icon="fa-solid fa-trash-can"
                            />
                          </VisitingLocationCTA>
                        )}
                      </VisitingLocationInfoContainer>
                    </VisitingLocationContainer>
                  ))}
                  {isEditing &&
                    (isFindingAttraction ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <FormInput
                            label={false}
                            name="attraction"
                            placeholder="Where do you want to visit?"
                            value={attrractionInput}
                            onChange={handleAttractionInput}
                            className="grow"
                          />
                          <button
                            className={buttonStyle.hover}
                            onClick={handleCancelAddingAttraction}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-x" />
                          </button>
                        </div>
                        <div
                          className={
                            attractionSuggestions.length > 0
                              ? `border-l border-r border-b border-gray-200`
                              : ""
                          }
                        >
                          {attractionSuggestions.length > 0 &&
                            attractionSuggestions.map((suggestion) => (
                              <button
                                className="block text-left"
                                onClick={() => handleAddAttraction(suggestion)}
                              >
                                <AttractionSuggestion
                                  name={suggestion.name}
                                  address={suggestion.address}
                                />
                              </button>
                            ))}
                        </div>
                      </>
                    ) : (
                      <AddVisitingLocationBtn onClick={handleFindAttraction} />
                    ))}
                </RouteContainer>
              </CardRoute>
              <CardInteractionInfo>
                <CardUpvoteButton
                  postId={post._id}
                  isUpvote={post.isUpvote}
                  upvoteCount={post.upvote.length}
                />
                <CardCommentCount count={comments.length} />
              </CardInteractionInfo>
            </div>
            <div className="border-t border-gray-300 mt-2 py-2">
              <Form onSubmit={handleSendComment}>
                <CardAuthorAva size={12} />
                <FormInput
                  label={false}
                  name="comment"
                  placeholder="What's your thoughts on this?"
                  value={commentInput}
                  onChange={handleCommentInputChange}
                  className="grow"
                />
                <Button>
                  <FontAwesomeIcon
                    icon="fa-solid fa-paper-plane"
                    className="text-white"
                  />
                </Button>
              </Form>
              <div className="flex flex-col space-y-3 mt-3">
                {comments
                  .slice(0)
                  .reverse()
                  .map((comment) => (
                    <div className="flex space-x-2" key={comment._id}>
                      <CardAuthorAva size={12} />
                      <div className="bg-gray-50 border border-gray-100 w-full px-3 py-2 rounded-md">
                        {commentToBeEdited &&
                        commentToBeEdited._id === comment._id ? (
                          <Form onSubmit={handleUpdateComment}>
                            <FormInput
                              label={false}
                              name="comment"
                              placeholder="What's your thoughts on this?"
                              value={editCommentInput}
                              onChange={handleEditCommentInputChange}
                              className="grow"
                            />
                            <Button>
                              <FontAwesomeIcon
                                icon="fa-solid fa-paper-plane"
                                className="text-white"
                              />
                            </Button>
                          </Form>
                        ) : (
                          <p>{comment.content}</p>
                        )}
                        {userId === comment.user && (
                          <SecondaryButtonGroup className="mt-4">
                            {commentToBeEdited &&
                            commentToBeEdited._id === comment._id ? (
                              <SecondaryButton
                                onClick={handleCancelEditingComment}
                              >
                                Cancel
                              </SecondaryButton>
                            ) : (
                              <>
                                <SecondaryButton
                                  onClick={() => handleEditComment(comment)}
                                >
                                  Edit
                                </SecondaryButton>
                                <SecondaryButton
                                  onClick={() =>
                                    handleDeleteComment(comment._id)
                                  }
                                >
                                  Delete
                                </SecondaryButton>
                              </>
                            )}
                          </SecondaryButtonGroup>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <section className="col-span-8">
            <PostMap attractions={post.attractions} />
          </section>
        </div>
      )}
    </Layout>
  );
};

export default Post;
