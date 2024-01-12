/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONST, eventStates } from "../../constaints";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEventStatusAsync } from "../../store/actions/events";

const AdminEventItem = ({
  event,
  handleChooseEvent,
  //   handleSelectEventState,
}) => {
  // const [eventState, setEventState] = useState("Pending");
  const [isSelectingEventState, setIsSelectingEventState] = useState(false);
  const dispatch = useDispatch();

  const handleToggleSelectEventState = () => {
    setIsSelectingEventState(!isSelectingEventState);
  };

  const handleSelectEventState = (status) => {
    if (status === event.status) {
      return;
    }
    console.log("hieu status ", status);

    dispatch(updateEventStatusAsync(event._id, status));
    // setEventState(status);
    setIsSelectingEventState(false);
  };

  return (
    <div
      key={event._id}
      className="py-4 px-4 flex space-x-3 bg-white border border-gray-100"
    >
      <div>
        <img
          src={`${CONST.IMAGE_URL}/${
            event.images[0]
              ? event.images[0].fileName
              : CONST.DEFAULT_EVENT_COVER
          }`}
          className="w-56 rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <time className="text-red-500 font-bold">
            {new Date(event.date).toDateString()}
          </time>
          <h2
            className="font-bold text-2xl hover:underline hover:cursor-pointer"
            onClick={() => handleChooseEvent(event._id)}
          >
            {event.name}
          </h2>
          <address className="flex space-x-2 mt-1">
            <FontAwesomeIcon
              icon="fa-solid fa-location-dot"
              className="pt-1 text-red-500"
            />
            <span>{event.attraction.name}</span>
          </address>
        </div>
        <div className="relative w-24">
          <button
            onClick={handleToggleSelectEventState}
            className={`inline-block w-full py-1 px-2 text-left rounded-md text-white ${
              eventStates.filter((state) => state.name === event.status)[0]
                .color
            }`}
          >
            <span>{event.status}</span>
          </button>
          {isSelectingEventState && (
            <ul className="absolute w-full bg-gray-400 border border-gray-100 rounded-md mt-1">
              {eventStates.map((state, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectEventState(state.name)}
                  className="hover:cursor-pointer py-1 px-2  hover:bg-gray-300 border-b border-gray-100"
                >
                  <span>{state.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventItem;
