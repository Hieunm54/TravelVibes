import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

import Layout from "../components/Layout";
import CardAuthorAva from "../components/CardAuthorAva";
import UserPosts from "../components/UserPosts";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <Layout>
      <div className="overflow-hidden h-screen py-10">
        <div className="overflow-y-scroll h-screen flex flex-col space-y-5 items-center">
          <div className="mb-7">
            <CardAuthorAva size={24} />
            <h2 className="font-bold text-3xl mt-5">Huy Vu</h2>
          </div>
          <ul className="flex justify-center space-x-5 border-t border-b border-gray-200 w-full p-2 text-lg">
            <li
              className={
                location.pathname === "/profile" ? "text-blue-500" : ""
              }
            >
              <Link to="/profile">Posts</Link>
            </li>
            <li
              className={
                location.pathname === "/profile/reviews" ? "text-blue-500" : ""
              }
            >
              <Link to="/profile/reviews">Reviews</Link>
            </li>
            <li
              className={
                location.pathname === "/profile/events" ? "text-blue-500" : ""
              }
            >
              <Link to="/profile/events">Events</Link>
            </li>
          </ul>
          {location.pathname === "/profile" ? <UserPosts /> : <Outlet />}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
