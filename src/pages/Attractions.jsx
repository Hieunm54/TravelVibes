import { useState } from "react";
import { appRoutes } from "../enum/routes";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import AttractionSuggestion from "../components/AttractionSuggestion";
import { getAttractions } from "../services/attractions";
import { Link, useNavigate } from "react-router-dom";
import { addAttraction } from "../store/attractions";

const Attractions = () => {
  const dispatch = useDispatch();
  const [attractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  const handleSelectAttraction = (suggestion) => {
    dispatch(addAttraction(suggestion));
    navigate(appRoutes.NEW_POST_VIEW_ATTRACTION.replace(":id", suggestion._id));
  };

  return (
    <div className="h-screen overflow-y-hidden bg-white pt-1 border-l border-gray-100">
      <div className="p-4 flex items-center space-x-6">
        <BackButton to={appRoutes.NEW_POST} />
        <input
          value={attractionInput}
          onFocus={() => {
            getAttractionSuggestions();
          }}
          onChange={(event) => {
            setAttractionInput(event.target.value);
            getAttractionSuggestions();
          }}
          placeholder="Where do you want to visit?"
          className="block w-full outline-none border-b border-gray-300 focus:border-black"
        />
      </div>
      <div>
        {attractionSuggestions.length > 0 &&
          attractionSuggestions.map((suggestion) => (
            <button
              key={suggestion._id}
              onClick={() => handleSelectAttraction(suggestion)}
              className="block w-full text-left"
            >
              <AttractionSuggestion
                name={suggestion.name}
                address={suggestion.address}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default Attractions;
