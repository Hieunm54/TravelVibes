import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { appRoutes } from "../enum/routes";
import Layout from "../components/Layout";
import VisitingLocationMarker from "../components/VisitingLocationMarker";
import VisitingLocationInfo from "../components/VisitingLocationInfo";
import VisitingLocationCTA from "../components/VisitingLocationCTA";
import VisitingLocationActionBtn from "../components/VisitingLocationActionBtn";
import VisitingLocationContainer from "../components/VisitingLocationContainer";
import VisitingLocationInfoContainer from "../components/VisitingLocationInfoContainer";
import TripCaptionInput from "../components/TripCaptionInput";
import AddVisitingLocation from "../components/AddVisitingLocation";
import Button from "../components/Button";
import NewPostPageLayout from "../components/NewPostPageLayout";
import { buttonStyle } from "../styles/button";
import ButtonGroup from "../components/ButtonGroup";
import RouteContainer from "../components/RouteContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  moveDownAttraction,
  moveUpAttraction,
  removeAttraction,
} from "../store/attractions";
import { authorizationHeader } from "../services/jwt";

const API_URL = import.meta.env.VITE_API_URL;

const NewPost = () => {
  const [captionInput, setCaptionInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const attractions = useSelector((state) => state.attractions);
  const auth = useSelector((state) => state.auth);

  const activeRearrangeBtnClassName = (callback) =>
    callback() ? buttonStyle.disabled : buttonStyle.hover;

  const isMovingDownBtnDisabled = (index) => index === attractions.length - 1;
  const handleMoveDown = (index) => {
    dispatch(moveDownAttraction(index));
  };

  const isMovingUpBtnDisabled = (index) => index == 0;
  const handleMoveUp = (index) => {
    dispatch(moveUpAttraction(index));
  };

  const handleDelete = (index) => {
    dispatch(removeAttraction(index));
  };

  const handleCaptionInputChange = (evt) => {
    setCaptionInput(evt.target.value);
  };

  const handleCreatePost = async () => {
    try {
      await axios.post(
        `${API_URL}/api/journeys`,
        {
          title: captionInput,
          attractions: attractions.map((attraction) => attraction._id),
        },
        {
          headers: {
            Authorization: authorizationHeader(auth.token),
          },
        }
      );

      navigate(appRoutes.HOME);
    } catch (e) {
      toast.error("Unable to share your journey!");
    }
  };

  return (
    <Layout>
      <NewPostPageLayout>
        {location.pathname === appRoutes.NEW_POST ? (
          <div className="h-screen flex flex-col">
            <div className="px-5 pt-10 mb-2">
              <h2 className="font-bold text-5xl">Share your trip</h2>
              <TripCaptionInput
                textInput={captionInput}
                onChange={handleCaptionInputChange}
              />
            </div>
            <RouteContainer>
              {attractions.map((attraction, index) => (
                <VisitingLocationContainer key={attraction._id}>
                  <VisitingLocationMarker />
                  <VisitingLocationInfoContainer>
                    <VisitingLocationInfo
                      name={attraction.name}
                      address={attraction.address}
                    />
                    <VisitingLocationCTA>
                      <VisitingLocationActionBtn
                        disabled={isMovingUpBtnDisabled(index)}
                        className={activeRearrangeBtnClassName(() =>
                          isMovingUpBtnDisabled(index)
                        )}
                        onClick={() => handleMoveUp(index)}
                        icon="fa-solid fa-arrow-up"
                      />
                      <VisitingLocationActionBtn
                        disabled={isMovingDownBtnDisabled(index)}
                        className={activeRearrangeBtnClassName(() =>
                          isMovingDownBtnDisabled(index)
                        )}
                        onClick={() => handleMoveDown(index)}
                        icon="fa-solid fa-arrow-down"
                      />
                      <VisitingLocationActionBtn
                        className={buttonStyle.hover}
                        onClick={() => handleDelete(index)}
                        icon="fa-solid fa-trash-can"
                      />
                    </VisitingLocationCTA>
                  </VisitingLocationInfoContainer>
                </VisitingLocationContainer>
              ))}
              <AddVisitingLocation />
            </RouteContainer>
            <ButtonGroup>
              <Button onClick={handleCreatePost}>Share</Button>
            </ButtonGroup>
          </div>
        ) : (
          <Outlet />
        )}
      </NewPostPageLayout>
    </Layout>
  );
};

export default NewPost;
