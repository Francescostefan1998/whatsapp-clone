import "./mainappSingleChat.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckAll } from "react-icons/bs";
import { getSingleChat } from "../../../../../redux/actions";
import { FaMicrophone } from "react-icons/fa";

const MainappSingleChat = ({
  small,
  chat,
  fetchChatSelected,
  notifications,
  refChatlistOnTheLeftSideNumberUnchecked,
  navigateIntoanotherPage,
}) => {
  const [friend, setFriend] = useState(null);
  const [numberToAppear, setNumberToAppear] = useState();
  const [chatBody, setChatBody] = useState(null);
  const [notCheckedMessages, setNotCheckedMessages] = useState();
  const [arrayOfMessagesBody, setArrayOfMessagesBody] = useState([]);
  const dispatch = useDispatch();
  console.log(notifications);
  useEffect(() => {
    if (chat) {
      fetchSingleChat(chat);
    } else {
      return;
    }
  }, [chat, refChatlistOnTheLeftSideNumberUnchecked]);

  useEffect(() => {
    setNumberToAppear(notifications);
  }, [notifications]);
  useEffect(() => {}, [numberToAppear]);
  const fetchSingleChat = async (chatId) => {
    try {
      const res = await fetch(`http://localhost:3001/chats/${chatId}`);
      const data = await res.json();
      setChatBody(data);
      if (data) {
        fetchFriendBody(data);
        fetchMessages(data.messages);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [notCheckedMessages]);
  const fetchFriendBody = async (data) => {
    const friendId = await data.users.filter(
      (user) => user !== localStorage.getItem("userId")
    );
    try {
      const res = await fetch(`http://localhost:3001/users/${friendId[0]}`);
      const data = await res.json();
      setFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async (mydata) => {
    try {
      const messagesData = await Promise.all(
        mydata.map(async (messageId) => {
          const res = await fetch(
            `http://localhost:3001/messages/${messageId}`
          );
          return await res.json();
        })
      );
      setArrayOfMessagesBody(messagesData);
      let listOfNotChecked = 0;
      for (let i = 0; i < messagesData.length; i++) {
        if (
          messagesData[i]._id &&
          messagesData[i].sender !== localStorage.getItem("userId") &&
          messagesData[i].checked === false
        ) {
          listOfNotChecked = listOfNotChecked + 1;
        }
      }
      setNotCheckedMessages(listOfNotChecked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={small}
      onClick={() => {
        dispatch(getSingleChat(chat));
        fetchChatSelected(chat);
        navigateIntoanotherPage && navigateIntoanotherPage();
      }}
    >
      {small === "mainappChatList-list-chats-single" && (
        <>
          <div className="mainappChatList-list-chats-single-image">
            {friend && friend.image ? (
              <img src={friend.image} alt="friendpicture" />
            ) : (
              <img
                src="https://i1.wp.com/www.rankred.com/wp-content/uploads/2015/05/Mark-Otto.jpg?resize=600%2C300"
                alt="friendpicture"
              />
            )}
          </div>
          <div className="mainappChatList-list-chats-single-informations">
            <div className="mainappChatList-list-chats-single-informations-left">
              {friend !== null ? (
                <div className="name">
                  {friend.firstName} {friend.lastName}
                </div>
              ) : (
                <div className="name">John</div>
              )}
              {arrayOfMessagesBody.length >= 1 && (
                <div className="message">
                  {arrayOfMessagesBody[arrayOfMessagesBody.length - 1]
                    .sender !== localStorage.getItem("userId") ? (
                    ""
                  ) : (
                    <BsCheckAll />
                  )}
                  {arrayOfMessagesBody[
                    arrayOfMessagesBody.length - 1
                  ].text.substring(0, 4) !== "http" ? (
                    arrayOfMessagesBody[arrayOfMessagesBody.length - 1].text
                  ) : (
                    <>
                      <FaMicrophone />
                      audio message
                    </>
                  )}
                </div>
              )}
              {arrayOfMessagesBody.length <= 0 && (
                <div className="message">-no text yet</div>
              )}
            </div>
            <div className="mainappChatList-list-chats-single-informations-right">
              <div className="time">time</div>
              <div
                className="messages"
                style={{
                  backgroundColor: notCheckedMessages
                    ? "rgb(2, 228, 2)"
                    : "transparent",
                }}
              >
                {notCheckedMessages ? notCheckedMessages : ""}
              </div>
              <div className="arrow-expand">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainappSingleChat;
