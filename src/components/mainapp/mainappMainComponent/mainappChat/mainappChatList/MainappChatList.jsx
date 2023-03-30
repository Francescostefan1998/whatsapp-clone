import "./mainappChatList.css";
import { BiFilter } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineArchive } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import MainappSingleChat from "../mainappSingleChat/MainappSingleChat";
import MainappChatHeader from "../mainappChatHeader/MainappChatHeader";
import { getUserChats } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import { BsFillBellSlashFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import ShowProfileInfo from "../../showProfileInfo/ShowProfileInfo";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ListGroupItem } from "react-bootstrap";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

const MainappChatList = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [login, setLogIn] = useState(false);
  const [onlineusers, setOnlineUsers] = useState([]);
  const [closeAlert, setCloseAlert] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  console.log(onlineusers);
  useEffect(() => {
    socket.on("welcome", (welcomeMessage) => {
      console.log(welcomeMessage);
      socket.on("loggedIn", (onlineUsersList) => {
        console.log("logged in", onlineUsersList);
        console.log(onlineUsersList);

        setLogIn(true);
        setOnlineUsers(onlineUsersList);
      });
      console.log(onlineusers);

      socket.io("updateOnlineUsers", (onlineUsersList) => {
        console.log("updateOnlineUsers a new user connectef");
        setOnlineUsers(onlineUsersList);
      });
    });
    socket.on("newMessage", (newMessage) => {
      console.log(newMessage);
      setChatHistory([...chatHistory, newMessage.message]);
    });
  }, []);
  const submitUsername = () => {
    if (user) {
      socket.emit("setUsername", user);
      console.log("socket after");
    }
  };
  const sendMessage = () => {
    const newMessage = {
      sender: user.name,
      text: "j",
      ceatedAt: new Date().toLocaleString("en-US"),
    };
    socket.emit("sendMessage", { message: newMessage });
    setChatHistory([...chatHistory, newMessage]);
  };
  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(getUserChats(user.chats));
    } else {
      return;
    }
  }, [closeAlert]);
  const { chats } = useSelector((state) => state.chats);
  return (
    <div className="mainappChatList">
      {showProfile && (
        <ShowProfileInfo
          update={"showProfileInfo"}
          closeProfileSection={setShowProfile}
        />
      )}
      <div>
        <MainappChatHeader setShowProfile={setShowProfile} />
        <div className="mainappChatList-search">
          <div className="mainappChatList-search-inner">
            <div>
              <BiSearchAlt2 className="mainappChatList-search-icon" />
            </div>
            <input type="text" placeholder="Searc or start a new chat" />
          </div>
          <div>
            <BiFilter className="mainappChatList-search-icon-filter" />
          </div>
        </div>
      </div>
      {closeAlert && (
        <div className="mainpage-allert-message">
          <div className="mainpage-allert-message-left">
            <div className="bell">
              <BsFillBellSlashFill />
            </div>
          </div>
          <div className="mainpage-allert-message-middle">
            <div className="name">Get notified of new messages</div>
            <div className="message">
              Turn on desktop notifications
              <IoIosArrowForward />
            </div>
          </div>
          <div className="mainpage-allert-message-right">
            <IoCloseSharp
              onClick={(e) => setCloseAlert(false)}
              className="alert-close-message-chatlist"
            />
          </div>
        </div>
      )}
      <div className="mainappChatList-list-container">
        <div className="mainappChatList-list-archived">
          <div>
            <MdOutlineArchive className="mainappChatList-list-archived-icon" />
          </div>
          <div>Archived</div>
        </div>
        <div className="mainappChatList-list-chats">
          {/*map */}
          {chats.map((chat, index) => (
            <MainappSingleChat
              small={"mainappChatList-list-chats-single"}
              chat={chat}
              key={chat._id}
            />
          ))}
          <div onClick={() => submitUsername()}>connect</div>
          {/*  {onlineusers &&
            onlineusers.length === 0 &&
            (<div>Log in to check who is online</div>)()}
           <div>
            {onlineusers && 
              onlineusers.map((user) => <div key={user.socketId}>{"k"}</div>)}
          </div>
          <div>
            {chatHistory &&
              chatHistory.map((message, index) => (
                <div key={index}>{message.sender}</div>
              ))}
          </div>*/}
        </div>
        <div className="mainappChatList-list-footer">
          <HiLockClosed />
          Your personal messages are{" "}
          <a href="https://en.wikipedia.org/wiki/End-to-end_encryption">
            {" "}
            end-to-end encripted
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainappChatList;
