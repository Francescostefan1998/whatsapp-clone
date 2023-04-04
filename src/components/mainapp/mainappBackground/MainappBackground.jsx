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
  const [beginANewChat, setBeginANewChat] = useState(false);
  const [userToStartChat, setUserToStartChat] = useState(null);
  const [nextChatSelected, setNexChatSelected] = useState(null);
  console.log(nextChatSelected);
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
  const postANewChat = async (data) => {
    const res = await fetch(`http://localhost:3001/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [],
        users: [localStorage.getItem("userId"), data._id],
      }),
    });
    const chatData = await res.json();
    console.log(chatData);
    console.log(selectedChat);
    setNexChatSelected(chatData);
  };
  const fetchUserToStartChat = async (param) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${param}`);
      const data = await res.json();
      setUserToStartChat(data);
      postANewChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTheBeginningOfNewChat = (param) => {
    console.log(param);
    setBeginANewChat(param);
    fetchUserToStartChat(param);
  };
  useEffect(() => {}, [nextChatSelected]);

  useEffect(() => {}, [userToStartChat]);
  useEffect(() => {}, [beginANewChat]);

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
          handleTheBeginningOfNewChat={handleTheBeginningOfNewChat}
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
