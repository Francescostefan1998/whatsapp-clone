import "./mainappChatHeader.css";
import { BsPeopleFill } from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import { MdMessage } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";

const MainappChatHeader = ({ setShowProfile, setShowFindFriends, user }) => {
  useEffect(() => {}, [user]);

  return (
    <div className="mainappChatHeader">
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
  );
};

export default MainappChatHeader;
