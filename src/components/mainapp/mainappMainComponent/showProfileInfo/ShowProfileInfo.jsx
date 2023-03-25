import { useState, useEffect } from "react";
import "./showProfileInfo.css";
import { RiPencilFill } from "react-icons/ri";
import { FiArrowLeft } from "react-icons/fi";
const ShowProfileInfo = ({ update, closeProfileSection }) => {
  const [renderCount, setRenderCount] = useState(0);
  const [expand, setExpand] = useState("");
  const [pictureClass, setClassForThePicture] = useState(
    "expand-profile-picture"
  );
  const [classForTheOther, setClassForTheOther] = useState(
    "class-for-the-other-profile-informations"
  );
  useEffect(() => {
    setExpand(update);
    setClassForThePicture("expand-profile-picture expand");
    setTimeout(
      () =>
        setClassForTheOther("class-for-the-other-profile-informations expand"),
      500
    );
  }, []);
  const setExpandPrufile = (query) => {
    setExpand(query);
    setTimeout(() => closeProfileSection(false), 200);
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
          <div>Profile</div>
        </div>
      </div>
      <div className={pictureClass}>
        <img
          src="https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png"
          alt="pictureProfile"
        />
      </div>
      <div className={classForTheOther}>
        <div className="class-for-the-other-profile-section name">
          <div className="class-for-the-other-profile-section-inside">
            Your name
          </div>
          <div className="class-for-the-other-profile-section-inside">
            <div>Francesco Stefan</div>
            <div>
              <RiPencilFill />
            </div>
          </div>
        </div>
        <div className="class-for-the-other-profile-section notification">
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </div>
        <div className="class-for-the-other-profile-section about">
          <div className="class-for-the-other-profile-section-inside">
            About
          </div>
          <div className="class-for-the-other-profile-section-inside">
            <div>Hey there! I am using WhatsApp.</div>
            <div>
              <RiPencilFill />
            </div>
          </div>
        </div>
      </div>
      <div>hello</div>
    </div>
  );
};

export default ShowProfileInfo;
