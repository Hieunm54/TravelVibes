import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Attractions = () => {
  const [attrractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);

  const getAttractionSuggestions = async (text) => {
    try {
      const response = await axios.get(`${API_URL}/api/attractions`, {
        params: {
          q: attrractionInput,
        },
      });

      setAttractionSuggestions(response.data);
    } catch (e) {
      setAttractionSuggestions([]);
    }
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="px-5 pt-10 flex justify-between items-center">
        <Link to={"/"} className="hover:text-blue-500">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
      </div>
      <div className="px-5">
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
          className="block w-full mt-3 outline-none border-b border-gray-300 focus:border-black"
        />
        <div>
          {attractionSuggestions.length > 0 &&
            attractionSuggestions.map((suggestion) => (
              <Link
                to={`/attractions/${suggestion._id}`}
                className="block hover:cursor-pointer hover:bg-gray-200 p-2 border-x border-b border-gray-300"
                key={suggestion._id}
              >
                <h3 className="font-bold">{suggestion.name}</h3>
                <address>{suggestion.address}</address>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Attractions;
