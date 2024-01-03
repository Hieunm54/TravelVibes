import React, { useEffect } from "react";
import Layout from "../components/Layout";
import SecondaryButtonGroup from "../components/SecondaryButtonGroup";
import SecondaryButton from "../components/SecondaryButton";
import PostMap from "../components/PostMap";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../services/events";
import { useSelector } from "react-redux";
import { appRoutes } from "../enum/routes";

const eventDetails = {
  id: 1,
  cover: "https://picsum.photos/300/100",
  datetime: "FRIDAY, 12 JANUARY 2024 AT 17:00",
  title: "Exhibition Name",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.`,
  location: null,
};

const Event = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  const getEventDetails = async () => {
    // TODO: Call Event Detail API
    // const response = await getEvent(auth.token, id);
  };

  const handleDeleteEvent = async () => {
    // TODO: Call Delete Event API
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <Layout>
      <div className="h-screen overflow-hidden">
        <div className="h-screen overflow-y-scroll py-10 px-5">
          <img src={eventDetails.cover} className="block w-full rounded-md" />
          <div className="mt-3">
            <div className="flex flex-col space-y-1 mt-3 col-span-2">
              <time className="font-bold text-xl text-red-500">
                {eventDetails.datetime}
              </time>
              <h3 className="font-bold text-4xl pb-2">{eventDetails.title}</h3>
              <div className="border-t border-gray-200 grid grid-cols-3 gap-10 pt-5">
                <p className="col-span-2 border-r border-gray-200 pr-10">
                  {eventDetails.description}
                </p>
                <div className="relative">
                  <div className="sticky top-0 left-0 w-full flex flex-col space-y-3">
                    <address className="block w-full h-72">
                      <PostMap
                        style={{ borderRadius: "6px" }}
                        attractions={[]}
                      />
                    </address>
                    <div>
                      Hosted by <span className="font-bold">Huy Vu</span>
                    </div>
                    <div className="mt-2 border-t border-gray-200">
                      <SecondaryButtonGroup>
                        <SecondaryButton>
                          <Link
                            to={appRoutes.EDIT_EVENT.replace(
                              ":id",
                              eventDetails.id
                            )}
                          >
                            Edit
                          </Link>
                        </SecondaryButton>
                        <SecondaryButton onClick={handleDeleteEvent}>
                          Delete
                        </SecondaryButton>
                      </SecondaryButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
