import "./mainappChatList.css";
import MainappChatHeader from "../mainappChatHeader/MainappChatHeader";
const MainappChatList = () => {
  return (
    <div className="mainappChatList">
      <div>
        <MainappChatHeader />
        <div>search</div>
      </div>
      <div>
        <div>archived</div>
        <div>list</div>
        <div>footer</div>
      </div>
    </div>
  );
};

export default MainappChatList;
