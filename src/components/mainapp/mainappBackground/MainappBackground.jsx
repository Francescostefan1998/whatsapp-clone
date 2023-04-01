import "./mainappBackground.css";
import { useState } from "react";
import MainappChatList from "../mainappMainComponent/mainappChat/mainappChatList/MainappChatList";
import MainappEmptySpace from "../mainappMainComponent/mainappEmptySpace/MainappEmptySpace";
import MainappDisplayConversation from "../mainappMainComponent/mainappDisplayConversation/MainappDisplayConversation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const MainappBackground = () => {
  const [selectedChat, setChat] = useState(null);

  const fetchChatSelected = async (chatId) => {
    try {
      console.log(chatId);
      const res = await fetch(`http://localhost:3001/chats/${chatId}`);
      const data = await res.json();
      setChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {}, [selectedChat]);

  return (
    <div className="mainappBackground">
      <div className="mainappBackground-top"></div>
      <div className="mainappBackground-middle">
        <MainappChatList fetchChatSelected={fetchChatSelected} />
        {selectedChat === null ? (
          <MainappEmptySpace />
        ) : (
          <MainappDisplayConversation chat={selectedChat} />
        )}
      </div>
      <div className="mainappBackground-bottom"></div>
    </div>
  );
};

export default MainappBackground;
