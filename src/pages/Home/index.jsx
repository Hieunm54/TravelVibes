import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  Popup,
} from "react-map-gl";
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
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import AttractionsContext from "../../hooks/attraction";
import { getBounds } from "../../components/Map/utils";

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
  const [attractions, setAttractions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const mapRef = useRef(null);
  const location = useLocation();

  const getDirectionCoordinates = async () => {
    const coordinates = attractions.map((attraction) => [
      attraction.location.longitude,
      attraction.location.latitude,
    ]);

    if (coordinates === "") return;

    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates.join(
          ";"
        )}?geometries=geojson&access_token=${mapboxToken}`,
        { method: "GET" }
      );
      const response = await query.json();

      return response.routes[0].geometry.coordinates;
    } catch (e) {
      toast.error("Can't get the direction!");
    }
  };

  const updateBounds = async () => {
    if (attractions.length > 0 && attractions.length <= 1) {
      setCoordinates(null);

      mapRef.current.flyTo({
        center: [
          attractions[0].location.longitude,
          attractions[0].location.latitude,
        ],
        zoom: 17,
      });
    } else if (attractions.length > 1) {
      const directionCoordinates = await getDirectionCoordinates();

      const { northEast, southWest } = getBounds(
        attractions.map((attraction) => [
          attraction.location.longitude,
          attraction.location.latitude,
        ]),
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
              <h2
                className={`font-bold text-5xl px-5 pt-10 ${
                  attractions.length > 0 ? "border-b-2 border-gray-300" : ""
                } pb-5`}
              >
                Your trip
              </h2>
              <div className="px-5 pt-4 overflow-y-scroll">
                {attractions.map((attraction, index) => (
                  <div
                    className={`flex space-x-3 px-1 py-1 ${
                      attraction.shownOnMap ? "bg-gray-200" : ""
                    }`}
                    key={attraction.id}
                  >
                    <div className="pt-1 flex flex-col items-center space-y-2">
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
                            // TODO: Call API
                            attractions.splice(index, 1);
                            attractions.splice(index - 1, 0, attraction);
                            setAttractions([...attractions]);
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          disabled={index === attractions.length - 1}
                          className={
                            index === attractions.length - 1
                              ? "text-gray-300"
                              : "hover:text-blue-500"
                          }
                          onClick={() => {
                            // TODO: Call API
                            attractions.splice(index, 1);
                            attractions.splice(index + 1, 0, attraction);
                            setAttractions([...attractions]);
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                        <Link className="hover:text-blue-500">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button className="hover:text-blue-500">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => {
                              // TODO: Call API
                              attractions.splice(index, 1);
                              setAttractions([...attractions]);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to={`/visiting-stop`}
                className="block border-t-2 border-gray-300 text-gray-300 px-6 py-2 hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faPlus} /> Add an attraction to your trip
              </Link>
            </div>
          ) : (
            <Outlet />
          )}
        </section>
        <section className="col-span-7">
          <Map
            ref={mapRef}
            mapLib={mapboxgl}
            mapboxAccessToken="pk.eyJ1IjoiaGFycnluMTIzIiwiYSI6ImNscWIwdGE5MjFzbXYya2t6ZTZrcnFpcW4ifQ.aP1eiMiQHgIi6RsGFa0djA"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            maxZoom={16}
            initialViewState={{
              latitude: 21.0286669,
              longitude: 105.8521484,
              zoom: 17,
            }}
            onMouseEnter={(e) => console.log(e)}
          >
            <NavigationControl
              className="navigation-control"
              showCompass={true}
            />
            {hoveredMarker && (
              <Popup
                longitude={hoveredMarker.location.longitude}
                latitude={hoveredMarker.location.latitude}
                anchor="right"
                offset={10}
                closeOnClick={false}
                onClose={(e) => setHoveredMarker(null)}
              >
                <h4 className="font-bold text-lg">{hoveredMarker.name}</h4>
                <address>{hoveredMarker.address}</address>
                <div className="flex items-center space-x-2 mt-2">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <button>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => {
                        // TODO: Call API
                        attractions.splice(hoveredMarker.id, 1);
                        setAttractions([...attractions]);
                      }}
                    />
                  </button>
                </div>
              </Popup>
            )}
            {attractions.map((attraction, index) => (
              <div key={attraction.id}>
                <Marker
                  latitude={attraction.location.latitude}
                  longitude={attraction.location.longitude}
                  onClick={(e) => setHoveredMarker(attraction)}
                >
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="-3 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-223.000000, -5399.000000)"
                        fill="#FF0000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M174,5248.219 C172.895,5248.219 172,5247.324 172,5246.219 C172,5245.114 172.895,5244.219 174,5244.219 C175.105,5244.219 176,5245.114 176,5246.219 C176,5247.324 175.105,5248.219 174,5248.219 M174,5239 C170.134,5239 167,5242.134 167,5246 C167,5249.866 174,5259 174,5259 C174,5259 181,5249.866 181,5246 C181,5242.134 177.866,5239 174,5239"
                            id="pin_fill_sharp_circle-[#634]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </Marker>
              </div>
            ))}
            {coordinates && (
              <Source
                id="route"
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates,
                  },
                }}
              >
                <Layer
                  id="route"
                  type="line"
                  source="route"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": "#3b82f6",
                    "line-width": 5,
                  }}
                />
              </Source>
            )}
          </Map>
        </section>
      </main>
    </AttractionsContext.Provider>
  );
};

export default Home;
