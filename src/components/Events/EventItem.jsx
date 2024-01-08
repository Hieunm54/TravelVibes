/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CONST } from "../../constaints";

const EventItem = ({
  event,
  onToggleSaveEvent = null,
  onAddToJourney = null,
}) => {
  const displayCover = event.images[0]
    ? event.images[0].fileName
    : CONST.DEFAULT_EVENT_COVER;
  return (
    <div className="block border-b p-2 border-b-gray-200 last:border-0 shadow-xl shadow-slate-300 hover:shadow-xl hover:shadow-gray-500 ">
      <img
        src={`${CONST.IMAGE_URL}/${displayCover}`}
        className="block w-full rounded-md"
      />
      <div className="p-2">
        <Link to={`/events/${event._id}`}>
          <time className="block text-red-500 font-bold mt-2">
            {event.date}
          </time>
          <h3 className="font-bold text-2xl leading-tight">{event.name}</h3>
          <address className="flex space-x-2 mt-2">
            <FontAwesomeIcon
              icon="fa-solid fa-location-dot"
              className="pt-1 text-red-500"
            />
            <span>{event.attraction.name}</span>
          </address>
        </Link>
        <div className="flex justify-between">
          <button
            className="mt-3 bg-rgb-blue rounded-md px-2 py-1 flex items-center space-x-2 text-rgb-white hover:bg-blue-300"
            onClick={(e) => onAddToJourney(e, event._id)}
          >
            <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
            <span>Add</span>
          </button>
          <button
            className="mt-3 bg-gray-200 rounded-md px-2 py-1 flex items-center space-x-2 hover:bg-gray-300"
            onClick={(e) => onToggleSaveEvent(e, event._id)}
          >
            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
