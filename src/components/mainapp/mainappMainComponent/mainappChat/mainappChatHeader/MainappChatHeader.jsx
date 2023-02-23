import "./mainappChatHeader.css";
import { BsPeopleFill } from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import { MdMessage } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const MainappChatHeader = () => {
  return (
    <div className="mainappChatHeader">
      <div className="mainappChatHeader-image">header</div>
      <div className="mainappChatHeader-icons">
        <div>
          <BsPeopleFill />
        </div>
        <div>
          <TbCircleDashed />
        </div>
        <div>
          <MdMessage />
        </div>
        <div>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default MainappChatHeader;
