import { useSelector } from "react-redux";
import { CONST } from "../../constaints";

const Message = ({ user, content }) => {
  const currentUser = useSelector((state) => state.auth);
  const isMyMessage = user._id === currentUser.user._id;

  return (
    <div
      className={`flex m-1 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* avatar  */}
      {!isMyMessage && (
        <img
          src={`${CONST.IMAGE_URL}/${user.avatar}`}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <div
        className={`px-3 py-2 bg-gray-300 max-w-1/2 overflow-wrap-break-word rounded-t-xl ${
          isMyMessage
            ? "rounded-l-xl bg-rgb-blue text-rgb-white"
            : "rounded-r-xl"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
