import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import CardAuthorAva from "../components/CardAuthorAva";
import UserPosts from "../components/UserPosts";
import SecondaryButtonGroup from "../components/SecondaryButtonGroup";
import SecondaryButton from "../components/SecondaryButton";
import FormInput from "../components/FormInput";
import { CONST } from "../constaints";
import { appRoutes } from "../enum/routes";
import {
  getUserProfileAsync,
  updateUserProfileAsync,
} from "../store/actions/users";
import { sGetUserInfo } from "../store/selectors";
import { getUserPostListAsync } from "../store/actions/posts";
import { getUserReviewListAsync } from "../store/actions/reviews";

const Profile = () => {
  const user = useSelector(sGetUserInfo);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const avatarSelectRef = useRef();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChangeAvatar = () => {
    avatarSelectRef.current.click();
  };

  const handlePhotoSelected = async (event) => {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);
    try {
      dispatch(updateUserProfileAsync(formData));
      toast.success("Update profile image success");
    } catch (e) {
      toast.error("Unable to update user's avatar.");
    }
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
    setBioInput(user.description ? user.description : "");
  };

  const handleUpdateBio = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", bioInput);
    try {
      dispatch(updateUserProfileAsync(formData));
      setIsEditingBio(false);
      setBioInput("");
      dispatch(getUserPostListAsync());
      dispatch(getUserReviewListAsync());
      toast.success("Update bio success");
    } catch (e) {
      toast.error("Unable to update user's avatar.");
    }
  };

  const handleBioInput = (event) => setBioInput(event.target.value);
  const handleCancelEditingBio = () => setIsEditingBio(false);

  useEffect(() => {
    const decoded = jwtDecode(auth.token);
    dispatch(getUserProfileAsync(decoded.id));
  }, [auth.token, dispatch]);

  return (
    <Layout>
      <div className="overflow-hidden h-screen">
        <div className="overflow-y-scroll h-screen flex flex-col items-center relative">
          {user && (
            <div className="grid grid-cols-3 gap-14 px-52 py-10">
              <div>
                <input
                  ref={avatarSelectRef}
                  type="file"
                  name="Photos"
                  multiple
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handlePhotoSelected}
                />
                <button onClick={handleChangeAvatar}>
                  <CardAuthorAva
                    src={`${CONST.IMAGE_URL}/${
                      user.avatar ?? CONST.DEFAULT_AVATAR
                    }`}
                    size={32}
                  />
                </button>
              </div>
              <div className="col-span-2">
                <h2 className="font-bold text-3xl mt-5">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="mt-5">
                  {!user.description && !isEditingBio ? (
                    <SecondaryButtonGroup>
                      <SecondaryButton onClick={handleEditBio}>
                        Let others know a bit about you
                      </SecondaryButton>
                    </SecondaryButtonGroup>
                  ) : !isEditingBio ? (
                    <button
                      className="mt-3 cursor-text text-left"
                      onClick={handleEditBio}
                    >
                      {user.description}
                    </button>
                  ) : (
                    <form onSubmit={handleUpdateBio}>
                      <FormInput
                        label={false}
                        multiline={true}
                        value={bioInput}
                        onChange={handleBioInput}
                        placeholder="Let others know a bit about you"
                        className="grow"
                      />
                      <SecondaryButtonGroup className="justify-center mt-1">
                        <SecondaryButton>Save</SecondaryButton>
                        <SecondaryButton onClick={handleCancelEditingBio}>
                          Cancel
                        </SecondaryButton>
                      </SecondaryButtonGroup>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
          <ul className="sticky top-0 left-0 z-10 bg-white flex justify-center items-center space-x-5 border-t border-b border-gray-200 w-full p-2 text-lg">
            <li
              className={
                location.pathname === "/profile"
                  ? "font-bold border-t-4 border-black"
                  : ""
              }
            >
              <Link to="/profile">Posts</Link>
            </li>
            <li
              className={
                location.pathname === "/profile/reviews"
                  ? "font-bold border-t-4 border-black"
                  : ""
              }
            >
              <Link to="/profile/reviews">Reviews</Link>
            </li>
            <li
              className={
                location.pathname === "/profile/events"
                  ? "font-bold border-t-4 border-black"
                  : ""
              }
            >
              <Link to={appRoutes.USER_EVENTS}>Events</Link>
            </li>
          </ul>
          {location.pathname === "/profile" ? <UserPosts /> : <Outlet />}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
