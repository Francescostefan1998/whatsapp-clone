import { useState, useEffect } from "react";
import "./showProfileInfo.css";
import { RiPencilFill } from "react-icons/ri";
import { BsCameraFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
const ShowProfileInfo = ({
  update,
  closeProfileSection,
  user,
  setChangeOfTheUserProfile,
}) => {
  const [renderCount, setRenderCount] = useState(0);
  const [expand, setExpand] = useState("");
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [icon3, setIcon3] = useState("icon-3");
  const [icon2, setIcon2] = useState("icon-2");
  const [icon4, setIcon4] = useState("icon-4");
  const [icon5, setIcon5] = useState("icon-5");
  const [file, setFile] = useState(null);
  const [nameText, setNameText] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [showFormToChangeImage, setShowFormToChangeImage] = useState(false);
  const [pictureClass, setClassForThePicture] = useState(
    "expand-profile-picture"
  );
  const [classForTheOther, setClassForTheOther] = useState(
    "class-for-the-other-profile-informations"
  );
  useEffect(() => {}, [user]);
  useEffect(() => {
    setExpand(update);
    setClassForThePicture("expand-profile-picture expand");
    setTimeout(
      () =>
        setClassForTheOther("class-for-the-other-profile-informations expand"),
      500
    );
  }, []);

  const fetchTheNewDetailsUserAbout = async (aboutText) => {
    const res = await fetch(
      `http://localhost:3001/users/${localStorage.getItem("userId")}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          about: aboutText,
        }),
      }
    );
    setChangeOfTheUserProfile();

    setAboutText("");
  };
  const fetchTheNewDetailsUserName = async (nameText) => {
    const res = await fetch(
      `http://localhost:3001/users/${localStorage.getItem("userId")}`,

      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameText.split(" ")[0],
          lastName: nameText.split(" ")[1],
        }),
      }
    );
    setChangeOfTheUserProfile();

    setNameText("");
  };
  useEffect(() => {}, [file]);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(
        `http://localhost:3001/images/${localStorage.getItem("userId")}`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      )
      .then((response) => {
        console.log(response);
        setChangeOfTheUserProfile(response);
        setShowFormToChangeImage(false);
      });
  };
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
        <div className="edit-picture-profile-appear-on-hover">
          {!showFormToChangeImage && (
            <>
              <div onClick={() => setShowFormToChangeImage(true)}>
                <BsCameraFill />
              </div>
              <div onClick={() => setShowFormToChangeImage(true)}>
                CHANGE <br></br>PROFILE PHOTO
              </div>
            </>
          )}
        </div>
        {showFormToChangeImage && (
          <form className="form-picture-dropdown" onSubmit={handleSubmit}>
            <div className="closing-dropdown-changing-image-relative">
              <div
                onClick={() => setShowFormToChangeImage(false)}
                className="closing-dropdown-changing-image"
              >
                <AiFillCloseCircle />
              </div>
            </div>
            <label className="label-picture-dropdown">
              Select picture: <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <button type="submit" className="button-picture-dropdown">
              Upload
            </button>
          </form>
        )}
        {user && user.image ? (
          <img src={user.image} alt="image" />
        ) : (
          <img
            src="https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png"
            alt="pictureProfile"
          />
        )}
      </div>
      <div className={classForTheOther}>
        <div className="class-for-the-other-profile-section name">
          <div className="class-for-the-other-profile-section-inside green">
            Your name
          </div>
          {!editName && (
            <div className="class-for-the-other-profile-section-inside black">
              <div>
                {user && user.firstName
                  ? user.firstName + " " + user.lastName
                  : "Hey there! I am using WhatsApp."}
              </div>
              <div>
                <RiPencilFill
                  className="icon"
                  onClick={(e) => {
                    setIcon3("icon-3 expand");
                    setIcon2("icon-2 expand");

                    setEditName(true);
                  }}
                />
              </div>
            </div>
          )}
          {editName && (
            <div className="class-for-the-other-profile-section-inside black borderbottom">
              <div>
                <input
                  type="text"
                  value={
                    nameText && nameText !== ""
                      ? nameText
                      : user && user.firstName + " " + user.lastName
                  }
                  onChange={(e) => setNameText(e.target.value)}
                />
              </div>
              <div className="appear-on-click">
                <div className={icon3}>9</div>
                <FaRegSmile className={icon2} />
                <AiOutlineCheck
                  className="icon"
                  onClick={(e) => {
                    setIcon3("icon-2");
                    setIcon2("icon-3");

                    setEditName(false);
                    fetchTheNewDetailsUserName(nameText);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="class-for-the-other-profile-section notification">
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </div>

        <div className="class-for-the-other-profile-section about">
          <div className="class-for-the-other-profile-section-inside green">
            About
          </div>
          {!editAbout && (
            <div className="class-for-the-other-profile-section-inside black">
              <div>
                {user && user.about
                  ? user.about
                  : "Hey there! I am using WhatsApp."}
              </div>
              <div>
                <RiPencilFill
                  className="icon"
                  onClick={(e) => {
                    setIcon4("icon-4 expand");
                    setIcon5("icon-5 expand");

                    setEditAbout(true);
                  }}
                />
              </div>
            </div>
          )}
          {editAbout && (
            <div className="class-for-the-other-profile-section-inside black borderbottom">
              <div>
                <input
                  type="text"
                  value={
                    aboutText && aboutText !== ""
                      ? aboutText
                      : user && user.about
                  }
                  onChange={(e) => setAboutText(e.target.value)}
                />
              </div>
              <div className="appear-on-click">
                <div className={icon4}>8</div>
                <FaRegSmile className={icon5} />
                <AiOutlineCheck
                  className="icon"
                  onClick={(e) => {
                    setIcon4("icon-5");
                    setIcon5("icon-4");

                    setEditAbout(false);
                    fetchTheNewDetailsUserAbout(aboutText);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div>hello</div>
    </div>
  );
};

export default ShowProfileInfo;
