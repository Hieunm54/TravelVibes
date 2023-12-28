import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appRoutes } from "../enum/routes";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {!auth.token ? (
        <Navigate to="/sign-in" />
      ) : (
        <main className="grid grid-cols-6 h-screen">
          <aside className="px-5 pt-10 border-r border-gray-200">
            <nav>
              <ul className="flex flex-col space-y-4">
                <li
                  className={`hover:text-blue-500 ${
                    location.pathname === appRoutes.HOME ? "text-blue-500" : ""
                  }`}
                >
                  <Link to={appRoutes.HOME}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-house"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Home</span>
                    </div>
                  </Link>
                </li>
                <li
                  className={`hover:text-blue-500 ${
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
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  <Link to={appRoutes.NEW_POST}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-location-arrow"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Share your trip</span>
                    </div>
                  </Link>
                </li>
                <li
                  className={`hover:text-blue-500 ${
                    location.pathname === appRoutes.NOTIFICATION
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  <Link to={appRoutes.NOTIFICATION}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-bell"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Notification</span>
                    </div>
                  </Link>
                </li>
                <li
                  className={`text-4xl hover:text-blue-500 ${
                    location.pathname === appRoutes.PROFILE ||
                    location.pathname === appRoutes.USER_REVIEWS ||
                    location.pathname === appRoutes.USER_EVENTS
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  <Link to={appRoutes.PROFILE}>
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-circle-user"
                        className="text-xl w-5"
                      />
                      <span className="text-lg">Profile</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="col-span-5">{children}</div>
        </main>
      )}
    </>
  );
};

export default Layout;
