import { combineReducers, createStore } from "redux";
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
} from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import attractions from "./store/attractions";
import auth from "./store/auth";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";

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
  faX
);

const reducers = combineReducers({ attractions, auth });

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={createStore(reducers)}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
