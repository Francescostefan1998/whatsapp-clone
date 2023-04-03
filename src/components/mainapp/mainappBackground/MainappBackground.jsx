import "./mainappBackground.css";
import { useState, useRef } from "react";
import MainappChatList from "../mainappMainComponent/mainappChat/mainappChatList/MainappChatList";
import MainappEmptySpace from "../mainappMainComponent/mainappEmptySpace/MainappEmptySpace";
import MainappDisplayConversation from "../mainappMainComponent/mainappDisplayConversation/MainappDisplayConversation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const MainappBackground = () => {
  const [selectedChat, setChat] = useState(null);
  const [listOfUsers, grabListOfUsers] = useState([]);
  const [myUserIsTyping, setMyUserIsTyping] = useState("");

  const mainappChatListRef = useRef();
  const handleMyUserIsTyping = (typingBody) => {
    setMyUserIsTyping(typingBody);
  };
  const callHandleInputFocus = () => {
    mainappChatListRef.current.handleInputFocus();
  };

  const callHandleInputBlur = () => {
    mainappChatListRef.current.handleInputBlur();
  };
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

  useEffect(() => {}, [listOfUsers]);

  useEffect(() => {}, [selectedChat]);

  useEffect(() => {}, [myUserIsTyping]);

  return (
    <div className="mainappBackground">
      <div className="mainappBackground-top"></div>
      <div className="mainappBackground-middle">
        <MainappChatList
          fetchChatSelected={fetchChatSelected}
          grabListOfUsers={grabListOfUsers}
          ref={mainappChatListRef}
          handleMyUserIsTyping={handleMyUserIsTyping}
        />
        {selectedChat === null ? (
          <MainappEmptySpace />
        ) : (
          <MainappDisplayConversation
            chat={selectedChat}
            listOfUsers={listOfUsers}
            callHandleInputFocus={callHandleInputFocus}
            callHandleInputBlur={callHandleInputBlur}
            myUserIsTyping={myUserIsTyping}
          />
        )}
      </div>
      <div className="mainappBackground-bottom"></div>
    </div>
  );
};

export default MainappBackground;
