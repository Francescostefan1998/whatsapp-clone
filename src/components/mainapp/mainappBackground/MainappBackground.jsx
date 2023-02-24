import "./mainappBackground.css";
import { useState } from "react";
import MainappChatList from "../mainappMainComponent/mainappChat/mainappChatList/MainappChatList";
import MainappEmptySpace from "../mainappMainComponent/mainappEmptySpace/MainappEmptySpace";
import MainappDisplayConversation from "../mainappMainComponent/mainappDisplayConversation/MainappDisplayConversation";
const MainappBackground = () => {
  const [selectedChat, setChat] = useState("d");
  return (
    <div className="mainappBackground">
      <div className="mainappBackground-top"></div>
      <div className="mainappBackground-middle">
        <MainappChatList />
        {selectedChat === null ? (
          <MainappEmptySpace />
        ) : (
          <MainappDisplayConversation />
        )}
      </div>
      <div className="mainappBackground-bottom"></div>
    </div>
  );
};

export default MainappBackground;
