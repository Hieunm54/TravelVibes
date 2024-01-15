import { io } from "socket.io-client";
import { CONST } from "../../constaints";
import NotificationItem from "../NotificationItem";
import NotificationSkeleton from "../Skeleton/NotificationSkeleton";
import { useEffect } from "react";

const socket = io(CONST.API_URL);
// const socket = io("https://travel-vibes.onrender.com:3000");

const NotificationModal = () => {
  const handleChooseNotification = (objectID) => {
    // Emit a notification event
    socket.emit("notification", { message: "New notification!", objectID });
  };

  useEffect(() => {
    // Listen for new notifications
    socket.on("newNotification", (data) => {
      // Handle the notification on the client side (e.g., display a pop-up, update UI, etc.)
    });
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-center font-bold text-lg mb-3">
        Notifications
      </div>

      <div className="flex-grow flex flex-col items-center justify-start w-full overflow-y-auto">
        {MockNotifications.length === 0 ? (
          <NotificationSkeleton />
        ) : (
          MockNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onChooseNotification={handleChooseNotification}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;

const MockNotifications = [
  {
    _id: 1,
    actor: {
      firstName: "AAAA",
      lastName: "AAAA",
      avatar: CONST.DEFAULT_AVATAR,
    },
    createdAt: Date.now(),
    unRead: true,
    objectType: {
      _id: 122333,
      type: "Post", // Post, Event
      name: "post number 1 post number 1 post number 1 post number 1",
    },
    action: "upvote", // Post - Upvote, Comment|| Event Approved, Rejected
  },
  {
    _id: 2,
    actor: {
      firstName: "BBBB",
      lastName: "BBBB",
      avatar: CONST.DEFAULT_AVATAR,
    },
    createdAt: "2023-12-31T08:55:03.571+00:00",
    unRead: false,
    objectType: {
      _id: 128783,
      type: "Event", // Post, Event
      name: "post number 1",
    },
    action: "approved", // Post - Upvote, Comment|| Event Approved, Rejected
  },
  {
    _id: 3,
    actor: {
      firstName: "CCCC",
      lastName: "CCCC",
      avatar: CONST.DEFAULT_AVATAR,
    },
    createdAt: "2023-12-31T08:55:03.571+00:00",
    unRead: false,
    objectType: {
      _id: 12093,
      type: "Event", // Post, Event
      name: "post number 1",
    },
    action: "rejected", // Post - Upvote, Comment|| Event Approved, Rejected
  },
  {
    _id: 4,
    actor: {
      firstName: "AAAA",
      lastName: "AAAA",
      avatar: CONST.DEFAULT_AVATAR,
    },
    createdAt: "2023-12-31T08:55:03.571+00:00",
    unRead: true,
    objectType: {
      _id: 443,
      type: "Post", // Post, Event
      name: "post number 1",
    },
    action: "comment", // Post - Upvote, Comment|| Event Approved, Rejected
  },
  {
    _id: 5,
    actor: {
      firstName: "rooni",
      lastName: "kevin",
      avatar: CONST.DEFAULT_AVATAR,
    },
    createdAt: "2023-12-31T08:55:03.571+00:00",
    unRead: true,
    objectType: {
      _id: 84923,
      type: "Post", // Post, Event
      name: "post number 1",
    },
    action: "comment", // Post - Upvote, Comment|| Event Approved, Rejected
  },
  {
    _id: 6,
    actor: {
      firstName: "neymar",
      lastName: "jr",
      avatar: CONST.DEFAULT_AVATAR,
    },
    createdAt: "2023-12-31T08:55:03.571+00:00",
    unRead: false,
    objectType: {
      _id: 12993489383,
      type: "Post", // Post, Event
      name: "post number 1",
    },
    action: "comment", // Post - Upvote, Comment|| Event Approved, Rejected
  },
];
