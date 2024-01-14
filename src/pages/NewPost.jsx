import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appRoutes } from "../enum/routes";
import Layout from "../components/Layout";
import VisitingLocationMarker from "../components/VisitingLocationMarker";
import VisitingLocationInfo from "../components/VisitingLocationInfo";
import VisitingLocationCTA from "../components/VisitingLocationCTA";
import VisitingLocationActionBtn from "../components/VisitingLocationActionBtn";
import VisitingLocationContainer from "../components/VisitingLocationContainer";
import VisitingLocationInfoContainer from "../components/VisitingLocationInfoContainer";
import AddVisitingLocationBtn from "../components/AddVisitingLocationBtn";
import Button from "../components/Button";
import NewPostPageLayout from "../components/NewPostPageLayout";
import { buttonStyle } from "../styles/button";
import ButtonGroup from "../components/ButtonGroup";
import RouteContainer from "../components/RouteContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUpAttractions,
  moveDownAttraction,
  moveUpAttraction,
  removeAttraction,
} from "../store/attractions";
import FormInput from "../components/FormInput";
import { createPost } from "../services/posts";

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

  const handleCaptionInputChange = (event) => {
    setCaptionInput(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      await createPost(auth.token, {
        caption: captionInput,
        attractions: attractions.map((attraction) => attraction._id),
      });
      dispatch(cleanUpAttractions());

      window.location = appRoutes.HOME;
    } catch (e) {
      toast.error("Unable to share your journey!");
    }
  };

  const handleAddNewLocation = () => {
    navigate(appRoutes.NEW_POST_FIND_ATTRACTIONS);
  };

  return (
    <Layout>
      <NewPostPageLayout>
        {location.pathname === appRoutes.NEW_POST ? (
          <div className="h-screen flex flex-col">
            <div className="px-5 pt-3 mb-2">
              <h2 className="font-bold text-3xl">Share your trip</h2>
              <div className="mt-7">
                <FormInput
                  label={false}
                  multiline={true}
                  value={captionInput}
                  onChange={handleCaptionInputChange}
                  placeholder="What are your experience?"
                />
              </div>
            </div>
            <RouteContainer className="overflow-y-scroll px-5">
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
              <AddVisitingLocationBtn onClick={handleAddNewLocation} />
            </RouteContainer>
            <ButtonGroup>
              <Button
                disabled={captionInput === "" && attractions.length === 0}
                onClick={handleCreatePost}
              >
                Share
              </Button>
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
