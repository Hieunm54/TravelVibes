/* eslint-disable react/prop-types */
import { useEffect } from "react";
import SecondaryButtonGroup from "../components/SecondaryButtonGroup";
import SecondaryButton from "../components/SecondaryButton";
import PostMap from "../components/PostMap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appRoutes } from "../enum/routes";
import { getEventDetailAsync } from "../store/actions/events";
import { sGetEventDetails, sGetUserInfo } from "../store/selectors";
import { CONST } from "../constaints";
import { formatDisplayName } from "../utils/formatDisplayName";
import _ from "lodash";
import moment from "moment";
import DangerButton from "../components/Button/DangerButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Event = ({ id, onClose }) => {
  const eventDetails = useSelector(sGetEventDetails);
  const user = useSelector(sGetUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getEventDetailAsync(id));
  }, [dispatch, id]);

  const handleDeleteEvent = async () => {
    // TODO: Call Delete Event API
  };
  // const handleGoBack = () => navigate(-1);

  if (!user) {
    navigate("/sign-in");
    return;
  }

  return (
    <>
      {_.isEmpty(eventDetails) ? (
        <div className="text-center">No event found</div>
      ) : (
        <div className="h-screen overflow-auto">
          <div className="h-screen overflow-y-scroll px-5">
            <div className="pb-3">
              <button onClick={onClose}>
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  className="text-2xl"
                />
              </button>
            </div>
            <img
              src={`${CONST.IMAGE_URL}/${eventDetails.images[0].fileName}`}
              className="block w-full rounded-md"
            />
            <div className="mt-3">
              <div className="flex flex-col space-y-1 mt-3 col-span-2">
                <time className="font-bold text-xl text-red-500">
                  {moment(eventDetails.date).format(CONST.READABLE_TIME)}
                </time>
                <h3 className="font-bold text-4xl pb-2">{eventDetails.name}</h3>
                <div className="border-t border-gray-200 grid grid-cols-3 gap-10 pt-5">
                  <p className="col-span-2 border-r border-gray-200 pr-10">
                    {eventDetails.description}
                  </p>
                  <div className="relative">
                    <div className="sticky top-0 left-0 w-full flex flex-col space-y-3">
                      <div>{eventDetails.attraction.name}</div>
                      <address className="block w-full h-72">
                        <PostMap
                          style={{ borderRadius: "6px" }}
                          attractions={[eventDetails.attraction]}
                        />
                      </address>
                      <div>
                        Poster:{" "}
                        <span className="font-bold">
                          {formatDisplayName(eventDetails.poster)}
                        </span>
                      </div>
                      {eventDetails.isOwner && (
                        <div className="mt-2 border-t border-gray-200">
                          <SecondaryButtonGroup>
                            <SecondaryButton>
                              <Link
                                to={appRoutes.EDIT_EVENT.replace(
                                  ":id",
                                  eventDetails._id
                                )}
                              >
                                Edit
                              </Link>
                            </SecondaryButton>
                            <DangerButton onClick={handleDeleteEvent}>
                              Delete
                            </DangerButton>
                          </SecondaryButtonGroup>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Event;
