import "./mainappDisplayConversation.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

import { BsLink45Deg } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
const MainappDisplayConversation = () => {
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
          <div>Paul</div>
        </div>
        <div className="flex">
          <BiSearchAlt2 className="mainappDisplayConversation-icons-icon" />
          <BsThreeDotsVertical className="mainappDisplayConversation-icons-icon" />
        </div>
      </div>
      <div className="mainappDisplayConversation-text">ek</div>
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
