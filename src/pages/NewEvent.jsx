import moment from "moment";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import PostMap from "../components/PostMap";
import FormInput from "../components/FormInput";
import AttractionSuggestion from "../components/AttractionSuggestion";
import Button from "../components/Button";
import { getAttractions } from "../services/attractions";
import { CONST } from "../constaints";
import { createNewEventAsync } from "../store/actions/events";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../enum/routes";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeCoverPhoto = () => {
    coverPhotoRef.current.click();
  };

  const handlePhotoSelected = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoverPhoto(event.target.files[0]);
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

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    // Check datetime
    if (moment(datetimeInput) < Date.now()) {
      toast.error("Date and time of the event must be in the future");
      return;
    }
    const formData = new FormData();
    formData.append("name", titleInput);
    formData.append("description", descriptionInput);
    formData.append("images", coverPhoto);
    formData.append("attractionId", location[0]._id);
    formData.append("date", datetimeInput);

    // Using this check temporally
    if (Array.from(formData.keys()).length !== CONST.FORM_DATA_LENGTH) {
      toast.error("Some fields are missing to create a new event");
      return;
    }
    dispatch(createNewEventAsync(formData));
    navigate(appRoutes.USER_EVENTS);
  };

  const handleTitleInputChange = (event) => setTitleInput(event.target.value);

  const handleDatetimeInput = (event) => setDatetimeInput(event.target.value);

  const handleDescriptionChange = (event) =>
    setDescriptionInput(event.target.value);

  const handleLocationInputChange = (event) => {
    setLocation([]);
    setLocationInput(event.target.value);
    setIsSearchingLocation(true);
    getLocationSuggestions();
  };

  return (
    <Layout>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        <section className="col-span-6 border-r-2 border-gray-300 px-5 h-screen overflow-y-scroll">
          <form
            className="flex flex-col space-y-5"
            onSubmit={handleCreateEvent}
          >
            <h2 className="font-bold text-3xl pt-3">Create an event</h2>
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
                type="button"
              >
                {coverPhoto ? (
                  <img
                    src={URL.createObjectURL(coverPhoto)}
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
              min={new Date().toISOString().slice(0, 16)}
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
              <Button
                disabled={
                  !coverPhoto ||
                  titleInput === "" ||
                  datetimeInput === "" ||
                  location.length === 0
                }
                type="submit"
              >
                Save
              </Button>
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
