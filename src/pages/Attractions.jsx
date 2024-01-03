import React, { useState } from "react";
import { appRoutes } from "../enum/routes";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import AttractionSuggestion from "../components/AttractionSuggestion";
import { getAttractions } from "../services/attractions";
import { Link } from "react-router-dom";

const Attractions = () => {
  const [attractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getAttractionSuggestions = async () => {
    try {
      const response = await getAttractions(auth.token, {
        q: attractionInput,
      });
      setAttractionSuggestions(response.data);
    } catch (e) {
      setAttractionSuggestions([]);
    }
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="px-5 pt-10 pb-2 flex items-center space-x-6 border-b border-gray-300">
        <BackButton to={appRoutes.NEW_POST} />
        <input
          value={attractionInput}
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
              key={suggestion._id}
              to={appRoutes.NEW_POST_VIEW_ATTRACTION.replace(
                ":id",
                suggestion._id
              )}
              className="block"
            >
              <AttractionSuggestion
                name={suggestion.name}
                address={suggestion.address}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Attractions;
