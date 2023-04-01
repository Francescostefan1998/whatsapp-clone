import "./singleMessageDisplayed.css";
import { BsCheckAll } from "react-icons/bs";

const SingleMessageDisplayed = ({ body }) => {
  return (
    <div className="singleMessageDisplay">
      {body.sender === localStorage.getItem("userId") ? (
        <div className="singleMessageDisplay-right">
          <div className="singleMessageDisplay-container right">
            <div className="little-corner right"></div>
            <div className="display-date right">
              {body.createdAt.substring(11, 16)}
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
              {body.createdAt.substring(11, 16)}
            </div>

            {body.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMessageDisplayed;
