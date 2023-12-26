import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { appRoutes } from "../enum/routes";
import { useSelector } from "react-redux";
import { authorizationHeader } from "../services/jwt";

const API_URL = import.meta.env.VITE_API_URL;

const Attractions = () => {
  const [attrractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getAttractionSuggestions = async (text) => {
    try {
      const response = await axios.get(`${API_URL}/api/attractions`, {
        params: {
          q: attrractionInput,
        },
        headers: {
          Authorization: authorizationHeader(auth.token),
        },
      });

      setAttractionSuggestions(response.data);
    } catch (e) {
      setAttractionSuggestions([]);
    }
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="px-5 pt-10 pb-2 flex items-center space-x-6 border-b border-gray-300">
        <Link to={appRoutes.NEW_POST} className="hover:text-blue-500">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
        <input
          value={attrractionInput}
          onFocus={() => {
            getAttractionSuggestions();
          }}
          onChange={(evt) => {
            setAttractionInput(evt.target.value);
            getAttractionSuggestions();
          }}
          placeholder="Where do you want to visit?"
          className="block w-full outline-none border-b border-gray-300 focus:border-black"
        />
      </div>
      <div>
        {attractionSuggestions.length > 0 &&
          attractionSuggestions.map((suggestion) => (
            <Link
              to={appRoutes.NEW_POST_VIEW_ATTRACTION.replace(
                ":id",
                suggestion._id
              )}
              className="block px-5 py-2 hover:cursor-pointer hover:bg-gray-200"
              key={suggestion._id}
            >
              <h3 className="font-bold">{suggestion.name}</h3>
              <address>{suggestion.address}</address>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Attractions;
