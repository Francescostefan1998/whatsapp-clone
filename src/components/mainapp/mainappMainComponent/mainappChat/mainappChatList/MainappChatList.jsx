import "./mainappChatList.css";
import { BiFilter } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineArchive } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { useSelector } from "react-redux";
import MainappSingleChat from "../mainappSingleChat/MainappSingleChat";
import MainappChatHeader from "../mainappChatHeader/MainappChatHeader";
import { getUserChats } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const MainappChatList = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(getUserChats(user.chats));
    } else {
      return;
    }
  }, []);
  const { chats } = useSelector((state) => state.chats);
  return (
    <div className="mainappChatList">
      <div>
        <MainappChatHeader />
        <div className="mainappChatList-search">
          <div className="mainappChatList-search-inner">
            <div>
              <BiSearchAlt2 className="mainappChatList-search-icon" />
            </div>
            <input type="text" placeholder="Searc or start a new chat" />
          </div>
          <div>
            <BiFilter className="mainappChatList-search-icon-filter" />
          </div>
        </div>
      </div>
      <div className="mainappChatList-list-container">
        <div className="mainappChatList-list-archived">
          <div>
            <MdOutlineArchive className="mainappChatList-list-archived-icon" />
          </div>
          <div>Archived</div>
        </div>
        <div className="mainappChatList-list-chats">
          {/*map */}
          <MainappSingleChat small={"mainappChatList-list-chats-single"} />
        </div>
        <div className="mainappChatList-list-footer">
          <HiLockClosed />
          Your personal messages are{" "}
          <a href="https://en.wikipedia.org/wiki/End-to-end_encryption">
            {" "}
            end-to-end encripted
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainappChatList;
