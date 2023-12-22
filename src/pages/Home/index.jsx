import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker, Source, Layer, NavigationControl } from "react-map-gl";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleUser,
  faComments,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDown,
  faArrowUp,
  faCircleDot,
  faLocationArrow,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import AttractionsContext from "../../hooks/attraction";

const mapboxToken =
  "pk.eyJ1IjoiaGFycnluMTIzIiwiYSI6ImNscWIwdGE5MjFzbXYya2t6ZTZrcnFpcW4ifQ.aP1eiMiQHgIi6RsGFa0djA";

function getBounds(waypoints, directionCoordinates) {
  const lngs = waypoints.map((waypoint) => waypoint[0]);
  const lats = waypoints.map((waypoint) => waypoint[1]);
  if (directionCoordinates) {
    lngs.push(...directionCoordinates.map((coordinate) => coordinate[0]));
    lats.push(...directionCoordinates.map((coordinate) => coordinate[1]));
  }

  return {
    southWest: [Math.min(...lngs), Math.min(...lats)],
    northEast: [Math.max(...lngs), Math.max(...lats)],
  };
}

const Home = () => {
  const [attractions, setAttractions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
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

  const changeBounds = async () => {
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
  };

  useEffect(() => {
    if (attractions.length > 0 && attractions.length <= 1) {
      mapRef.current.flyTo({
        center: [
          attractions[0].location.longitude,
          attractions[0].location.latitude,
        ],
        zoom: 17,
      });
      setCoordinates(null);
      return;
    } else if (attractions.length > 1) {
      changeBounds();
    }
  }, [attractions]);

  return (
    <AttractionsContext.Provider value={[attractions, setAttractions]}>
      <ToastContainer />
      <main className="grid grid-cols-12 h-screen">
        <aside className="px-5 pt-10">
          <nav>
            <ul className="flex flex-col justify-center items-center space-y-3">
              <li className="text-5xl">
                <Link to={"/"}>
                  <FontAwesomeIcon icon={faLocationArrow} />
                </Link>
              </li>
              <li className="text-5xl">
                <Link to={"/chat"}>
                  <FontAwesomeIcon icon={faComments} />
                </Link>
              </li>
              <li className="text-5xl">
                <Link to={"/notification"}>
                  <FontAwesomeIcon icon={faBell} />
                </Link>
              </li>
              <li className="text-5xl">
                <Link to={"/profile"}>
                  <FontAwesomeIcon icon={faCircleUser} />
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="col-span-4 px-5 pt-10 border-x border-gray-700">
          {location.pathname === "/" ? (
            <>
              <h2 className="font-bold text-5xl">Create your trip</h2>
              <div className="mt-10">
                {attractions.map((attraction, index) => (
                  <div
                    className="flex space-x-3 px-1 py-2 first:mt-0 mt-2"
                    key={attraction.id}
                  >
                    <div className="pt-1">
                      <FontAwesomeIcon icon={faCircleDot} />
                      <div className="text-center h-full">
                        <div className="inline-block h-full w-0.5 self-stretch bg-black"></div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-5">
                      <div>
                        <h3 className="font-bold text-2xl">
                          {attraction.name}
                        </h3>
                        <address className="mt-1">{attraction.address}</address>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          disabled={index === 0}
                          className={index === 0 ? "text-gray-300" : ""}
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
                              : ""
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
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <button>
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
                className="block mt-5 border-b border-gray-600 px-1 py-2 hover:bg-black hover:text-white"
              >
                <FontAwesomeIcon icon={faPlus} /> Add your visiting stop
              </Link>
            </>
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
          >
            <NavigationControl
              className="navigation-control"
              showCompass={true}
            />
            {attractions.map((attraction) => (
              <Marker
                key={attraction.id}
                latitude={attraction.location.latitude}
                longitude={attraction.location.longitude}
              >
                <svg
                  width="32px"
                  height="32px"
                  viewBox="-3 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>pin_fill_sharp_circle [#634]</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
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
                    "line-color": "rgb(3, 170, 238)",
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
