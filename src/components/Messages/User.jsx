/* eslint-disable react/prop-types */
import moment from "moment";
import { CONST } from "../../constaints";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink, useLocation } from "react-router-dom";
import { formatDisplayName } from "../../utils/formatDisplayName";

const User = ({ user, chatId, lastMessage }) => {
  const { pathname } = useLocation();
  const match = `/messages/${chatId}` === pathname;
  const displayName = formatDisplayName(user);
  const messageDisplay = lastMessage.content
    ? lastMessage.content
    : `Chat with ${displayName}`;
  const displayDate = lastMessage.createdAt
    ? moment(lastMessage.createdAt).fromNow()
    : " ";

  return (
    <NavLink
      to={chatId}
      className={({ isActive, isPending }) => {
        return isPending ? "pending" : isActive ? "bg-gray-400" : "";
      }}
    >
      <div
        className={`flex px-4 py-3 ${
          match ? "bg-gray-200" : ""
        } hover:bg-slate-200 cursor-pointer max-w-full`}
      >
        <img
          src={`${CONST.IMAGE_URL}/${user.avatar}`}
          alt="User avatar"
          className="rounded-full w-14 h-14"
        />
        <div className="ml-2 w-full">
          <h3 className="font-bold">{displayName}</h3>
          <div className="flex justify-between items-baseline">
            <div className="truncate text-sm">
              {messageDisplay.length > 15
                ? messageDisplay.substring(0, 15) + "..."
                : messageDisplay}
            </div>
            <h6 className="text-sm-white text-xs">{displayDate}</h6>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default User;
