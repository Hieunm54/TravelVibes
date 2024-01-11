/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CONST } from "../../constaints";
import CommonModal from "../Modal";
import { useState } from "react";
import Event from "../../pages/Event";

const EventItem = ({
  event,
  onToggleSaveEvent = null,
  onAddToJourney = null,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const displayCover = event.images[0]
    ? event.images[0].fileName
    : CONST.DEFAULT_EVENT_COVER;

  const handleChooseEvent = (e, id) => {
    e.preventDefault();
    setSelectedId(id);
    setOpenModal(true);
  };

  return (
    <>
      <div className="block border-b pt-3 pb-4 px-4 border-b-gray-100 last:border-0 hover:bg-gray-100">
        <div>
          <div
            to={`/events/${event._id}`}
            onClick={(e) => handleChooseEvent(e, event._id)}
          >
            <img
              src={`${CONST.IMAGE_URL}/${displayCover}`}
              className="block w-full rounded-md"
            />
            <time className="block text-red-500 text-sm font-bold mt-2">
              {event.date}
            </time>
            <h3 className="font-bold text-xl leading-tight">{event.name}</h3>
            <address className="flex space-x-2 mt-2">
              <FontAwesomeIcon
                icon="fa-solid fa-location-dot"
                className="pt-1 text-red-500"
              />
              <span>{event.attraction.name}</span>
            </address>
          </div>
          <div className="flex items-center space-x-2">
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
        <CommonModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          className="p-5 h-[90%] w-[90%] overflow-auto z-50"
        >
          <Event id={selectedId} onClose={() => setOpenModal(false)} />
        </CommonModal>
      </div>
    </>
  );
};

export default EventItem;
