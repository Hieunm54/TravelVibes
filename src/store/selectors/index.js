// Auth
export const sGetUserInfo = (state) => state.auth.user;

// Messages
export const sGetAllChats = (store) => store.messages.chatList;
export const sGetMessages = (store) => store.messages.currentMessages;
export const sGetChatDetail = (store) => store.messages.currentChat;
export const sCachedMessage = (store) => store.messages.cachedMessage;

// Users
export const sGetUsersToChat = (store) => store.users.usersToChat;
