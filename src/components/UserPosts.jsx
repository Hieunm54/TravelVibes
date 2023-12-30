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
import CardAuthor from "../components/CardAuthor";
import CardAuthorAva from "../components/CardAuthorAva";
import CardAuthorName from "../components/CardAuthorName";
import CardInteractionInfo from "../components/CardInteractionInfo";
import CardUpvoteButton from "../components/CardUpvoteButton";
import CardCommentCount from "../components/CardCommentCount";

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
    <div className="flex flex-col space-y-5 bg-gray-50 items-center px-56 py-5">
      {posts.map((post) => (
        <Card key={post._id} id={post._id}>
          <CardAuthor>
            <CardAuthorAva size={12} />
            <CardAuthorName
              name={`${post.author.firstName} ${post.author.lastName}`}
            />
          </CardAuthor>
          <CardCaption className="mt-3">{post.caption}</CardCaption>
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
          <CardInteractionInfo>
            <CardUpvoteButton
              postId={post._id}
              isUpvote={post.isUpvote}
              upvoteCount={post.upvote.length}
            />
            <CardCommentCount count={post.countComments} />
          </CardInteractionInfo>
        </Card>
      ))}
    </div>
  );
};

export default UserPosts;
