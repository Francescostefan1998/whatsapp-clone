import "./mainappBackground.css";
import { useState } from "react";
import MainappChatList from "../mainappMainComponent/mainappChat/mainappChatList/MainappChatList";
import MainappEmptySpace from "../mainappMainComponent/mainappEmptySpace/MainappEmptySpace";
import MainappDisplayConversation from "../mainappMainComponent/mainappDisplayConversation/MainappDisplayConversation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const MainappBackground = () => {
  const [selectedChat, setChat] = useState(null);
  const { chat } = useSelector((state) => state.chat);
  useEffect(() => {
    if (chat) {
      setChat(chat);
    } else {
      return;
    }
  }, [chat]);

  return (
    <div className="mainappBackground">
      <div className="mainappBackground-top"></div>
      <div className="mainappBackground-middle">
        <MainappChatList />
        {selectedChat === null ? (
          <MainappEmptySpace />
        ) : (
          <MainappDisplayConversation chat={chat} />
        )}
      </div>
      <div className="mainappBackground-bottom"></div>
    </div>
  );
};

export default MainappBackground;
