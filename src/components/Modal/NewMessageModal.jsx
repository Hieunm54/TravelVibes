import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUpUsersToChat,
  searchUsersAsync,
} from "../../store/actions/users";
import {
  sGetAllChats,
  sGetUserInfo,
  sGetUsersToChat,
} from "../../store/selectors";
import UserSearchItem from "../UserSearchItem";
import {
  getAllMessagesForChat,
  getChatDetail,
} from "../../store/actions/messages";
import { checkIfChattedUser } from "../../utils/checkIfChattedUser";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { CONST } from "../../constaints";

// eslint-disable-next-line react/prop-types
const NewMessageModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersToChat = useSelector(sGetUsersToChat);
  const chatList = useSelector(sGetAllChats);
  const currentUser = useSelector(sGetUserInfo);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchTerm) {
        return;
      }

      dispatch(searchUsersAsync({ q: searchTerm }));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  useEffect(() => {
    inputRef.current.focus();
    return () => {
      dispatch(cleanUpUsersToChat());
    };
  }, [dispatch]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const searchValue = event.target.value.trim();

    setSearchTerm(searchValue);
  };

  const handleChooseUser = (user) => {
    onClose();

    const chatExists = checkIfChattedUser(user._id, chatList);
    // Navigate to existed chat
    if (!_.isEmpty(chatExists)) {
      navigate(`/messages/${chatExists._id}`);
      return;
    }

    console.log("hieu 2 ");
    // dispatch(createChatOptimistic({ receiver: user, sender: currentUser }));
    const optimisticChat = {
      _id: CONST.OPTIMISTIC_CHAT_ID,
      member: [currentUser._id, user._id],
      createdAt: Date.now().toString(),
      updatedFAt: Date.now().toString(),
    };
    dispatch(getChatDetail({ chat: optimisticChat, receiverUser: user }));
    dispatch(getAllMessagesForChat([]));

    // Navigate to new chat
    navigate(`/messages/${CONST.OPTIMISTIC_CHAT_ID}`);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-center font-bold text-lg">New message</div>
      <div className="flex my-3 p-2 border">
        <div>To:</div>
        <input
          className="ml-4 w-full outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </div>
      <div className="flex-grow flex flex-col items-center justify-start w-full overflow-y-auto">
        {usersToChat.length === 0
          ? "No accounts found"
          : usersToChat.map((user) => (
              <UserSearchItem
                key={user._id}
                user={user}
                chooseUser={handleChooseUser}
              />
            ))}
      </div>

      {/* <div className="flex flex-col justify-end h-10 rounded-md px-5">
        <button
          disabled={usersToChat.length === 0}
          className={`flex justify-center text-rgb-white align-center cursor-pointer leading-10 w-full  rounded-md ${
            usersToChat.length === 0
              ? "bg-blue-300 focus:outline-none"
              : "hover:bg-sky-500 bg-sky-400"
          } `}
        >
          Chat
        </button>
      </div> */}
    </div>
  );
};

export default NewMessageModal;
