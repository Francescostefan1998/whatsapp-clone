import "./singleMessageDisplayed.css";
import { BsCheckAll } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

/*cloudinary.v2.config({
  cloud_name: "dkyzwols6",
  api_key: "111695657897147",
  api_secret: "Y5-VvacsyzgCtmQz7L4eUFv7bv8",
});*/

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dkyzwols6",
  },
  url: {
    secure: true,
  },
});

const SingleMessageDisplayed = ({
  body,
  chatId,
  friendId,
  dateSplit,
  classForTheDropDown,
  refreshChatlistOnTheLeftSide,
  dayOftheWeek,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [pauseIconDisplayed, setPauseIconDisplayed] = useState(false);
  const [audioObj, setAudioObj] = useState(null);
  console.log(audioObj);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  console.log(duration);
  useEffect(() => {}, [duration]);

  useEffect(() => {}, [pauseIconDisplayed, audioStarted]);
  const playAudio = (url) => {
    if (!audioObj) {
      const audio = new Audio(url);
      setAudioObj(audio);
      audio.play();
      setIsPlaying(true);
      setAudioStarted(true);
    } else if (!isPlaying) {
      audioObj.play();
      setIsPlaying(true);
    } else {
      audioObj.pause();
      setIsPlaying(false);
    }
  };

  console.log(dayOftheWeek);
  const getDropDownClass = (query) => {
    const parentElement = document.querySelector(".mainappDisplayConversation");
    if (!parentElement) return "dropdown-setting-message";
    const rect = parentElement.getBoundingClientRect();

    return rect.top > classForTheDropDown / 2
      ? `dropdown-setting-message bottom ${query}`
      : `dropdown-setting-message top ${query}`;
  };
  useEffect(() => {
    checkAndUpdateMessages(body);
  }, [body]);
  const deleteForMe = async (messageId) => {
    try {
      const userId = localStorage.getItem("userId");

      // Create an object with the updated hiddenFrom array

      const response = await fetch(
        `http://localhost:3001/messages/${messageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hiddenFrom: [...body.hiddenFrom, userId],
          }),
        }
      );

      if (response.ok) {
        const updatedMessage = await response.json();
        console.log("Message updated:", updatedMessage);
      } else {
        console.error("Error updating message:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };
  const showThisDropDown = () => {
    if (showDropDown) {
      setShowDropDown(false);
    } else {
      setShowDropDown(true);
    }
  };
  const checkAndUpdateMessages = async (body) => {
    try {
      if (body && body._id) {
        return;
      } else {
        const res = await fetch(`http://localhost:3001/messages`);
        const data = await res.json();
        const findBody = await data.find(
          (data, i) => data.createdAt === body.createdAt
        );
        if (findBody) {
          return;
        } else {
          if (body.sender === localStorage.getItem("userId")) {
            const res = await fetch(
              `http://localhost:3001/messages/${localStorage.getItem(
                "userId"
              )}/${chatId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...body, user: friendId }),
              }
            );
            refreshChatlistOnTheLeftSide(body.sender);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {body && body.text && body.text.substring(0, 4) !== "http" ? (
        <div className="singleMessageDisplay">
          {body.sender === localStorage.getItem("userId") ? (
            <div className="singleMessageDisplay-right">
              <div className="singleMessageDisplay-container right">
                <div className="little-dropdown right">
                  <div
                    className="little-dropdown-relative right"
                    onClick={() => showThisDropDown()}
                  >
                    {showDropDown && (
                      <div className={getDropDownClass()}>
                        <div>Answer</div>
                        <div>React</div>
                        <div>Forward</div>
                        <div>Important</div>
                        <div>Pin</div>
                        <div onClick={() => deleteForMe(body._id)}>Delete</div>
                      </div>
                    )}
                    <div className="little-dropdown-absolute right">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>

                <div className="little-corner right"></div>
                <div className="display-date right">
                  {body.createdAt.substring(
                    11,
                    dateSplit === "short" ? 16 : 17
                  )}
                  <BsCheckAll className="display-date-icon" />
                </div>

                {body.text}
              </div>
            </div>
          ) : (
            <div className="singleMessageDisplay-left">
              <div className="singleMessageDisplay-container left">
                <div className="little-dropdown right">
                  <div
                    className="little-dropdown-relative right"
                    onClick={() => showThisDropDown()}
                  >
                    {showDropDown && (
                      <div className={getDropDownClass("left")}>
                        <div>Answer</div>
                        <div>React</div>
                        <div>Forward</div>
                        <div>Important</div>
                        <div>Pin</div>
                        <div onClick={() => deleteForMe(body._id)}>Delete</div>
                      </div>
                    )}
                    <div className="little-dropdown-absolute right">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>
                <div className="little-corner left"></div>
                <div className="display-date left">
                  {body.createdAt.substring(
                    11,
                    dateSplit === "short" ? 16 : 17
                  )}
                </div>

                {body.text}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="audio-container-mmessage">
          <div className="audio-container-mmessage-image-container">
            <img
              src="https://res.cloudinary.com/dkyzwols6/image/upload/v1679312571/beer-buzz-images-endpoint/rpp5jn3ccozhizwhuvzn.png"
              alt="person-image"
            />
          </div>

          {!isPlaying ? (
            <BsFillPlayFill
              onClick={() => {
                playAudio(body.text);
                setAudioStarted(true);
              }}
              className="mainappDisplayConversation-icons-icon ml-2"
            />
          ) : (
            <BsFillPauseFill
              onClick={() => {
                playAudio(body.text);
                setAudioStarted(false);
              }}
              className="mainappDisplayConversation-icons-icon ml-2"
            />
          )}
          <div className="progress-container">
            <div
              className={
                audioStarted && !pauseIconDisplayed ? "progress" : "nonprogress"
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMessageDisplayed;
