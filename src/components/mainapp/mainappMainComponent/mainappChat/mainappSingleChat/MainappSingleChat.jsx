import "./mainappSingleChat.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckAll } from "react-icons/bs";
import { getSingleChat } from "../../../../../redux/actions";

const MainappSingleChat = ({ small, chat, fetchChatSelected }) => {
  const [friend, setFriend] = useState(null);
  const [chatBody, setChatBody] = useState(null);
  const [arrayOfMessagesBody, setArrayOfMessagesBody] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chat) {
      console.log(chat);
      fetchSingleChat(chat);
    } else {
      return;
    }
  }, [chat]);

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
      }}
    >
      {small === "mainappChatList-list-chats-single" && (
        <>
          <div className="mainappChatList-list-chats-single-image">
            <img
              src="https://i1.wp.com/www.rankred.com/wp-content/uploads/2015/05/Mark-Otto.jpg?resize=600%2C300"
              alt="friendpicture"
            />
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
                  {arrayOfMessagesBody[arrayOfMessagesBody.length - 1].text}
                </div>
              )}
              {arrayOfMessagesBody.length <= 0 && (
                <div className="message">
                  hello man ffffffffffffffffffffffffffffffffffffffffffffffff
                  ddddddddddddddd
                </div>
              )}
            </div>
            <div className="mainappChatList-list-chats-single-informations-right">
              <div className="time">time</div>
              <div className="messages">3</div>
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
