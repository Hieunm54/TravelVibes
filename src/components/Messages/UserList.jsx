import { useEffect, useState } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, getChatListAsync } from "../../store/actions/messages.js";
import { sGetAllChats, sTaskStatus } from "../../store/selectors";
import UserChatSkeleton from "../../components/Skeleton/UserChatSkeleton";

// UserList component
const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const allChats = useSelector(sGetAllChats);
  const status = useSelector(sTaskStatus(actionTypes.GET_CHAT_LIST));

  // Add your logic to fetch or display a list of users
  useEffect(() => {
    setIsLoading(true);
    dispatch(getChatListAsync())
      .then(setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        throw new Error("Cannot fetch data");
      });
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <UserChatSkeleton />
      ) : (
        <div className="overflow-y-scroll overflow-hidden max-w-full">
          {allChats.map((chat) => (
            <User
              key={chat._id}
              chatId={chat._id}
              user={chat.receiverUser}
              lastMessage={chat.lastMessage}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
