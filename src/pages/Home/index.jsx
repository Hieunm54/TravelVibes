import { Link, Outlet, useLocation } from "react-router-dom";
import AttractionsContext from "../../hooks/attraction";
import { useState } from "react";
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

const Home = () => {
  const [attractions, setAttractions] = useState([]);
  const location = useLocation();

  return (
    <AttractionsContext.Provider value={[attractions, setAttractions]}>
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
                {attractions.map((attraction) => (
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
                        <button>
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <button>
                          <FontAwesomeIcon icon={faTrashCan} />
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
        <section className="col-span-7"></section>
      </main>
    </AttractionsContext.Provider>
  );
};

export default Home;
