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
import { useNavigate } from "react-router-dom";
import ShowProfileInfo from "../../showProfileInfo/ShowProfileInfo";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ListGroupItem } from "react-bootstrap";
import ShowFindFriends from "../../showFindFriends/ShowFindFriends";

const MainappChatList = (
  {
    fetchChatSelected,
    grabListOfUsers,
    handleMyUserIsTyping,
    handleTheBeginningOfNewChat,
    settingChatHistory,
    refreshTheChatPage,
    settingChatHistorySoket,
    concatenateTheMessage,
    socket,
    bigList,
    refChatlistOnTheLeftSide,
    refreshChatlistOnTheLeftSide,
    changeTheClass,
  },
  ref
) => {
  console.log(ref);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [showFindFriends, setShowFindFriends] = useState(false);
  const [login, setLogIn] = useState(false);
  const [user, setMyUser] = useState(null);
  const [message, setMessage] = useState("");
  const [userNameTry, setUserNameTry] = useState("");
  const [onlineusers, setOnlineUsers] = useState([]);
  const [closeAlert, setCloseAlert] = useState(true);
  const [notifications, setNotifications] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  const [chatHistorySocket, setChatHistorySoket] = useState([]);
  const [
    theEntireSectionVisibleonNotSelected,
    setTheEntireSectionVisibleonNotSelected,
  ] = useState(true);
  console.log(chatHistory);
  console.log(chatHistorySocket);
  let previousLength = bigList.length;
  useEffect(() => {}, [notifications]);
  useEffect(() => {}, [user]);
  useEffect(() => {
    setTheEntireSectionVisibleonNotSelected(true);
  }, []);
  useEffect(() => {
    const addVisibilityorRemove = document.querySelector(".mainappChatList");
    if (!theEntireSectionVisibleonNotSelected) {
      addVisibilityorRemove.classList.add("not-visimble-in-small-screen");
    } else if (theEntireSectionVisibleonNotSelected) {
      addVisibilityorRemove.classList.remove("not-visimble-in-small-screen");
    }
  }, [theEntireSectionVisibleonNotSelected]);
  useEffect(() => {
    fetchAndGetTheChatList(localStorage.getItem("userId"));
  }, [showFindFriends]);

  useEffect(() => {
    console.log("Big list length changed:", bigList.length);
    // Check if the bigList is longer than before
    const isLonger = bigList.length > previousLength;
    console.log("Is the list longer than before?", isLonger);
    setNotifications(bigList.length);
    // Update the previousLength variable to the current length

    // You can add your own logic here to re-render the component or perform other actions
  }, [bigList.length]);
  useEffect(() => {}, [refChatlistOnTheLeftSide]);
  useEffect(() => {
    console.log([...chatHistory, ...chatHistorySocket]);

    setTimeout(() => {
      concatenateTheMessage([...chatHistorySocket, ...chatHistory]);
      refreshTheChatPage(chatHistory);
    }, 200);
  }, [chatHistory, chatHistorySocket]);
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
  useImperativeHandle(ref, (e) => ({
    handleInputFocus,
    handleInputBlur,
    setTheMessage,
  }));
  const navigateIntoanotherPage = () => {
    changeTheClass(true);
  };
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
      setChatHistorySoket([...chatHistorySocket, newMessage.message]);
      refreshChatlistOnTheLeftSide(newMessage.message);
      //settingChatHistorySoket([...chatHistorySocket, newMessage.message]);
    });
  }, [chatHistorySocket]);
  const submitUsername = (username) => {
    if (username) {
      socket.emit("setUsername", { username });
    }
  };

  const handleInputFocus = () => {
    console.log("is typing");
    socket.emit("startTyping");
  };
  const setTheMessage = (e) => {
    setMessage(e);
    sendMessage(e, user ? user._id : userNameTry);
  };

  const handleInputBlur = () => {
    socket.emit("stopTyping");
  };
  const sendMessage = (messag, username) => {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: true,
    };
    const newMessage = {
      sender: username,
      text: messag,
      createdAt: date.toLocaleString("en-US", options),
    };
    socket.emit("sendMessage", { message: newMessage });
    setChatHistory([...chatHistory, newMessage]);
    settingChatHistory([...chatHistory, newMessage]);
  };
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      fetchAndGetTheChatList(localStorage.getItem("userId"));
    } else {
      return;
    }
  }, [closeAlert]);
  const handleStartingChat = (secondParam) => {
    setShowFindFriends(secondParam);
    handleTheBeginningOfNewChat(secondParam);
    setTimeout(() => {
      setShowFindFriends(false);
    }, 300);
  };
  const setChangeOfTheUserProfile = (k) => {
    fetchAndGetTheChatList(localStorage.getItem("userId"));
  };

  useEffect(() => {}, [showFindFriends]);
  return (
    <div className="mainappChatList">
      {showProfile && (
        <ShowProfileInfo
          user={user}
          setChangeOfTheUserProfile={setChangeOfTheUserProfile}
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
          user={user}
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
        <div className="mainappChatList-list-chats big-screen">
          {/*map */}
          {user &&
            user.chats.map((chat, index) => (
              <MainappSingleChat
                notifications={notifications}
                fetchChatSelected={fetchChatSelected}
                small={"mainappChatList-list-chats-single"}
                chat={chat}
                key={chat._id}
                refChatlistOnTheLeftSide={refChatlistOnTheLeftSide}
              />
            ))}
          <div></div>
        </div>
        <div className="mainappChatList-list-chats small-screen">
          {/*map */}
          {user &&
            user.chats.map((chat, index) => (
              <MainappSingleChat
                notifications={notifications}
                fetchChatSelected={fetchChatSelected}
                small={"mainappChatList-list-chats-single"}
                chat={chat}
                navigateIntoanotherPage={navigateIntoanotherPage}
                key={chat._id}
                refChatlistOnTheLeftSide={refChatlistOnTheLeftSide}
              />
            ))}
          <div></div>
        </div>
        <div className="mainappChatList-list-footer">
          <HiLockClosed />
          Your personal messages are:{" "}
          <a href="https://en.wikipedia.org/wiki/End-to-end_encryption">
            {" "}
            {"  "} end-to-end encripted
          </a>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(MainappChatList);
