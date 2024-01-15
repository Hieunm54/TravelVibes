/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appRoutes, authRoutes } from "../enum/routes";
import CommonModal from "./Modal";
import { useState } from "react";
import NotificationModal from "./Modal/NotificationModal";
import { CONST } from "../constaints";
import CardAuthorAva from "./CardAuthorAva";

const Layout = ({ children }) => {
  const [isOpenNewChatPopUp, setIsOpenNewChatPopUp] = useState(false);

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
        <main className="grid grid-cols-5 h-screen bg-gray-100">
          <aside className="">
            <h1
              className={`${
                location.pathname === appRoutes.HOME
                  ? "bg-white border-b border-gray-200"
                  : ""
              } w-full px-8 py-4 font-bold text-xl font-['Lemon']`}
            >
              <span className="text-blue-800">Travel</span>
              <span className="text-blue-500">Vibes</span>
            </h1>
            <nav className="px-5 mt-3">
              <ul className="flex flex-col space-y-2">
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.HOME ? "font-bold" : ""
                  }`}
                >
                  <NavLink to={appRoutes.HOME}>
                    <div className="flex items-center space-x-3">
                      <span className="w-6 flex justify-center">
                        <FontAwesomeIcon
                          icon="fa-solid fa-house"
                          className="text-xl"
                        />
                      </span>
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
                      <span className="w-6 flex justify-center">
                        <FontAwesomeIcon
                          icon="fa-solid fa-location-arrow"
                          className="text-xl"
                        />
                      </span>
                      <span className="text-lg">Share your trip</span>
                    </div>
                  </NavLink>
                </li>
                <li
                  className={`hover:bg-gray-200 px-3 py-1 rounded-full ${
                    location.pathname === appRoutes.MESSAGES ||
                    location.pathname.match(
                      new RegExp(
                        appRoutes.MESSAGES.replace(":id", "[a-zA-Z0-9]*$")
                      )
                    )
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <NavLink to={appRoutes.MESSAGES}>
                    <div className="flex items-center space-x-3">
                      <span className="w-6 flex justify-center">
                        <FontAwesomeIcon
                          icon="fa-brands fa-facebook-messenger"
                          className="text-xl"
                        />
                      </span>
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
                      <span className="w-6 flex justify-center">
                        <FontAwesomeIcon
                          icon="fa-solid fa-calendar-plus"
                          className="text-xl"
                        />
                      </span>
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
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setIsOpenNewChatPopUp((prev) => !prev)}
                  >
                    <span className="w-6 flex justify-center">
                      <FontAwesomeIcon
                        icon="fa-solid fa-bell"
                        className="text-xl"
                      />
                    </span>
                    <span className="text-lg">Notification</span>
                  </div>
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
                      <CardAuthorAva
                        src={`${CONST.IMAGE_URL}/${
                          auth.user.avatar ?? CONST.DEFAULT_AVATAR
                        }`}
                        size={6}
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
                      <span className="w-6 flex justify-center">
                        <FontAwesomeIcon
                          icon="fa-solid fa-right-from-bracket"
                          className="text-xl"
                        />
                      </span>
                      <span className="text-lg">Log out</span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="col-span-4">{children}</div>
          <CommonModal
            isOpen={isOpenNewChatPopUp}
            onClose={() => setIsOpenNewChatPopUp(false)}
            className="py-5 h-2/3 w-1/3 z-50"
          >
            <NotificationModal />
          </CommonModal>
        </main>
      )}
    </>
  );
};

export default Layout;
