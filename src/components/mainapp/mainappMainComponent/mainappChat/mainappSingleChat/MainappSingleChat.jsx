import "./mainappSingleChat.css";

const MainappSingleChat = ({ small }) => {
  return (
    <div className={small}>
      {small === "mainappChatList-list-chats-single" && (
        <>
          <div className="mainappChatList-list-chats-single-image">
            <img
              src="https://i1.wp.com/www.rankred.com/wp-content/uploads/2015/05/Mark-Otto.jpg?resize=600%2C300"
              alt="friendpicture"
            />
          </div>
          <div className="mainappChatList-list-chats-single-informations">
            other
          </div>
        </>
      )}
    </div>
  );
};

export default MainappSingleChat;
