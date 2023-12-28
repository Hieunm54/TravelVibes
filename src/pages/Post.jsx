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
import CommentForm from "../components/CommentForm";
import { deletePost, getPost } from "../services/posts";
import {
  deleteComment,
  getComments,
  sendComment,
  updateComment,
} from "../services/comments";
import SecondaryButtonGroup from "../components/SecondaryButtonGroup";
import SecondaryButton from "../components/SecondaryButton";

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editCommentInput, setEditCommentInput] = useState("");
  const [commentToBeEdited, setCommentToBeEdited] = useState(null);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const { id: userId } = jwtDecode(auth.token);

  const handleCommentInputChange = (evt) => setCommentInput(evt.target.value);

  const handleEditCommentInputChange = (evt) =>
    setEditCommentInput(evt.target.value);

  const getPostDetails = async () => {
    try {
      const response = await getPost(auth.token, id);
      setPost(response.data);
    } catch (e) {
      toast.error("Unable to retrieve post details.");
    }
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
      await sendComment(auth.token, id, { content: commentInput });
      setCommentInput("");
      getCommentList();
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
      setCommentToBeEdited(null);
      setEditCommentInput("");
      getCommentList();
    } catch (e) {
      toast.error("Unable to send comment.");
    }
  };

  const handleCancelEditingComment = () => setCommentToBeEdited(null);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(auth.token, id, commentId);
      getCommentList();
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
                    <SecondaryButton>Edit</SecondaryButton>
                    <SecondaryButton onClick={handleDeletePost}>
                      Delete
                    </SecondaryButton>
                  </SecondaryButtonGroup>
                </div>
              </CardAuthor>
              <CardCaption>{post.caption}</CardCaption>
              <CardRoute>
                <RouteContainer>
                  {post.attractions.map((attraction) => (
                    <VisitingLocationContainer key={attraction._id}>
                      <VisitingLocationMarker />
                      <VisitingLocationInfoContainer>
                        <VisitingLocationInfo
                          name={attraction.name}
                          address={attraction.address}
                        />
                      </VisitingLocationInfoContainer>
                    </VisitingLocationContainer>
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
              <CommentForm onSubmit={handleSendComment}>
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
              </CommentForm>
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
                          <CommentForm onSubmit={handleUpdateComment}>
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
                          </CommentForm>
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
