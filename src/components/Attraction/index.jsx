import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AttractionsContext from "../../hooks/attraction";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Attraction = () => {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [attractions, setAttractions] = useContext(AttractionsContext);

  const getAttraction = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/attractions/${id}`);
      setDetails(response.data);
    } catch (e) {
      toast.error("Unable to retrieve attraction!");
    }
  };

  useEffect(() => {
    getAttraction();
  }, []);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="px-5 pt-10 flex justify-between items-center">
        <Link to={"/attractions"} className="hover:text-blue-500">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
        {details && (
          <button
            onClick={() => {
              if (
                attractions.findIndex(
                  (attraction) => attraction._id === details._id
                ) === -1
              ) {
                setAttractions([
                  ...attractions.filter((value) => value._id !== details._id),
                  details,
                ]);
              }
              navigate("/");
            }}
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-2 py-1"
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Add
          </button>
        )}
      </div>
      {details && (
        <div className="h-full mt-5 px-5 overflow-y-scroll">
          <h3 className="font-bold text-4xl">{details.name}</h3>
          <p className="mt-1">{details.description}</p>
          <address className="mt-2">
            <span className="font-bold">Address:</span> {details.address}
          </address>
        </div>
      )}
    </div>
  );
};

export default Attraction;
