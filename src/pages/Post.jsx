/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

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
import SecondaryButtonGroup from "../components/SecondaryButtonGroup";
import SecondaryButton from "../components/SecondaryButton";
import AddVisitingLocationBtn from "../components/AddVisitingLocationBtn";
import { getAttractions } from "../services/attractions";
import AttractionSuggestion from "../components/AttractionSuggestion";
import VisitingLocationCTA from "../components/VisitingLocationCTA";
import VisitingLocationActionBtn from "../components/VisitingLocationActionBtn";
import { buttonStyle } from "../styles/button";
import { CONST } from "../constaints";
import { sGetPostDetail, sGetUserInfo } from "../store/selectors";
import {
  deleteCommentAsync,
  deletePostAsync,
  getCommentListAsync,
  getPostDetailsAsync,
  sendCommentAsync,
  updateCommentAsync,
  updatePostAsync,
  moveDownAttraction,
  moveUpAttraction,
  deleteAttraction,
  addAttraction,
} from "../store/actions/posts";
import DangerButton from "../components/Button/DangerButton";

const Post = ({ id, onClose }) => {
  const [postDes, setPost] = useState(null);
  const post = useSelector(sGetPostDetail);

  const [backupPost, setBackupPost] = useState(null);

  const [commentInput, setCommentInput] = useState("");
  const [editCommentInput, setEditCommentInput] = useState("");
  const [commentToBeEdited, setCommentToBeEdited] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [captionInput, setCaptionInput] = useState("");
  const [isFindingAttraction, setIsFindingAttraction] = useState(false);
  const [attractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);
  const auth = useSelector((state) => state.auth);
  const currentUser = useSelector(sGetUserInfo);

  const dispatch = useDispatch();
  const { id: userId } = jwtDecode(auth.token);

  const handleCommentInputChange = (event) =>
    setCommentInput(event.target.value);
  const handleEditCommentInputChange = (event) =>
    setEditCommentInput(event.target.value);
  const handleCaptionInputChange = (event) =>
    setCaptionInput(event.target.value);
  const handleAttractionInput = (event) => {
    setAttractionInput(event.target.value);
    getAttractionSuggestions();
  };

  const handleUpdatePost = async () => {
    try {
      const editedPost = {
        ...post,
        caption: captionInput,
      };
      dispatch(updatePostAsync(id, editedPost));
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
    dispatch(moveDownAttraction(index));
  };

  const isMovingUpBtnDisabled = (index) => index == 0;
  const handleMoveUpAttraction = (index) => {
    dispatch(moveUpAttraction(index));
  };

  const handleDeleteAttraction = (index) => {
    dispatch(deleteAttraction(index));
  };

  const getAttractionSuggestions = async () => {
    try {
      const response = await getAttractions(auth.token, {
        q: attractionInput,
      });
      setAttractionSuggestions(response.data);
    } catch (e) {
      setAttractionSuggestions([]);
    }
  };

  const handleAddAttraction = (attraction) => {
    dispatch(addAttraction(attraction));
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
      dispatch(deletePostAsync(id));
      onClose();
    } catch (e) {
      toast.error("Unable to delete post.");
    }
  };

  const handleSendComment = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        sendCommentAsync(id, {
          content: commentInput.trim(),
        })
      );
      setCommentInput("");
    } catch (e) {
      toast.error("Unable to send comment.");
    }
  };

  const handleEditComment = (comment) => {
    setCommentToBeEdited(comment);
    setEditCommentInput(comment.content);
  };

  const handleUpdateComment = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        updateCommentAsync(id, commentToBeEdited._id, {
          content: editCommentInput.trim(),
        })
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
      dispatch(deleteCommentAsync(id, commentId));
    } catch (e) {
      toast.error("Unable to delete comment.");
    }
  };

  useEffect(() => {
    dispatch(getPostDetailsAsync(id));
    dispatch(getCommentListAsync(id));
  }, [dispatch, id]);

  return (
    <>
      {_.isEmpty(post) ? (
        <div className="text-center">No post found</div>
      ) : (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <section className="col-span-6 border-r-2 border-gray-300 px-3 h-screen overflow-y-scroll">
            <div className="pb-3 border-b border-gray-200">
              <button onClick={onClose}>
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  className="text-2xl"
                />
              </button>
            </div>
            <div>
              <CardAuthor>
                <CardAuthorAva
                  size={14}
                  src={`${CONST.IMAGE_URL}/${post.author.avatar}`}
                />
                <div>
                  <CardAuthorName
                    name={`${post.author.firstName} ${post.author.lastName}`}
                  />
                  <SecondaryButtonGroup className="mt-1">
                    {isEditing ? (
                      <>
                        <SecondaryButton
                          disabled={
                            editCommentInput === "" &&
                            post.attractions.length === 0
                          }
                          onClick={handleUpdatePost}
                        >
                          Save
                        </SecondaryButton>
                        <SecondaryButton onClick={handleCancelEditingPost}>
                          Cancel
                        </SecondaryButton>
                      </>
                    ) : (
                      <>
                        {userId === post.author._id && (
                          <>
                            <SecondaryButton onClick={handleEditPost}>
                              Edit
                            </SecondaryButton>
                            <DangerButton onClick={handleDeletePost}>
                              Delete
                            </DangerButton>
                          </>
                        )}
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
                            value={attractionInput}
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
                                key={suggestion._id}
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
                  isUpvote={
                    post.upvote.findIndex(
                      (user) => user._id === currentUser._id
                    ) >= 0
                  }
                  upvote={post.upvote}
                />
                <CardCommentCount count={post.comments.length ?? 0} />
              </CardInteractionInfo>
            </div>
            <div className="border-t border-gray-300 mt-2 py-5 px-5 h-screen">
              <Form onSubmit={handleSendComment}>
                <CardAuthorAva
                  size={14}
                  src={`${CONST.IMAGE_URL}/${currentUser.avatar}`}
                />
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
              <div className="flex flex-col space-y-4 mt-3 h-screen overflow-auto">
                {post.comments
                  .slice(0)
                  .reverse()
                  .map((comment) => (
                    <div className="flex space-x-2" key={comment._id}>
                      <CardAuthorAva
                        size={14}
                        src={`${CONST.IMAGE_URL}/${comment.user.avatar}`}
                      />
                      <div className="bg-gray-100 border border-gray-100 w-full px-3 py-2 rounded-md">
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
                        {userId === comment.user._id && (
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
                                <DangerButton
                                  onClick={() =>
                                    handleDeleteComment(comment._id)
                                  }
                                >
                                  Delete
                                </DangerButton>
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
          <section className="col-span-6">
            <PostMap attractions={post.attractions} />
          </section>
        </div>
      )}
    </>
  );
};

export default Post;
