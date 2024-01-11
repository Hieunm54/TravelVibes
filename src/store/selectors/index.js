// Auth
export const sGetUserInfo = (state) => state.auth.user;

// Async task
export const sTaskStatus = (key) => (store) =>
  store.asyncTaskReducer.status[key];

// Messages
export const sGetAllChats = (store) => store.messages.chatList;
export const sGetMessages = (store) => store.messages.currentMessages;
export const sGetChatDetail = (store) => store.messages.currentChat;
export const sCachedMessage = (store) => store.messages.cachedMessage;

// Users
export const sGetUsersToChat = (store) => store.users.usersToChat;

// Events
export const sGetApprovedEvents = (store) => store.events.approvedEvents;
export const sGetMyEventList = (store) => store.events.myEventList;
export const sGetUserEventList = (store) => store.events.userEventList;
export const sGetEventDetails = (store) => store.events.eventDetails;
