/* eslint-disable react/prop-types */
import { CONST } from "../constaints";
import { formatDisplayName } from "../utils/formatDisplayName";

const UserSearchItem = ({ user, chooseUser }) => {
  return (
    <div
      className="flex items-center p-3 hover:bg-gray-200 cursor-pointer rounded-lg w-full"
      onClick={() => chooseUser(user)}
    >
      <img
        src={`${CONST.IMAGE_URL}/${user.avatar}`}
        alt="User avatar"
        className="rounded-full w-14 h-14"
      />
      <div className="ml-2 w-full">
        <h3 className="font-bold">{formatDisplayName(user)}</h3>
        <div className="flex justify-between items-baseline text-sm">
          <div className="truncate w-3/5 flex-grow ">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchItem;
