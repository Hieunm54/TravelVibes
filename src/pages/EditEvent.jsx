import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import PostMap from "../components/PostMap";
import FormInput from "../components/FormInput";
import AttractionSuggestion from "../components/AttractionSuggestion";
import Button from "../components/Button";
import { getAttractions } from "../services/attractions";
import { useParams } from "react-router-dom";

const eventDetails = {
  id: 1,
  cover: "https://picsum.photos/300/200",
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

const NewEvent = () => {
  const auth = useSelector((state) => state.auth);
  const coverPhotoRef = useRef();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [datetimeInput, setDatetimeInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [location, setLocation] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSearchLocation, setIsSearchingLocation] = useState(false);
  const { id } = useParams();

  const getEventDetails = async () => {
    // TODO: Call Event Detail API
    // const response = await getEvent(auth.token, id);
    setCoverPhoto(eventDetails.cover);
    setTitleInput(eventDetails.title);
    setDescriptionInput(eventDetails.description);
    setDatetimeInput(eventDetails.datetime);
    setLocationInput(eventDetails.location);
  };

  const handleChangeCoverPhoto = () => {
    coverPhotoRef.current.click();
  };

  const handlePhotoSelected = async (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      setCoverPhoto(evt.target.files[0]);
    }
  };

  const getLocationSuggestions = async () => {
    try {
      const response = await getAttractions(auth.token, {
        q: locationInput,
      });
      setLocationSuggestions(response.data);
    } catch (e) {
      setLocationSuggestions([]);
    }
  };

  const handleChangeLocation = (location) => {
    setIsSearchingLocation(false);
    setLocation([location]);
    setLocationInput(location.name);
  };

  const handleUpdateEvent = (evt) => {
    // TODO: Call Edit Event API
    evt.preventDefault();
  };

  const handleTitleInputChange = (evt) => setTitleInput(evt.target.value);
  const handleDatetimeInput = (evt) => setDatetimeInput(evt.target.value);
  const handleDescriptionChange = (evt) =>
    setDescriptionInput(evt.target.value);
  const handleLocationInputChange = (evt) => {
    setLocationInput(evt.target.value);
    setIsSearchingLocation(true);
    getLocationSuggestions();
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <section className="col-span-6 border-r-2 border-gray-300 px-5 py-10 h-screen overflow-y-scroll">
          <form
            className="flex flex-col space-y-5"
            onSubmit={handleUpdateEvent}
          >
            <div>
              <label>Cover</label>
              <input
                ref={coverPhotoRef}
                type="file"
                name="Photos"
                multiple
                accept=".png, .jpg, .jpeg"
                className="hidden"
                onChange={handlePhotoSelected}
              />
              <button
                onClick={handleChangeCoverPhoto}
                className="block hover:text-blue-500"
              >
                {coverPhoto ? (
                  <img
                    src={
                      typeof coverPhoto === "string"
                        ? coverPhoto
                        : URL.createObjectURL(coverPhoto)
                    }
                    className="w-full"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="fa-solid fa-square-plus"
                    className="w-14 h-14"
                  />
                )}
              </button>
            </div>
            <FormInput
              name="Title"
              placeholder="What's your event's title?"
              value={titleInput}
              onChange={handleTitleInputChange}
            />
            <FormInput
              type="datetime-local"
              name="Date and Time"
              placeholder="When is your event?"
              value={datetimeInput}
              onChange={handleDatetimeInput}
            />
            <FormInput
              name="Description"
              multiline
              placeholder="What will you bring to the audience?"
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />
            <div>
              <FormInput
                name="Location"
                placeholder="Where do you want to organize your event?"
                value={locationInput}
                onChange={handleLocationInputChange}
              />
              <div
                className={
                  locationSuggestions.length > 0
                    ? `border-l border-r border-b border-gray-200`
                    : ""
                }
              >
                {isSearchLocation &&
                  locationSuggestions.length > 0 &&
                  locationSuggestions.map((suggestion) => (
                    <button
                      className="block text-left"
                      onClick={() => handleChangeLocation(suggestion)}
                      key={suggestion._id}
                    >
                      <AttractionSuggestion
                        name={suggestion.name}
                        address={suggestion.address}
                      />
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <Button>Save</Button>
            </div>
          </form>
        </section>
        <section className="col-span-6">
          <PostMap attractions={location} />
        </section>
      </div>
    </Layout>
  );
};

export default NewEvent;