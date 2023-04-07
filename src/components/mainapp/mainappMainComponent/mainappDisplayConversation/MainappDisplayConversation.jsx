import "./mainappDisplayConversation.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BsLink45Deg } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import SingleMessageDisplayed from "./singleMessageDisplayed/SingleMessageDisplayed";
const MainappDisplayConversation = ({
  chat,
  listOfUsers,
  callHandleInputFocus,
  callHandleInputBlur,
  myUserIsTyping,
  chatHistory,
  callHandleSetTheMessage,
  refreshChatPage,
  bigList,
  refreshChatlistOnTheLeftSide,
}) => {
  const [friend, setFriend] = useState(null);
  const [arrayOfMessagesBody, setArrayOfMessagesBody] = useState([]);
  const [updateState, setUpdateState] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setUpdateState(arrayOfMessagesBody[0]);
  }, [arrayOfMessagesBody]);
  useEffect(() => {}, [myUserIsTyping]);
  useEffect(() => {
    console.log(listOfUsers);
  }, [listOfUsers]);
  useEffect(() => {}, [bigList]);
  useEffect(() => {
    if (chat) {
      fetchUser();
      fetchAllMessages();
    } else {
      return;
    }
  }, [chat]);

  useEffect(() => {
    if (arrayOfMessagesBody.length >= 1) {
      updateVisualize(arrayOfMessagesBody);
    }
  }, [arrayOfMessagesBody, chat]);

  const updateVisualize = async (list) => {
    const userId = localStorage.getItem("userId");

    for (let i = 0; i < list.length; i++) {
      if (userId !== list[i].sender) {
        try {
          // Create an object with the updated hiddenFrom array

          const response = await fetch(
            `http://localhost:3001/messages/${list[i]._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                checked: true,
              }),
            }
          );

          if (response.ok) {
            refreshChatlistOnTheLeftSide(list[i]._id);
            const updatedMessage = await response.json();
          } else {
            console.error(response);
          }
        } catch (error) {}
      } else {
      }
    }
  };

  useEffect(() => {}, [message]);
  const fetchAllMessages = async () => {
    let myArray = [];
    for (let i = 0; i < chat.messages.length; i++) {
      try {
        const res = await fetch(
          `http://localhost:3001/messages/${chat.messages[i]}`
        );
        const data = await res.json();
        myArray = [...myArray, data];
      } catch (error) {
        console.log(error);
      }
    }
    setArrayOfMessagesBody(
      myArray.filter(
        (message) =>
          !message.hiddenFrom.includes(localStorage.getItem("userId"))
      )
    );
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      callHandleSetTheMessage(message);
    }
  };
  const fetchUser = async () => {
    const res = await fetch(
      `http://localhost:3001/users/${
        chat.users.filter(
          (userId) => userId !== localStorage.getItem("userId")
        )[0]
      }`
    );
    const user = await res.json();
    setFriend(user);
  };
  useEffect(() => {}, [chatHistory]);
  useEffect(() => {}, [refreshChatPage]);

  return (
    <div className="mainappDisplayConversation">
      <div className="mainappDisplayConversation-header">
        <div className="flex">
          <div className="mainappDisplayConversation-image">
            <img
              src="https://th.bing.com/th/id/OIP.8Xj9CyAn1wTXOq-hlelEyQHaFm?pid=ImgDet&rs=1"
              alt="picture"
            />
          </div>
          {friend !== null ? (
            <div>
              {friend.firstName} {friend.lastName} <br />
              {listOfUsers &&
              listOfUsers.find(
                (user, i) =>
                  user.username === friend.firstName + friend.lastName
              ) &&
              myUserIsTyping === friend.firstName + friend.lastName
                ? "is typing.."
                : listOfUsers.find(
                    (user, i) =>
                      user.username === friend.firstName + friend.lastName
                  )
                ? "online"
                : "offline"}
            </div>
          ) : (
            <div>Paul</div>
          )}
        </div>
        <div className="flex">
          <BiSearchAlt2 className="mainappDisplayConversation-icons-icon" />
          <BsThreeDotsVertical className="mainappDisplayConversation-icons-icon" />
        </div>
      </div>
      <div className="mainappDisplayConversation-text">
        {chat &&
          arrayOfMessagesBody.length >= 1 &&
          arrayOfMessagesBody.map((message, index) => (
            <SingleMessageDisplayed
              classForTheDropDown={index >= 7 ? 20 : 50}
              key={message._id}
              body={message}
              dateSplit={"short"}
              refreshChatlistOnTheLeftSide={refreshChatlistOnTheLeftSide}
            />
          ))}
        {bigList &&
          bigList.length >= 1 &&
          bigList.map((message, index) => (
            <SingleMessageDisplayed
              classForTheDropDown={
                chat && arrayOfMessagesBody.length >= 7
                  ? 20
                  : index >= 7
                  ? 20
                  : 50
              }
              key={message.createdAt}
              body={message}
              chatId={chat._id}
              friendId={friend._id}
              dateSplit={"long"}
              refreshChatlistOnTheLeftSide={refreshChatlistOnTheLeftSide}
            />
          ))}
      </div>
      <div className="mainappDisplayConversation-footer">
        <div>
          <BsEmojiSmile className="mainappDisplayConversation-icons-icon ml-2" />
        </div>
        <div>
          <BsLink45Deg className="mainappDisplayConversation-icons-icon ml-2" />
        </div>
        <div className="mainappDisplayConversation-input">
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
            onFocus={callHandleInputFocus}
            onBlur={callHandleInputBlur}
            onKeyDown={(e) => handleKeydown(e)}
          />
        </div>
        <div>
          <FaMicrophone className="mainappDisplayConversation-icons-icon ml-2" />
        </div>
      </div>
    </div>
  );
};

export default MainappDisplayConversation;
