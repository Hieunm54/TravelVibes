const IMAGE_URL = import.meta.env.VITE_S3_IMAGE_URL;
const API_URL = import.meta.env.VITE_API_URL;

export const CONST = {
  API_URL,
  IMAGE_URL,
  DEFAULT_AVATAR: "uploads/default-avatar.webp",
  DEFAULT_EVENT_COVER: "uploads/default_event.jpeg",

  TIME_FORMAT: "YYYY-MM-DDTHH:mm",
  READABLE_TIME: "MMMM Do YYYY, h:mm a",

  // Optimistic chat ID
  OPTIMISTIC_CHAT_ID: "NEW_CHAT_ID",
  FORM_DATA_LENGTH: 5,
};

export const eventStates = [
  {
    name: "PENDING",
    color: "bg-gray-500",
  },
  {
    name: "APPROVED",
    color: "bg-lime-500",
  },
  {
    name: "REJECTED",
    color: "bg-red-500",
  },
];
