import { useState, useEffect } from "react";
import "./showFindFriends.css";
import { RiPencilFill } from "react-icons/ri";
import { BsCameraFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
const ShowFindFriends = ({
  update,
  closeFindFriendsSection,
  handleStartingChat,
}) => {
  const [renderCount, setRenderCount] = useState(0);
  const [expand, setExpand] = useState("");
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [listOfconstact, setListOfContact] = useState([]);
  const [mySelfProfile, setMySelfProfile] = useState(null);
  const [pictureClass, setClassForThePicture] = useState(
    "expand-profile-picture"
  );
  const [classForTheOther, setClassForTheOther] = useState(
    "class-for-the-other-profile-informations"
  );
  const fetchAllUsers = async () => {
    try {
      const res = await fetch(
        "https://whatsapp-clone-backend-production-8895.up.railway.app/users"
      );
      const data = await res.json();
      setListOfContact(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMyself = async () => {
    try {
      const res = await fetch(
        `https://whatsapp-clone-backend-production-8895.up.railway.app/users/${localStorage.getItem(
          "userId"
        )}`
      );
      const data = await res.json();
      setMySelfProfile(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setExpand(update);
    setClassForThePicture("expand-profile-picture expand");
    fetchAllUsers();
    fetchMyself();
    setTimeout(
      () =>
        setClassForTheOther("class-for-the-other-profile-informations expand"),
      500
    );
  }, []);
  const setExpandPrufile = (query) => {
    setExpand(query);
    setTimeout(() => closeFindFriendsSection(false), 200);
    setTimeout(() => setClassForThePicture(""), 200);
  };
  return (
    <div className={expand}>
      <div className="showProfileInfoHeader">
        <div></div>
        <div className="showProfileInfoHeader-back">
          <FiArrowLeft
            className="showProfileInfoHeader-back-icon"
            onClick={(e) => setExpandPrufile("showProfileclose")}
          />
          <div>New chat</div>
        </div>
      </div>
      <div className="showProfileInfoHeader-small">
        <div className="showProfileInfoHeader-back">
          <FiArrowLeft
            className="showProfileInfoHeader-back-icon"
            onClick={(e) => setExpandPrufile("showProfileclose")}
          />
          <div>
            <div>Select contact</div>
            <div>112 contacts</div>
          </div>
          <div>
            <AiOutlineSearch />
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
      <div className="showFriiends-search-bar">
        <div className="showFriiends-search-bar-inside">
          <FiArrowLeft className="showProfileInfoHeader-back-icon green" />
          <input type="text" />
        </div>
      </div>
      <div className="find-friends-new-create-group">
        <div>
          <div className="find-friends-new-group-image">
            <MdGroup />
          </div>
          <div className="find-friends-new-group-text-with-border-top">
            New group
          </div>
        </div>
        <div>
          <div className="find-friends-new-group-image">
            <HiUserGroup />
          </div>
          <div className="find-friends-new-group-text-with-border-top">
            New community
          </div>
        </div>

        <div className="find-friends-new-create-group-title">
          WHATSAPP CONTACT
        </div>
        <div>
          <div className="find-friends-new-group-image">
            <HiUserGroup />
          </div>
          <div className="find-friends-new-group-text-with-border-top">
            {mySelfProfile
              ? mySelfProfile.firstName + " " + mySelfProfile.lastName
              : "New community"}
          </div>
        </div>
        <div className="find-friends-new-create-group-title">TO</div>
        {listOfconstact &&
          listOfconstact.map((contact, i) =>
            contact._id !== localStorage.getItem("userId") ? (
              <div
                key={contact._id}
                className="start-a-new-chat-cursor-pointer"
                onClick={(e) => {
                  console.log(e);
                  handleStartingChat(contact._id);
                }}
              >
                <div className="find-friends-new-group-image">
                  <HiUserGroup />
                </div>
                <div className="find-friends-new-group-text-with-border-top">
                  {contact.firstName + " " + contact.lastName}
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default ShowFindFriends;
