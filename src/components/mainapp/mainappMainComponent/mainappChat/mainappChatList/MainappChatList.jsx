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
import { forwardRef, useImperativeHandle } from "react";
import { BsFillBellSlashFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import ShowProfileInfo from "../../showProfileInfo/ShowProfileInfo";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ListGroupItem } from "react-bootstrap";
import ShowFindFriends from "../../showFindFriends/ShowFindFriends";
const socket = io("http://localhost:3001", { transports: ["websocket"] });

const MainappChatList = (
  {
    fetchChatSelected,
    grabListOfUsers,
    handleMyUserIsTyping,
    handleTheBeginningOfNewChat,
  },
  ref
) => {
  console.log(ref);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [showFindFriends, setShowFindFriends] = useState(false);
  const [login, setLogIn] = useState(false);
  const [user, setMyUser] = useState(null);
  const [message, setMessage] = useState("");
  const [userNameTry, setUserNameTry] = useState("");
  const [onlineusers, setOnlineUsers] = useState([]);
  const [closeAlert, setCloseAlert] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  console.log(chatHistory);
  console.log(onlineusers);
  const fetchAndGetTheChatList = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`);
      const data = await res.json();
      setMyUser(data);
      submitUsername(data.firstName + data.lastName);
    } catch (error) {
      console.log(error);
    }
  };
  useImperativeHandle(ref, () => ({
    handleInputFocus,
    handleInputBlur,
  }));
  useEffect(() => {
    socket.on("welcome", (welcomeMessage) => {
      console.log(welcomeMessage);
      socket.on("loggedIn", (onlineUsersList) => {
        setLogIn(true);
        setOnlineUsers(onlineUsersList);
        grabListOfUsers(onlineUsersList);
      });

      socket.on("updateOnlineUsers", (onlineUsersList) => {
        setOnlineUsers(onlineUsersList);
        grabListOfUsers(onlineUsersList);
      });
    });
    socket.on("userTyping", (username) => {
      console.log(username + " is typing...");
      handleMyUserIsTyping(username);
    });

    socket.on("userStoppedTyping", (username) => {
      console.log(username + " stopped typing.");
      handleMyUserIsTyping(" stopped typing.");
    });
    socket.on("newMessage", (newMessage) => {
      setChatHistory([...chatHistory, newMessage.message]);
    });
  }, [chatHistory]);
  const submitUsername = (username) => {
    if (username) {
      socket.emit("setUsername", { username });
    }
  };
  const handleInputFocus = () => {
    socket.emit("startTyping");
  };

  const handleInputBlur = () => {
    socket.emit("stopTyping");
  };
  const sendMessage = (messag, username) => {
    const newMessage = {
      sender: username,
      text: messag,
      ceatedAt: new Date().toLocaleString("en-US"),
    };
    socket.emit("sendMessage", { message: newMessage });
    setChatHistory([...chatHistory, newMessage]);
  };
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      fetchAndGetTheChatList(localStorage.getItem("userId"));
    } else {
      return;
    }
  }, [closeAlert]);
  const handleStartingChat = (secondParam) => {
    console.log(secondParam);
    setShowFindFriends(secondParam);
    handleTheBeginningOfNewChat(secondParam);
  };

  useEffect(() => {}, [showFindFriends]);
  return (
    <div className="mainappChatList">
      {showProfile && (
        <ShowProfileInfo
          update={"showProfileInfo"}
          closeProfileSection={setShowProfile}
        />
      )}
      {showFindFriends && (
        <ShowFindFriends
          update={"showProfileInfo"}
          closeFindFriendsSection={setShowFindFriends}
          handleStartingChat={handleStartingChat}
        />
      )}
      <div>
        <MainappChatHeader
          setShowProfile={setShowProfile}
          setShowFindFriends={setShowFindFriends}
          handleStartingChat={handleStartingChat}
        />
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
          {user &&
            user.chats.map((chat, index) => (
              <MainappSingleChat
                fetchChatSelected={fetchChatSelected}
                small={"mainappChatList-list-chats-single"}
                chat={chat}
                key={chat._id}
              />
            ))}
          <div>
            <input
              type="text"
              onChange={(e) => setUserNameTry(e.target.value)}
              disabled={login}
            />
          </div>
          <div onClick={() => submitUsername(userNameTry)} disabled={login}>
            connect
          </div>
          {login && (
            <div>
              {onlineusers && onlineusers.length === 0 && (
                <div>Log in to check who is online</div>
              )}
              <div>
                {onlineusers &&
                  onlineusers.map((user) => (
                    <div key={user.socketId}>{user.username}</div>
                  ))}
              </div>
              <div className="mt-4">
                {chatHistory &&
                  chatHistory.map((message, index) => (
                    <div key={message.createdAt}>
                      {message.sender}: {message.text}
                    </div>
                  ))}
              </div>
              <input
                type="text"
                placeholder="write message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={() => sendMessage(message, userNameTry)}>
                send message
              </button>
            </div>
          )}
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

export default forwardRef(MainappChatList);
