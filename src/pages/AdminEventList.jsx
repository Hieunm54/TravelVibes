import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { appRoutes } from "../enum/routes";
import { useNavigate } from "react-router-dom";
import { CONST } from "../constaints";
import Event from "./Event";
import CommonModal from "../components/Modal";

const events = [
  {
    _id: "6596c256516520d29890e3a2",
    name: "Son Tung MTP Music fes",
    description: "Amazinggg",
    images: [
      {
        fileName: "uploads/music_fes1704378965806-162712409.avif",
        _id: "6596c256516520d29890e3a3",
      },
    ],
    attraction: {
      _id: "65830298849e76141c2459be",
      name: "Lake of the Restored Sword (Hoan Kiem Lake)",
    },
    poster: "658a92dd54e3190cf5cbd449",
    date: "2024-02-21T10:00:51.339Z",
    status: "APPROVE",
    createdAt: "2024-01-04T14:36:06.690Z",
    updatedAt: "2024-01-04T14:36:06.690Z",
    __v: 0,
  },
];

const eventStates = [
  {
    name: "Pending",
    color: "bg-gray-500",
  },
  {
    name: "Approved",
    color: "bg-lime-500",
  },
  {
    name: "Rejected",
    color: "bg-red-500",
  },
];

const AdminEventList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [eventState, setEventState] = useState("Pending");
  const [isSelectingEventState, setIsSelectingEventState] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const navigate = useNavigate();

  const getEventList = async () => {
    // TODO: Get Event List API
  };

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate(appRoutes.ADMIN);
  };

  const handleChooseEvent = (id) => {
    setSelectedEventId(id);
    setOpenModal(true);
  };

  const handleToggleSelectEventState = () => {
    setIsSelectingEventState(!isSelectingEventState);
  };

  const handleSelectEventState = (state) => {
    setEventState(state);
    setIsSelectingEventState(false);
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <main className="h-screen overflow-hidden grid grid-cols-4">
      <aside className="px-5 border-r border-gray-100">
        <h1 className="w-full py-4 px-2 font-bold text-2xl font-['Lemon']">
          <span className="text-blue-800">Travel</span>
          <span className="text-blue-500">Vibes</span>
          <span className="text-xs">admin</span>
        </h1>
        <nav>
          <ul className="flex flex-col space-y-2">
            <li className="font-bold hover:bg-gray-200 rounded-md py-1 px-2 hover:cursor-pointer">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-calendar-days"
                  className="text-xl w-5"
                />
                <span className="text-lg">Events</span>
              </div>
            </li>
            <li className="hover:bg-gray-200 rounded-md py-1 px-2 hover:cursor-pointer">
              <button onClick={handleLogOut} className="rounded-full">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    icon="fa-solid fa-right-from-bracket"
                    className="text-xl w-5"
                  />
                  <span className="text-lg">Log out</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="col-span-3 flex flex-col">
        <CommonModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          className="p-5 h-[90%] w-[90%] overflow-auto z-50"
        >
          <Event id={selectedEventId} onClose={() => setOpenModal(false)} />
        </CommonModal>
        {events.map((event) => (
          <div
            key={event.id}
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
                    eventStates.filter((state) => state.name === eventState)[0]
                      .color
                  }`}
                >
                  <span>{eventState}</span>
                </button>
                {isSelectingEventState && (
                  <ul className="absolute w-full bg-white border border-gray-100 rounded-md mt-1">
                    {eventStates.map((state, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectEventState(state.name)}
                        className="hover:cursor-pointer py-1 px-2 hover:bg-gray-100 border-b border-gray-100"
                      >
                        <span>{state.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AdminEventList;
