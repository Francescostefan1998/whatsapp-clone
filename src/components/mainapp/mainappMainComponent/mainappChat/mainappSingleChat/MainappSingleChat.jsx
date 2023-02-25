import "./mainappSingleChat.css";
import { useEffect } from "react";
import { useState } from "react";
const MainappSingleChat = ({ small, chat }) => {
  const [friend, setFriend] = useState(null);
  useEffect(() => {
    if (chat) {
      fetchUser();
    } else {
      return;
    }
  }, [chat]);

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3001/users/${chat.users[1]}`);
    const user = await res.json();
    setFriend(user);
  };

  return (
    <div className={small}>
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
              <div className="message">
                hello man ffffffffffffffffffffffffffffffffffffffffffffffff
                ddddddddddddddd
              </div>
            </div>
            <div className="mainappChatList-list-chats-single-informations-right">
              <div className="time">time</div>
              <div className="messages">3</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainappSingleChat;
