import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  sGetApprovedEvents,
  sGetPostList,
  sGetUserInfo,
} from "../store/selectors";
import EventItem from "../components/Events/EventItem";
import { addAttraction } from "../store/attractions";
import Post from "./Post";
import CommonModal from "../components/Modal";
import { getPostListAsync } from "../store/actions/posts";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { appRoutes, authRoutes } from "../enum/routes";
import { getAttraction } from "../services/attractions";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const events = useSelector(sGetApprovedEvents);
  const posts = useSelector(sGetPostList);
  const currentUser = useSelector(sGetUserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      return;
    }
    navigate(authRoutes.SIGN_IN);
  }, [auth.token, navigate]);

  const addToJourney = async (event) => {
    try {
      const response = await getAttraction(auth.token, event.attraction._id);
      dispatch(addAttraction(response.data));
      navigate(appRoutes.NEW_POST);
    } catch (e) {
      toast.error("Unable to retrieve attraction details.");
    }
  };

  const handleChoosePost = (event, id) => {
    event.preventDefault();
    setSelectedPostId(id);
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(getPostListAsync());
    dispatch(getApprovedEventsAsync());
    dispatch(getAllMyEventsAsync());
  }, [auth.token, dispatch]);

  return (
    <Layout>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <Feeds className="col-span-8">
          <h1 className="w-full p-4 font-bold text-lg border-b border-gray-200 sticky top-0 left-0 bg-white z-10">
            Feeds
          </h1>
          <CommonModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            className="p-5 h-[90%] w-[90%] overflow-auto z-50"
          >
            <Post id={selectedPostId} onClose={() => setOpenModal(false)} />
          </CommonModal>
          {_.isEmpty(posts) ? (
            <div className="text-center">No posts yet</div>
          ) : (
            <div className="pt-3 overflow-y-scroll">
              {posts.map((post) => (
                <Card key={post._id} className="border border-gray-200">
                  <div
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
                          post.upvote.findIndex(
                            (user) => user._id === currentUser._id
                          ) >= 0
                        }
                        upvote={post.upvote}
                      />
                      <CardCommentCount count={post.countComments} />
                    </div>
                  </CardInteractionInfo>
                </Card>
              ))}
            </div>
          )}
        </Feeds>

        <div className="col-span-4 flex flex-col items-center h-screen pb-5">
          <h1 className="w-full p-4 font-bold text-lg border-b border-gray-200 sticky top-0 left-0 bg-white z-10">
            Upcoming Events
          </h1>
          <div className="h-full overflow-y-scroll">
            {events.map((event) => {
              return (
                <div className="pb-7 last:pb-0">
                  <EventItem
                    key={event._id}
                    event={event}
                    onAddToJourney={() => addToJourney(event)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
