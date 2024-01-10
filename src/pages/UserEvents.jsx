import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sGetMyEventList } from "../store/selectors";
import { getAllMyEventsAsync } from "../store/actions/events";
import EventItem from "../components/Events/EventItem";

const UserEvents = () => {
  const myEventList = useSelector(sGetMyEventList);
  const dispatch = useDispatch();

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
