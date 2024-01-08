import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sGetMyEventList } from "../store/selectors";
import { useEffect } from "react";
import { getAllMyEventsAsync } from "../store/actions/events";
import EventItem from "../components/Events/EventItem";

const UserEvents = () => {
  const myEventList = useSelector(sGetMyEventList);
  const dispatch = useDispatch();
  console.log("hieu event list ", myEventList);

  useEffect(() => {
    dispatch(getAllMyEventsAsync());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 gap-5 px-56 py-5">
      {myEventList.length === 0
        ? "No events here"
        : myEventList.map((event) => (
            <EventItem key={event._id} event={event} />
          ))}
    </div>
  );
};

export default UserEvents;

{
  /* <Link to="/events/1" className="block relative">
        <div className="absolute top-2 left-3">
          <FontAwesomeIcon icon="fa-solid fa-bookmark" className="text-white" />
        </div>
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
        </div>
      </Link>
      <Link to="/events/1" className="block">
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
        </div>
      </Link>
      <Link to="/events/1" className="block">
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
        </div>
      </Link>
      <Link to="/events/1" className="block">
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
        </div>
      </Link> */
}
