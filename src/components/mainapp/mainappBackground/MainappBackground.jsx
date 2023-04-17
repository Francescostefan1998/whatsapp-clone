import "./mainappBackground.css";
import { useState, useRef } from "react";
import MainappChatList from "../mainappMainComponent/mainappChat/mainappChatList/MainappChatList";
import MainappEmptySpace from "../mainappMainComponent/mainappEmptySpace/MainappEmptySpace";
import MainappDisplayConversation from "../mainappMainComponent/mainappDisplayConversation/MainappDisplayConversation";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect } from "react";
const MainappBackground = () => {
  const [selectedChat, setChat] = useState(null);
  const [listOfUsers, grabListOfUsers] = useState([]);
  const [myUserIsTyping, setMyUserIsTyping] = useState("");
  const [beginANewChat, setBeginANewChat] = useState(false);
  const [userToStartChat, setUserToStartChat] = useState(null);
  const [nextChatSelected, setNexChatSelected] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [
    refChatlistOnTheLeftSideNumberUnchecked,
    setrefChatlistOnTheLeftSideNumberUnchecked,
  ] = useState("");
  console.log(refChatlistOnTheLeftSideNumberUnchecked);
  const [bigList, setBigListMessages] = useState([]);
  const [classNameToAssignAtTheList, setClassNameToAssignAtTheList] = useState(
    "chatListInvisibleInBigScreen"
  );
  const [
    classNameToAssignAtConversation,
    setClassNameToAssignAtTheConversation,
  ] = useState("chatInvisibleInBigScreen");
  const [refChatlistOnTheLeftSide, refreshChatlistOnTheLeftSide] = useState("");
  const [socket, setSocket] = useState(null);

  const location = useLocation();
  useEffect(() => {}, [refChatlistOnTheLeftSideNumberUnchecked]);
  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const mainappChatListRef = useRef();
  const [refreshTheChatPage, setRefreshTheChatPage] = useState([]);
  useEffect(() => {}, [refreshTheChatPage]);
  const handleMyUserIsTyping = (typingBody) => {
    setMyUserIsTyping(typingBody);
  };
  const callHandleInputFocus = () => {
    mainappChatListRef.current.handleInputFocus();
  };
  const callHandleSetTheMessage = (e) => {
    mainappChatListRef.current.setTheMessage(e);
  };
  const concatenateTheMessage = (e) => {
    setBigListMessages(
      e.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse()
    );
  };
  const settingChatHistory = (chatLists) => {
    setChatHistory(chatLists);
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
    const getCahts = await fetch(`http://localhost:3001/chats`);
    const getChatsJson = await getCahts.json();
    console.log(getChatsJson);
    const findchat = await getChatsJson.find(
      (chat, i) =>
        (chat.users[0] === localStorage.getItem("userId") &&
          chat.users[1] === data._id) ||
        (chat.users[1] === localStorage.getItem("userId") &&
          chat.users[0] === data._id)
    );
    if (findchat) {
      return;
    } else {
      const res = await fetch(`http://localhost:3001/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [],
          users: [localStorage.getItem("userId"), data._id],
        }),
      });
      const chatData = await res.json();
      setNexChatSelected(chatData);
    }
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
  const changeTheClass = () => {};
  const handleTheBeginningOfNewChat = (param) => {
    setBeginANewChat(param);
    fetchUserToStartChat(param);
  };
  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);
  useEffect(() => {
    console.log(bigList);
  }, [bigList]);

  useEffect(() => {}, [refChatlistOnTheLeftSide]);

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
        {socket && (
          <MainappChatList
            personalizedClassName={`mainappChatList ${
              selectedChat && classNameToAssignAtTheList
            }`}
            changeTheClass={changeTheClass}
            fetchChatSelected={fetchChatSelected}
            grabListOfUsers={grabListOfUsers}
            ref={mainappChatListRef}
            handleMyUserIsTyping={handleMyUserIsTyping}
            handleTheBeginningOfNewChat={handleTheBeginningOfNewChat}
            settingChatHistory={settingChatHistory}
            refreshTheChatPage={setRefreshTheChatPage}
            concatenateTheMessage={concatenateTheMessage}
            socket={socket}
            bigList={bigList}
            refChatlistOnTheLeftSideNumberUnchecked={
              refChatlistOnTheLeftSideNumberUnchecked
            }
            refreshChatlistOnTheLeftSide={refreshChatlistOnTheLeftSide}
            refChatlistOnTheLeftSide={refChatlistOnTheLeftSide}
            setrefChatlistOnTheLeftSideNumberUnchecked={
              setrefChatlistOnTheLeftSideNumberUnchecked
            }
          />
        )}
        {selectedChat === null ? (
          <MainappEmptySpace />
        ) : (
          <MainappDisplayConversation
            setrefChatlistOnTheLeftSideNumberUnchecked={
              setrefChatlistOnTheLeftSideNumberUnchecked
            }
            setChat={setChat}
            personalizedClassName={`mainappDisplayConversation ${classNameToAssignAtConversation}`}
            chatHistory={chatHistory}
            chat={selectedChat}
            listOfUsers={listOfUsers}
            callHandleInputFocus={callHandleInputFocus}
            callHandleInputBlur={callHandleInputBlur}
            myUserIsTyping={myUserIsTyping}
            callHandleSetTheMessage={callHandleSetTheMessage}
            refreshTheChatPage={refreshTheChatPage}
            bigList={bigList}
            refChatlistOnTheLeftSide={refChatlistOnTheLeftSide}
            refreshChatlistOnTheLeftSide={refreshChatlistOnTheLeftSide}
          />
        )}
      </div>
      <div className="mainappBackground-bottom"></div>
    </div>
  );
};

export default MainappBackground;
