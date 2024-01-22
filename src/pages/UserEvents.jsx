import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sGetMyEventList } from "../store/selectors";
import { getAllMyEventsAsync } from "../store/actions/events";
import EventItem from "../components/Events/EventItem";
import { getAttraction } from "../services/attractions";
import { addAttraction } from "../store/attractions";
import { appRoutes } from "../enum/routes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserEvents = () => {
  const myEventList = useSelector(sGetMyEventList);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMyEventsAsync());
  }, [dispatch]);

  const addToJourney = async (event) => {
    try {
      const response = await getAttraction(auth.token, event.attraction._id);
      dispatch(addAttraction(response.data));
      navigate(appRoutes.NEW_POST);
    } catch (e) {
      toast.error("Unable to retrieve attraction details.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5 px-56 py-5">
      {myEventList.length === 0
        ? "No events here"
        : myEventList.map((event) => (
            <EventItem
              key={event._id}
              event={event}
              onAddToJourney={() => addToJourney(event)}
            />
          ))}
    </div>
  );
};

export default UserEvents;
