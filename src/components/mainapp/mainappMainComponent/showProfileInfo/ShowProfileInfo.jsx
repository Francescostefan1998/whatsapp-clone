import { useState, useEffect } from "react";
import "./showProfileInfo.css";
import { RiPencilFill } from "react-icons/ri";
import { BsCameraFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
const ShowProfileInfo = ({ update, closeProfileSection }) => {
  const [renderCount, setRenderCount] = useState(0);
  const [expand, setExpand] = useState("");
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [icon3, setIcon3] = useState("icon-3");
  const [icon2, setIcon2] = useState("icon-2");
  const [icon4, setIcon4] = useState("icon-4");
  const [icon5, setIcon5] = useState("icon-5");
  const [file, setFile] = useState(null);

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
        console.log(response.data);
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
          <div>
            <BsCameraFill />
          </div>
          <div>
            CHANGE <br></br>PROFILE PHOTO
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Select a Profile picture:{" "}
              <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <button type="submit">Upload</button>
          </form>
        </div>
        <img
          src="https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png"
          alt="pictureProfile"
        />
      </div>
      <div className={classForTheOther}>
        <div className="class-for-the-other-profile-section name">
          <div className="class-for-the-other-profile-section-inside green">
            Your name
          </div>
          {!editName && (
            <div className="class-for-the-other-profile-section-inside black">
              <div>Francesco Stefan</div>
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
                <input type="text" value={"Francesco Stefan"} />
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
              <div>Hey there! I am using WhatsApp.</div>
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
                <input type="text" value={"Hey there, I am using WhatsApp"} />
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
