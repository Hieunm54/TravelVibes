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
// import CardAuthor from "../components/CardAuthor";
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
import { jwtDecode } from "jwt-decode";
import Post from "./Post";
import CommonModal from "../components/Modal";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const auth = useSelector((state) => state.auth);
  const events = useSelector(sGetApprovedEvents);
  const dispatch = useDispatch();
  const { id } = jwtDecode(auth.token);

  const toggleSaveEvent = (e, eventId) => {
    e.stopPropagation();
    console.log("heu save event ", eventId);
  };
  const addToJourney = (e, eventId) => {
    e.stopPropagation();
    console.log("heu add ", eventId);
  };

  const handleChoosePost = (event, id) => {
    event.preventDefault();
    setSelectedPostId(id);
    setOpenModal(true);
  };

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await getPosts(auth.token);
        setPosts(response.data);
      } catch (e) {
        toast.error("Unable to retrieve posts.");
      }
    };
    getPostList();
    dispatch(getApprovedEventsAsync());
    dispatch(getAllMyEventsAsync());
  }, [auth.token, dispatch]);

  return (
    <Layout>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <Feeds className="col-span-8">
          <h1 className="w-full p-4 font-bold text-xl border-b border-gray-100 sticky top-0 left-0 bg-white z-10">
            Feeds
          </h1>
          <CommonModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            className="p-5 h-[90%] w-[90%] overflow-auto z-50"
          >
            <Post id={selectedPostId} onClose={() => setOpenModal(false)} />
          </CommonModal>
          {posts.map((post) => (
            <Card key={post._id}>
              <div
                // to={`/posts/${post._id}`}
                className="grid grid-cols-12 gap-3"
                onClick={(event) => handleChoosePost(event, post._id)}
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
              </div>
              <CardInteractionInfo>
                <div className="col-start-2 flex items-center space-x-5">
                  <CardUpvoteButton
                    postId={post._id}
                    isUpvote={
                      post.upvote.filter((userId) => userId === id).length !== 0
                    }
                    upvoteCount={post.upvote.length}
                  />
                  <CardCommentCount count={post.countComments} />
                </div>
              </CardInteractionInfo>
            </Card>
          ))}
        </Feeds>

        <div className="col-span-4 border-l border-gray-100 h-screen overflow-y-scroll">
          <div className="flex flex-col items-center">
            <h1 className="w-full p-4 font-bold text-xl border-b border-gray-100 sticky top-0 left-0 bg-white z-10">
              Upcoming Events
            </h1>
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
