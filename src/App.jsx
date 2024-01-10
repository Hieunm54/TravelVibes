import { Provider } from "react-redux";
import {
  faArrowDown,
  faArrowUp,
  faCircleDot,
  faCircleUser,
  faCommentDots,
  faLocationArrow,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faHouse,
  faStar,
  fas,
  faUpLong,
  faComment,
  faPaperPlane,
  faCheck,
  faX,
  faCirclePlus,
  faCalendarPlus,
  faSquarePlus,
  faRightFromBracket,
  faLocationDot,
  faBookmark,
  faCalendarDays,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import configStore from "./store";

library.add(
  fas,
  far,
  faCircleUser,
  faCommentDots,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faCircleDot,
  faArrowDown,
  faArrowUp,
  faLocationArrow,
  faHouse,
  faStar,
  faUpLong,
  faComment,
  faPaperPlane,
  faCheck,
  faX,
  faCirclePlus,
  fab,
  faCalendarPlus,
  faSquarePlus,
  faRightFromBracket,
  faLocationDot,
  faBookmark,
  faCalendarDays,
  faCircleXmark
);

const store = configStore();

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
