import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getPosts } from "../services/posts";
import Layout from "../components/Layout";
import RouteContainer from "../components/RouteContainer";
import VisitingLocationContainer from "../components/VisitingLocationContainer";
import VisitingLocationInfoContainer from "../components/VisitingLocationInfoContainer";
import VisitingLocationInfo from "../components/VisitingLocationInfo";
import VisitingLocationMarker from "../components/VisitingLocationMarker";
import Feeds from "../components/Feeds";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getPostList = async () => {
    try {
      const response = await getPosts(auth.token);
      setPosts(response.data);
    } catch (e) {
      toast.error("Unable to retrieve posts.");
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <Feeds className="col-span-8 py-10">
          <h2 className="text-left w-4/5 font-bold text-4xl">Recent posts</h2>
          {posts.map((post) => (
            <Card key={post._id} id={post._id}>
              <CardAuthor>
                <CardAuthorAva
                  size={14}
                  src={`${IMAGE_URL}/${post.author.avatar}`}
                />
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
        </Feeds>
        <div className="col-span-4 border-l border-gray-200 h-screen overflow-y-scroll py-10 px-5">
          <div className="flex flex-col items-center space-y-7">
            <h2 className="font-bold text-4xl text-left w-full mt-3">
              Upcoming events
            </h2>
            <Link
              to="/events/1"
              className="block border-b border-b-gray-200 last:border-0"
            >
              <img
                src="https://picsum.photos/300/200"
                className="block w-full rounded-md"
              />
              <div className="pb-4">
                <time className="block text-red-500 font-bold mt-2">
                  FRIDAY, 12 JANUARY 2024 AT 17:00
                </time>
                <h3 className="font-bold text-2xl leading-tight">
                  de Finibus Bonorum et Malorum
                </h3>
                <address className="flex space-x-2 mt-2">
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    className="pt-1 text-red-500"
                  />
                  <span>Hanoi Train Street</span>
                </address>
                <button className="mt-3 bg-gray-200 rounded-md px-2 py-1 flex items-center space-x-2">
                  <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                  <span>Save</span>
                </button>
              </div>
            </Link>
            <Link
              to="/events/1"
              className="block border-b border-b-gray-200 last:border-0"
            >
              <img
                src="https://picsum.photos/300/200"
                className="block w-full rounded-md"
              />
              <div className="pb-4">
                <time className="block text-red-500 font-bold mt-2">
                  FRIDAY, 12 JANUARY 2024 AT 17:00
                </time>
                <h3 className="font-bold text-2xl leading-tight">
                  de Finibus Bonorum et Malorum
                </h3>
                <address className="flex space-x-2 mt-2">
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    className="pt-1 text-red-500"
                  />
                  <span>Hanoi Train Street</span>
                </address>
                <div className="mt-3">
                  <Button>
                    <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                    <span>Saved</span>
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
