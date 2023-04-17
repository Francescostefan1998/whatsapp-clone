import "./mainappChatHeader.css";
import { BsPeopleFill } from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import { MdMessage } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const MainappChatHeader = ({ setShowProfile, setShowFindFriends, user }) => {
  const [classSelected, setClassSelected] = useState("chats");
  const [showDropDown, setShowDropDown] = useState(false);
  useEffect(() => {}, [user]);

  return (
    <>
      <div className="mainappChatHeader big-screen">
        <div
          className="mainappChatHeader-image"
          onClick={() => setShowProfile(true)}
        >
          {user && user.image ? (
            <img src={user.image} alt="profile" />
          ) : (
            <img
              src="https://www.boetsch-gemuese.ch/sites/default/files/styles/personenfoto/public/default_images/avatar.png?itok=5X6VGIm2"
              alt="profile"
            />
          )}
        </div>
        <div className="mainappChatHeader-icons">
          <div>
            <BsPeopleFill className="mainappChatHeader-icons-icon" />
          </div>
          <div>
            <TbCircleDashed className="mainappChatHeader-icons-icon" />
          </div>
          <div>
            <MdMessage
              className="mainappChatHeader-icons-icon"
              onClick={() => setShowFindFriends(true)}
            />
          </div>
          <div>
            <BsThreeDotsVertical className="mainappChatHeader-icons-icon" />
          </div>
        </div>
      </div>
      <div className="mainappChatHeader small-screen">
        <div className="mainappChatHeader-top-bar">
          <div>WhatsApp</div>
          <div className="mainappChatHeader-top-bar-left">
            <HiOutlineCamera className="mainappChatHeader-icons-icon" />
            <AiOutlineSearch className="mainappChatHeader-icons-icon" />
            <BsThreeDotsVertical className="mainappChatHeader-icons-icon" />
            {showDropDown && (
              <div className={`dropdown-setting-message bottom right`}>
                <div>Answer</div>
                <div>React</div>
                <div>Forward</div>
                <div>Important</div>
                <div>Pin</div>
                <div>Delete</div>
              </div>
            )}
          </div>
        </div>
        {/*<div
          className="mainappChatHeader-image"
          onClick={() => setShowProfile(true)}
        >
          {user && user.image ? (
            <img src={user.image} alt="profile" />
          ) : (
            <img
              src="https://www.boetsch-gemuese.ch/sites/default/files/styles/personenfoto/public/default_images/avatar.png?itok=5X6VGIm2"
              alt="profile"
            />
          )}
        </div>
        <div className="mainappChatHeader-icons">
          <div>
            <BsPeopleFill className="mainappChatHeader-icons-icon" />
          </div>
          <div>
            <TbCircleDashed className="mainappChatHeader-icons-icon" />
          </div>
          <div>
            <MdMessage
              className="mainappChatHeader-icons-icon"
              onClick={() => setShowFindFriends(true)}
            />
          </div>
          <div>
            <BsThreeDotsVertical className="mainappChatHeader-icons-icon" />
          </div>
        </div>*/}
      </div>
      <div className="mainappChatHeader small-screen padding-inline-0">
        <div className="inside-the-select-bar-absolute-container">
          <div className="inside-the-select-bar-relative-container">
            <div
              className={`inside-the-select-bar-absolute-container-little ${classSelected}`}
            ></div>
          </div>
        </div>
        <div className="inside-the-select-bar-absolute-container-line">
          <div className="inside-the-select-bar-relative-container">
            <div
              className={`inside-the-select-bar-absolute-container-little ${classSelected}`}
            ></div>
          </div>
        </div>
        <div className="mainappChatHeader-small-screen-select-bar">
          <div
            className="inside-the-select-bar people"
            onClick={() => setClassSelected("people")}
          >
            <HiUserGroup />
          </div>
          <div
            className="inside-the-select-bar"
            onClick={() => setClassSelected("chats")}
          >
            Chats
          </div>
          <div
            className="inside-the-select-bar"
            onClick={() => setClassSelected("status")}
          >
            Status
          </div>
          <div
            className="inside-the-select-bar"
            onClick={() => setClassSelected("calls")}
          >
            Calls
          </div>
        </div>
      </div>
    </>
  );
};

export default MainappChatHeader;
