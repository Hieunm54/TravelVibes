import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserPosts } from "../services/users";
import RouteContainer from "../components/RouteContainer";
import VisitingLocationContainer from "../components/VisitingLocationContainer";
import VisitingLocationInfoContainer from "../components/VisitingLocationInfoContainer";
import VisitingLocationInfo from "../components/VisitingLocationInfo";
import VisitingLocationMarker from "../components/VisitingLocationMarker";
import Card from "../components/Card";
import CardMap from "../components/CardMap";
import CardRoute from "../components/CardRoute";
import CardCaption from "../components/CardCaption";
import CardAuthorAva from "../components/CardAuthorAva";
import CardAuthorName from "../components/CardAuthorName";
import CardInteractionInfo from "../components/CardInteractionInfo";
import CardUpvoteButton from "../components/CardUpvoteButton";
import CardCommentCount from "../components/CardCommentCount";
import { CONST } from "../constaints";
import { Link } from "react-router-dom";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getUserPostList = async () => {
    try {
      const response = await getUserPosts(auth.token);
      setPosts(response.data);
    } catch (e) {
      toast.error("Unable to retrieve posts.");
    }
  };

  useEffect(() => {
    getUserPostList();
  }, []);

  return (
    <div className="flex flex-col space-y-5 items-center">
      {posts.map((post) => (
        <Card key={post._id}>
          <Link
            to={`/posts/${post._id}`}
            className="grid grid-cols-12 gap-3 px-56"
          >
            <CardAuthorAva
              size={10}
              src={`${CONST.IMAGE_URL}/${post.author.avatar}`}
            />
            <div className="col-span-11">
              <div className="flex">
                <CardAuthorName
                  name={`${post.author.firstName} ${post.author.lastName}`}
                />
                <span className="px-1 text-gray-500">•</span>
                <time className="text-gray-500">
                  {new Date(post.createdAt).toDateString()}
                </time>
              </div>
              <CardCaption className="mt-1">{post.caption}</CardCaption>
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
              <CardMap attractions={post.attractions} />
            </div>
          </Link>
          <CardInteractionInfo className="px-56">
            <div className="col-start-2 flex items-center space-x-5">
              <CardUpvoteButton
                postId={post._id}
                isUpvote={post.isUpvote}
                upvoteCount={post.upvote.length}
              />
              <CardCommentCount count={post.countComments} />
            </div>
          </CardInteractionInfo>
        </Card>
      ))}
    </div>
  );
};

export default UserPosts;
