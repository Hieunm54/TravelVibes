import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { CONST } from "../constaints";
import {
  getAllMyEventsAsync,
  getApprovedEventsAsync,
} from "../store/actions/events";
import { sGetApprovedEvents } from "../store/selectors";
import EventItem from "../components/Events/EventItem";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const auth = useSelector((state) => state.auth);
  const events = useSelector(sGetApprovedEvents);
  const dispatch = useDispatch();
  const getPostList = async () => {
    try {
      const response = await getPosts(auth.token);
      setPosts(response.data);
    } catch (e) {
      toast.error("Unable to retrieve posts.");
    }
  };

  const toggleSaveEvent = (e, eventId) => {
    e.stopPropagation();
    console.log("heu save event ", eventId);
  };
  const addToJourney = (e, eventId) => {
    e.stopPropagation();
    console.log("heu add ", eventId);
  };

  useEffect(() => {
    getPostList();
    dispatch(getApprovedEventsAsync());
    dispatch(getAllMyEventsAsync());
  }, [dispatch]);

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
                  src={`${CONST.IMAGE_URL}/${post.author.avatar}`}
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
        <div className="col-span-4 border-l border-gray-200 h-screen overflow-y-scroll py-10 px-5 bg-gray-100">
          <div className="flex flex-col items-center space-y-7">
            <h2 className="font-bold text-4xl text-left w-full mt-3">
              Upcoming events
            </h2>
            {events.map((event) => {
              return (
                <EventItem
                  key={event._id}
                  event={event}
                  onToggleSaveEvent={toggleSaveEvent}
                  onAddToJourney={addToJourney}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
