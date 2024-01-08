export const checkIfChattedUser = (receiverId, chatList) => {
  if (!chatList || chatList.length < 0) {
    return {};
  }

  const chatIndex = chatList.findIndex(
    (chat) => chat.receiverUser._id === receiverId
  );

  if (chatIndex === -1) {
    return {};
  }

  return chatList[chatIndex];
};
