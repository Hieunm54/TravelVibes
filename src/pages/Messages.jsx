import Layout from "../components/Layout";
import UserList from "../components/Messages/UserList";
import Chat from "../components/Messages/Chat";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../store/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommonModal from "../components/Modal";
import { useState } from "react";
import NewMessageModal from "../components/Modal/NewMessageModal";

const Messages = () => {
  const [isOpenNewChatPopUp, setIsOpenNewChatPopUp] = useState(false);
  const currentUser = useSelector(sGetUserInfo);
  const displayName = `${currentUser.firstName} ${currentUser.lastName}`;

  return (
    <Layout>
      <div className="flex">
        <div className="w-3/10 h-screen flex flex-col border-2">
          <div className="border-b mt-3">
            <div className="flex justify-between items-baseline px-4">
              <h2 className="text-lg font-bold mb-4 pt-3">{displayName}</h2>
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square"
                className="cursor-pointer"
                onClick={() => setIsOpenNewChatPopUp(true)}
              />
            </div>
            <h4 className="text-base font-bold mb-4 px-4">Messages</h4>
          </div>
          <div className="flex-1 overflow-y-auto max-w-full">
            <UserList />
          </div>
        </div>
        <Chat openNewChatModal={() => setIsOpenNewChatPopUp(true)} />
        <CommonModal
          isOpen={isOpenNewChatPopUp}
          onClose={() => setIsOpenNewChatPopUp(false)}
          className="py-5 h-2/3 w-1/3 z-50"
        >
          <NewMessageModal onClose={() => setIsOpenNewChatPopUp(false)} />
        </CommonModal>
      </div>
    </Layout>
  );
};

export default Messages;
