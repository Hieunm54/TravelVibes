/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONST, eventStates } from "../../constaints";
import CommonModal from "../Modal";
import { useState } from "react";
import Event from "../../pages/Event";
import moment from "moment";

const EventItem = ({ event, onAddToJourney = null }) => {
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
      <div className="block p-1 hover:cursor-pointer w-full">
        <div className="flex flex-col justify-between h-full hover:bg-gray-200 p-2 rounded-md">
          <div onClick={(e) => handleChooseEvent(e, event._id)}>
            <img
              src={`${CONST.IMAGE_URL}/${displayCover}`}
              className="block w-full rounded-md"
            />
            <time className="block text-red-500 text-sm font-bold mt-2">
              {moment(event.date).format(CONST.READABLE_TIME)}
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
          <div className="flex items-center justify-between mt-3">
            <button
              className="bg-rgb-blue rounded-md px-2 py-1 flex items-center space-x-2 text-rgb-white hover:bg-blue-300"
              onClick={onAddToJourney}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
              <span>Add</span>
            </button>
            <p
              className={`px-2 py-1 rounded-md text-rgb-white ${
                eventStates.filter((state) => state.name === event.status)[0]
                  .color
              }`}
            >
              {event.status}
            </p>
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
