import { useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appRoutes, authRoutes } from "../enum/routes";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  const handleLogOut = () => {
    localStorage.clear();
    window.location = authRoutes.SIGN_IN;
  };

  return (
    <>
      {!auth.token ? (
        <Navigate to="/sign-in" />
      ) : (
        <main className="grid grid-cols-5 h-screen">
          <aside className="border-r border-gray-100 px-5">
            <h1 className="w-full py-4 px-4 font-bold text-2xl">TravelVibes</h1>
            <nav className="mt-3">
              <ul className="flex flex-col space-y-2">
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.HOME ? "font-bold" : ""
                  }`}
                >
                  <NavLink to={appRoutes.HOME}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-house"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Home</span>
                    </div>
                  </NavLink>
                </li>
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.NEW_POST ||
                    location.pathname === appRoutes.NEW_POST_FIND_ATTRACTIONS ||
                    location.pathname.match(
                      new RegExp(
                        appRoutes.NEW_POST_VIEW_ATTRACTION.replace(
                          ":id",
                          "[a-zA-Z0-9]*$"
                        )
                      )
                    )
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <NavLink to={appRoutes.NEW_POST}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-location-arrow"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Share your trip</span>
                    </div>
                  </NavLink>
                </li>
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.MESSAGES ? "font-bold" : ""
                  }`}
                >
                  <NavLink to={appRoutes.MESSAGES}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-brands fa-facebook-messenger"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Messages</span>
                    </div>
                  </NavLink>
                </li>
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.NEW_EVENT ? "font-bold" : ""
                  }`}
                >
                  <NavLink to={appRoutes.NEW_EVENT}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-calendar-plus"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Create an event</span>
                    </div>
                  </NavLink>
                </li>
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.NOTIFICATION
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <NavLink to={appRoutes.NOTIFICATION}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-bell"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Notification</span>
                    </div>
                  </NavLink>
                </li>
                <li
                  className={`text-4xl hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.PROFILE ||
                    location.pathname === appRoutes.USER_REVIEWS ||
                    location.pathname === appRoutes.USER_EVENTS
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <NavLink to={appRoutes.PROFILE}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-user"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Profile</span>
                    </div>
                  </NavLink>
                </li>
                <li className="hover:bg-gray-200 px-3 py-1 rounded-full cursor-pointer">
                  <button
                    onClick={handleLogOut}
                    className="hover:bg-gray-200 rounded-full"
                  >
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
          <div className="col-span-4">{children}</div>
        </main>
      )}
    </>
  );
};

export default Layout;
