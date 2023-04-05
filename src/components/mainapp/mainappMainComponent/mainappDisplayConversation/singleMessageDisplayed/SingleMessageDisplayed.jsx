import "./singleMessageDisplayed.css";
import { BsCheckAll } from "react-icons/bs";
import { useEffect } from "react";

const SingleMessageDisplayed = ({ body, chatId, friendId }) => {
  useEffect(() => {
    checkAndUpdateMessages(body);
  }, [body]);
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
            <div className="little-corner right"></div>
            <div className="display-date right">
              {body.createdAt.substring(11, 17)}
              <BsCheckAll className="display-date-icon" />
            </div>

            {body.text}
          </div>
        </div>
      ) : (
        <div className="singleMessageDisplay-left">
          <div className="singleMessageDisplay-container left">
            <div className="little-corner left"></div>
            <div className="display-date left">
              {body.createdAt.substring(11, 17)}
            </div>

            {body.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMessageDisplayed;
