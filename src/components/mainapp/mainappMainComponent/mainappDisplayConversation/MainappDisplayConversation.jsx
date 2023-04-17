import "./mainappDisplayConversation.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BsLink45Deg } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { FiPauseCircle } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { useRef } from "react";
import { HiVideoCamera } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import SingleMessageDisplayed from "./singleMessageDisplayed/SingleMessageDisplayed";

const webkitSpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

const MainappDisplayConversation = ({
  chat,
  listOfUsers,
  callHandleInputFocus,
  callHandleInputBlur,
  myUserIsTyping,
  chatHistory,
  callHandleSetTheMessage,
  refreshChatPage,
  bigList,
  setrefChatlistOnTheLeftSideNumberUnchecked,
  refreshChatlistOnTheLeftSide,
  personalizedClassName,
  setChat,
  refChatlistOnTheLeftSide,
}) => {
  const [lastAudio, setLastAudion] = useState("");
  const [file, setFile] = useState(null);
  const [friend, setFriend] = useState(null);
  const [arrayOfMessagesBody, setArrayOfMessagesBody] = useState([]);
  const [updateState, setUpdateState] = useState(null);
  const [message, setMessage] = useState("");
  const [audioStarted, setAudioStarted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [pauseIconDisplayed, setPausedIconDisplayed] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  console.log(message);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  useEffect(() => {}, [message]);
  const scrollToBottom = () => {
    console.log("scrollToBottom");
    if (messagesEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = messagesEndRef.current.offsetTop;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [bigList]);

  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia not supported on your browser!");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);

      newMediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [event.data]);
        }
      };

      newMediaRecorder.start();
    } catch (err) {
      console.error("Error in startRecording:", err);
    }
  }
  useEffect(() => {
    if (recordingCompleted) {
      const recordedBlob = new Blob(recordedChunks, { type: "audio/webm" });
      sendAudio(recordedBlob);
      setRecordingCompleted(false);
    }
  }, [recordingCompleted, recordedChunks]);
  useEffect(() => {}, [recordedChunks]);
  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, { type: "audio/webm" });
        setRecordingCompleted(true);
      };
      mediaRecorder.stop();
    }
  }
  function downloadAudio() {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      /*  const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audio.webm";
      a.click();
      URL.revokeObjectURL(url);
      console.log(url);*/
    }
  }
  async function sendAudio(audioBlob) {
    console.log("send audio triggered");
    console.log(audioBlob);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recorded_audio.webm");

      const response = await fetch("http://localhost:3001/audio/api/audio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const audioUrl = await response.text();
        console.log("Audio uploaded successfully. URL:", audioUrl);
        callHandleSetTheMessage(audioUrl);
      } else {
        console.error(
          "Error uploading audio:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      console.error("Error in sendAudio:", err);
    }
  }

  const updateVisualize = async (list) => {
    const userId = localStorage.getItem("userId");

    for (let i = 0; i < list.length; i++) {
      if (userId !== list[i].sender) {
        try {
          // Create an object with the updated hiddenFrom array

          const response = await fetch(
            `http://localhost:3001/messages/${list[i]._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                checked: true,
              }),
            }
          );

          if (response.ok) {
            // refreshChatlistOnTheLeftSide(list[i]._id);
            const updatedMessage = await response.json();
            setrefChatlistOnTheLeftSideNumberUnchecked(list[i]._id);
          } else {
            console.error(response);
          }
          scrollToBottom();
        } catch (error) {}
      } else {
      }
    }
  };

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
    setArrayOfMessagesBody(
      myArray.filter(
        (message) =>
          !message.hiddenFrom.includes(localStorage.getItem("userId"))
      )
    );
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      callHandleSetTheMessage(message);
    }
  };
  const fetchUser = async () => {
    const res = await fetch(
      `http://localhost:3001/users/${
        chat.users.filter(
          (userId) => userId !== localStorage.getItem("userId")
        )[0]
      }`
    );
    const user = await res.json();
    setFriend(user);
  };

  useEffect(() => {}, [lastAudio]);
  useEffect(() => {
    if (arrayOfMessagesBody.length >= 1) {
      updateVisualize(arrayOfMessagesBody);
    }
  }, [arrayOfMessagesBody, chat]);

  useEffect(() => {}, [message]);
  useEffect(() => {
    setUpdateState(arrayOfMessagesBody[0]);
  }, [arrayOfMessagesBody]);
  useEffect(() => {}, [myUserIsTyping]);
  useEffect(() => {
    console.log(listOfUsers);
  }, [listOfUsers]);
  useEffect(() => {}, [bigList]);
  useEffect(() => {
    if (chat) {
      fetchUser();
      fetchAllMessages();
    } else {
      return;
    }
  }, [chat, refChatlistOnTheLeftSide]);
  useEffect(() => {}, [chatHistory]);
  useEffect(() => {}, [refreshChatPage]);
  useEffect(() => {
    downloadAudio();
  }, [pauseIconDisplayed]);
  useEffect(() => {
    downloadAudio();
  }, [recordedChunks]);
  useEffect(() => {}, [audioStarted]);
  return (
    <div className={personalizedClassName}>
      <div className="mainappDisplayConversation-header">
        <div className="flex">
          <div className="arrow-displayconversation-visible-just-in-small-screen">
            {" "}
            <AiOutlineArrowLeft onClick={() => setChat(null)} />
          </div>
          <div className="mainappDisplayConversation-image">
            {friend && friend.image ? (
              <img src={friend.image} alt="picture" />
            ) : (
              <img
                src="https://th.bing.com/th/id/OIP.8Xj9CyAn1wTXOq-hlelEyQHaFm?pid=ImgDet&rs=1"
                alt="picture"
              />
            )}
            <img
              src="https://th.bing.com/th/id/OIP.8Xj9CyAn1wTXOq-hlelEyQHaFm?pid=ImgDet&rs=1"
              alt="picture"
            />
          </div>
          {friend !== null ? (
            <div>
              <div>
                {friend.firstName} {friend.lastName}{" "}
              </div>
              {listOfUsers &&
              listOfUsers.find(
                (user, i) =>
                  user.username === friend.firstName + friend.lastName
              ) &&
              myUserIsTyping === friend.firstName + friend.lastName ? (
                <div className="is-typing-real-time">is typing..</div>
              ) : listOfUsers.find(
                  (user, i) =>
                    user.username === friend.firstName + friend.lastName
                ) ? (
                <div className="is-typing-real-time">online</div>
              ) : (
                <div className="is-typing-real-time">offline</div>
              )}
            </div>
          ) : (
            <div>Paul</div>
          )}
        </div>
        <div className="flex">
          <HiVideoCamera className="mainappDisplayConversation-icons-icon visible-in-smallscreen" />
          <MdCall className="mainappDisplayConversation-icons-icon visible-in-smallscreen" />

          <BiSearchAlt2 className="mainappDisplayConversation-icons-icon invisible-in-smallscreen" />
          <BsThreeDotsVertical className="mainappDisplayConversation-icons-icon invisible-in-smallscreen" />
          <BsThreeDotsVertical className="mainappDisplayConversation-icons-icon visible-in-smallscreen" />
        </div>
      </div>
      <div className="mainappDisplayConversation-text" ref={chatContainerRef}>
        {chat &&
          arrayOfMessagesBody.length >= 1 &&
          arrayOfMessagesBody.map((message, index) => {
            const messageDate = new Date(message.createdAt);
            const dayOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ][messageDate.getDay()];

            return (
              <>
                <div className="display-date-of-the-week-container">
                  {index - 1 !== -1 ? (
                    new Date(
                      arrayOfMessagesBody[index - 1].createdAt
                    ).getDay() ===
                    new Date(arrayOfMessagesBody[index].createdAt).getDay() ? (
                      ""
                    ) : (
                      <div className="display-date-of-the-week">
                        {dayOfWeek}
                      </div>
                    )
                  ) : (
                    <div className="display-date-of-the-week">{dayOfWeek}</div>
                  )}
                </div>
                <SingleMessageDisplayed
                  classForTheDropDown={index >= 7 ? 20 : 50}
                  key={message._id}
                  dayOftheWeek={`${dayOfWeek}`}
                  body={message}
                  dateSplit={"short"}
                  refChatlistOnTheLeftSide={refChatlistOnTheLeftSide}
                  refreshChatlistOnTheLeftSide={refreshChatlistOnTheLeftSide}
                />
              </>
            );
          })}
        {bigList &&
          bigList.length >= 1 &&
          bigList.map((message, index) => (
            <SingleMessageDisplayed
              classForTheDropDown={
                chat && arrayOfMessagesBody.length >= 7
                  ? 20
                  : index >= 7
                  ? 20
                  : 50
              }
              key={message.createdAt}
              body={message}
              chatId={chat && chat._id}
              friendId={friend && friend._id && friend._id}
              dateSplit={"long"}
              refreshChatlistOnTheLeftSide={refreshChatlistOnTheLeftSide}
            />
          ))}
        <div ref={messagesEndRef} />
      </div>
      {!audioStarted && (
        <div className="mainappDisplayConversation-footer  big-screen">
          <div>
            <BsEmojiSmile className="mainappDisplayConversation-icons-icon ml-2" />
          </div>
          <div>
            <BsLink45Deg className="mainappDisplayConversation-icons-icon ml-2" />
          </div>
          <div className="mainappDisplayConversation-input">
            <input
              type="text"
              placeholder="Type a message"
              onChange={(e) => setMessage(e.target.value)}
              onFocus={callHandleInputFocus}
              onBlur={callHandleInputBlur}
              onKeyDown={(e) => handleKeydown(e)}
            />
          </div>
          {message === "" ? (
            <div>
              <FaMicrophone
                className="mainappDisplayConversation-icons-icon ml-2"
                onClick={() => {
                  if (!audioStarted) {
                    setPausedIconDisplayed(false);
                    startRecording();
                    setAudioStarted(true);
                  } else {
                    stopRecording();
                    setAudioStarted(false);
                  }
                }}
              />
            </div>
          ) : (
            <div>
              <IoMdSend
                className="mainappDisplayConversation-icons-icon ml-2"
                onClick={(e) => callHandleSetTheMessage(message)}
              />
            </div>
          )}
        </div>
      )}
      {audioStarted && (
        <div className="mainappDisplayConversation-footer big-screen">
          <div></div>
          <div></div>

          <div className="mainappDisplayConversation-footer-flex">
            <BsFillTrashFill className="mainappDisplayConversation-icons-icon ml-2" />
            <div className="mainappDisplayConversation-input transparent">
              <input></input>
            </div>
            {!pauseIconDisplayed && (
              <div className="recording-container">
                <div className="recording-progress" />
              </div>
            )}
            {pauseIconDisplayed && (
              <FaMicrophone
                className="mainappDisplayConversation-icons-icon ml-2 red"
                onClick={() => {
                  startRecording();
                  setPausedIconDisplayed(false);
                }}
              />
            )}
            {!pauseIconDisplayed && (
              <FiPauseCircle
                className="mainappDisplayConversation-icons-icon ml-2 red"
                onClick={() => {
                  stopRecording();
                  setPausedIconDisplayed(true);
                }}
              />
            )}
            <IoMdSend
              className="mainappDisplayConversation-icons-icon ml-2"
              onClick={() => {
                if (!audioStarted) {
                  startRecording();
                  setAudioStarted(true);
                } else {
                  if (!pauseIconDisplayed) {
                    stopRecording();
                  }
                  setAudioStarted(false);
                }
              }}
            />
          </div>
        </div>
      )}
      {!audioStarted && (
        <div className="mainappDisplayConversation-footer  small-screen">
          <div className="mainappDisplayConversation-input">
            <div>
              <BsEmojiSmile className="mainappDisplayConversation-icons-icon ml-2" />
            </div>

            <input
              type="text"
              placeholder="Type a message"
              onChange={(e) => setMessage(e.target.value)}
              onFocus={callHandleInputFocus}
              onBlur={callHandleInputBlur}
              onKeyDown={(e) => handleKeydown(e)}
            />
          </div>
          <div>
            <FaMicrophone
              className="mainappDisplayConversation-icons-icon ml-2"
              onClick={() => {
                if (!audioStarted) {
                  setPausedIconDisplayed(false);
                  startRecording();
                  setAudioStarted(true);
                } else {
                  stopRecording();
                  setAudioStarted(false);
                }
              }}
            />
          </div>
        </div>
      )}
      {audioStarted && (
        <div className="mainappDisplayConversation-footer small-screen">
          <div></div>
          <div></div>

          <div className="mainappDisplayConversation-footer-flex">
            <BsFillTrashFill className="mainappDisplayConversation-icons-icon ml-2" />
            <div className="mainappDisplayConversation-input transparent">
              <input></input>
            </div>
            {!pauseIconDisplayed && (
              <div className="recording-container">
                <div className="recording-progress" />
              </div>
            )}
            {pauseIconDisplayed && <div className="recording-container"></div>}
            {pauseIconDisplayed && (
              <FaMicrophone
                className="mainappDisplayConversation-icons-icon ml-2 red"
                onClick={() => {
                  startRecording();
                  setPausedIconDisplayed(false);
                }}
              />
            )}
            {!pauseIconDisplayed && (
              <FiPauseCircle
                className="mainappDisplayConversation-icons-icon ml-2 red"
                onClick={() => {
                  stopRecording();
                  setPausedIconDisplayed(true);
                }}
              />
            )}
            <IoMdSend
              className="mainappDisplayConversation-icons-icon ml-2"
              onClick={() => {
                if (!audioStarted) {
                  startRecording();
                  setAudioStarted(true);
                } else {
                  if (!pauseIconDisplayed) {
                    stopRecording();
                  }
                  setAudioStarted(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainappDisplayConversation;
