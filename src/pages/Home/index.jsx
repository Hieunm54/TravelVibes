import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import AttractionsContext from "../../hooks/attraction";
import { getBounds, getDirectionCoordinates } from "../../components/Map/utils";
import Direction from "../../components/Map/Direction";
import LocationInfoPopUp from "../../components/Map/LocationInfoPopUp";
import LocationMarker from "../../components/Map/LocationMarker";

library.add(
  fas,
  faCircleUser,
  faCommentDots,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faCircleDot,
  faArrowDown,
  faArrowUp,
  faLocationArrow
);

const API_URL = import.meta.env.VITE_API_URL;

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const mainNavLinks = [
  {
    path: "/",
    icon: "fa-solid fa-location-arrow",
  },
  {
    path: "/chat",
    icon: "fa-solid fa-comment-dots",
  },
  {
    path: "/notification",
    icon: "fa-solid fa-bell",
  },
  {
    path: "/profile",
    icon: "fa-solid fa-circle-user",
  },
];

const Home = () => {
  const [captionInput, setCaptionInput] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const mapRef = useRef(null);
  const location = useLocation();

  const createPost = async () => {
    try {
      await axios.post(`${API_URL}/api/journeys`, {
        title: captionInput,
        attractions: attractions.map((attraction) => attraction._id),
      });

      // TODO: navigate to feeds
    } catch (e) {
      toast.error("Unable to share your journey!");
    }
  };

  const updateBounds = async () => {
    if (attractions.length > 0 && attractions.length <= 1) {
      setCoordinates(null);

      mapRef.current.flyTo({
        center: attractions[0].coordinates,
        zoom: 17,
      });
    } else if (attractions.length > 1) {
      if (coordinates === "") return;

      const directionCoordinates = await getDirectionCoordinates(
        attractions,
        (e) => toast.error("Can't get the direction!")
      );
      const { northEast, southWest } = getBounds(
        attractions.map((attraction) => attraction.coordinates),
        directionCoordinates
      );
      mapRef.current.fitBounds([northEast, southWest], { padding: 100 });

      setCoordinates(directionCoordinates);
    }
  };

  useEffect(() => {
    if (!mapRef) return;
    updateBounds();
  }, [attractions, mapRef]);

  return (
    <AttractionsContext.Provider value={[attractions, setAttractions]}>
      <ToastContainer />
      <main className="grid grid-cols-12 h-screen overflow-hidden">
        <aside className="px-5 pt-10 bg-gray-50">
          <nav>
            <ul className="flex flex-col justify-center items-center space-y-4">
              {mainNavLinks.map((link, index) => (
                <li
                  className={`text-4xl hover:text-blue-500 ${
                    location.pathname === link.path ? "text-blue-500" : ""
                  }`}
                  key={index}
                >
                  <Link to={link.path}>
                    <FontAwesomeIcon icon={link.icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <section className="col-span-4 border-r-2 border-gray-300">
          {location.pathname === "/" ? (
            <div className="h-screen flex flex-col">
              <div className="px-5 pt-10 mb-2">
                <h2 className="font-bold text-5xl">Share your trip</h2>
                <textarea
                  value={captionInput}
                  rows={3}
                  onChange={(evt) => {
                    setCaptionInput(evt.target.value);
                  }}
                  placeholder="What are your experience?"
                  className="block w-full mt-7 outline-none p-2 rounded-md border border-gray-300 focus:border-2 focus:border-blue-500 mb-2"
                />
              </div>
              <div className="px-5 overflow-y-scroll">
                {attractions.map((attraction, index) => (
                  <div
                    className="flex space-x-3 px-1 py-1"
                    key={attraction._id}
                  >
                    <div className="pt-1.5 flex flex-col items-center space-y-2">
                      <FontAwesomeIcon
                        icon={faCircleDot}
                        className="text-red-500"
                      />
                      <div className="h-full">
                        <div className="inline-block h-full w-0.5 bg-gray-300"></div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-5">
                      <div>
                        <h3 className="font-bold text-xl">{attraction.name}</h3>
                        <address className="mt-1">{attraction.address}</address>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          disabled={index === 0}
                          className={
                            index === 0
                              ? "text-gray-300"
                              : "hover:text-blue-500"
                          }
                          onClick={() => {
                            attractions.splice(index, 1);
                            attractions.splice(index - 1, 0, attraction);
                            setAttractions([...attractions]);
                          }}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                        </button>
                        <button
                          disabled={index === attractions.length - 1}
                          className={
                            index === attractions.length - 1
                              ? "text-gray-300"
                              : "hover:text-blue-500"
                          }
                          onClick={() => {
                            attractions.splice(index, 1);
                            attractions.splice(index + 1, 0, attraction);
                            setAttractions([...attractions]);
                          }}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                        </button>
                        <button className="hover:text-blue-500">
                          <FontAwesomeIcon
                            icon="fa-solid fa-trash-can"
                            onClick={() => {
                              attractions.splice(index, 1);
                              setAttractions([...attractions]);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  to={`/attractions`}
                  className="block text-gray-300 px-1 hover:text-blue-500"
                >
                  <FontAwesomeIcon icon="fa-solid fa-plus" /> Add an attraction
                  to visit
                </Link>
              </div>
              <div className="px-5 py-4">
                <button
                  className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-2 py-1"
                  onClick={createPost}
                >
                  Share
                </button>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </section>
        <section className="col-span-7">
          <Map
            ref={mapRef}
            mapLib={mapboxgl}
            mapboxAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            maxZoom={16}
            initialViewState={{
              latitude: 21.0286669,
              longitude: 105.8521484,
              zoom: 17,
            }}
          >
            <NavigationControl
              className="navigation-control"
              showCompass={true}
            />
            {hoveredMarker && (
              <LocationInfoPopUp
                longitude={hoveredMarker.coordinates[0]}
                latitude={hoveredMarker.coordinates[1]}
                onClose={(e) => setHoveredMarker(null)}
              >
                <h4 className="font-bold text-lg leading-tight">
                  {hoveredMarker.name}
                </h4>
                <address className="mt-1">{hoveredMarker.address}</address>
                <div className="flex items-center space-x-2 mt-2">
                  <button>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => {
                        attractions.splice(hoveredMarker._id, 1);
                        setAttractions([...attractions]);
                      }}
                    />
                  </button>
                </div>
              </LocationInfoPopUp>
            )}
            {attractions.map((attraction) => (
              <Marker
                longitude={attraction.coordinates[0]}
                latitude={attraction.coordinates[1]}
                onClick={() => setHoveredMarker(attraction)}
                key={attraction._id}
              >
                <LocationMarker />
              </Marker>
            ))}
            {coordinates && <Direction coordinates={coordinates} />}
          </Map>
        </section>
      </main>
    </AttractionsContext.Provider>
  );
};

export default Home;
