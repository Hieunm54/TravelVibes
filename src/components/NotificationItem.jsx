/* eslint-disable react/prop-types */
import moment from "moment";
import { CONST } from "../constaints";
import { formatDisplayName } from "../utils/formatDisplayName";
import CardAuthor from "./CardAuthor";
import CardAuthorAva from "./CardAuthorAva";
import NotificationBadge from "./NotificationBadge";

const NotificationItem = ({ notification, onChooseNotification }) => {
  return (
    <div
      className="flex w-full cursor-pointer hover:bg-rgb-cover-gray justify-between"
      onClick={() => onChooseNotification(notification.objectType._id)}
    >
      <div className="flex mb-2 p-4 ">
        <div className=" mr-4">
          <CardAuthor>
            <CardAuthorAva
              size={14}
              src={`${CONST.IMAGE_URL}/${notification.actor.avatar}`}
            />
          </CardAuthor>
        </div>
        <div className="flex flex-col justify-between pt-2 px-3">
          <div className="">
            <span className="font-medium">
              {`${formatDisplayName(notification.actor)}`}
            </span>
            <span>
              {` ${notification.action} your ${notification.objectType.type}: `}
            </span>
          </div>
          <span className="font-semibold italic text-wrap">{`${notification.objectType.name}`}</span>

          <div className="text-sm text-rgb-blue">
            {moment(notification.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {notification.unRead && <NotificationBadge />}
    </div>
  );
};

export default NotificationItem;
