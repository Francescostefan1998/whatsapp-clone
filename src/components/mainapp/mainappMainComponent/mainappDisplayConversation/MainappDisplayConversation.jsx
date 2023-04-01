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
const MainappDisplayConversation = ({ chat }) => {
  const [friend, setFriend] = useState(null);
  const [arrayOfMessagesBody, setArrayOfMessagesBody] = useState([]);
  const [updateState, setUpdateState] = useState(null);
  console.log(arrayOfMessagesBody);
  console.log(friend);
  const dispatch = useDispatch();
  useEffect(() => {
    setUpdateState(arrayOfMessagesBody[0]);
  }, [arrayOfMessagesBody]);
  useEffect(() => {
    if (chat) {
      fetchUser();
      fetchAllMessages();
    } else {
      return;
    }
  }, [chat]);
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
    setArrayOfMessagesBody(myArray);
  };
  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3001/users/${chat.users[1]}`);
    const user = await res.json();
    setFriend(user);
  };

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
              {friend.firstName} {friend.lastName}
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
            <SingleMessageDisplayed key={message._id} body={message} />
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
          <input type="text" placeholder="Type a message" />
        </div>
        <div>
          <FaMicrophone className="mainappDisplayConversation-icons-icon ml-2" />
        </div>
      </div>
    </div>
  );
};

export default MainappDisplayConversation;
