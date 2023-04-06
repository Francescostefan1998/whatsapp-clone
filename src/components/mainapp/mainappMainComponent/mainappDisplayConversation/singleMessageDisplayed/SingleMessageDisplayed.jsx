import "./singleMessageDisplayed.css";
import { BsCheckAll } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";

const SingleMessageDisplayed = ({
  body,
  chatId,
  friendId,
  dateSplit,
  classForTheDropDown,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const getDropDownClass = (query) => {
    const parentElement = document.querySelector(".mainappDisplayConversation");
    if (!parentElement) return "dropdown-setting-message";
    const rect = parentElement.getBoundingClientRect();
    console.log(rect.top);
    console.log(window.innerHeight);

    return rect.top > classForTheDropDown / 2
      ? `dropdown-setting-message bottom ${query}`
      : `dropdown-setting-message top ${query}`;
  };
  useEffect(() => {
    checkAndUpdateMessages(body);
  }, [body]);

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
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
                    <div>Delete</div>
                  </div>
                )}
                <div className="little-dropdown-absolute right">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>

            <div className="little-corner right"></div>
            <div className="display-date right">
              {body.createdAt.substring(11, dateSplit === "short" ? 16 : 17)}
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
                    <div>Delete</div>
                  </div>
                )}
                <div className="little-dropdown-absolute right">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            <div className="little-corner left"></div>
            <div className="display-date left">
              {body.createdAt.substring(11, dateSplit === "short" ? 16 : 17)}
            </div>

            {body.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMessageDisplayed;
