import "./mainappEmptySpace.css";
import { HiLockClosed } from "react-icons/hi";

import MainappEmptySpaceSvg from "./mainappEmptySpaceSvg/MainappEmptySpaceSvg";
const MainappEmptySpace = () => {
  return (
    <div className="mainappEmptySpace">
      <div className="mainappEmptySpace-main">
        <MainappEmptySpaceSvg />
        <div className="title">WhatsApp Web</div>
        <div className="description">
          Send and receive messages without keeping your ohone online. <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </div>
        <div className="encripted">
          <HiLockClosed className="mr-2" />
          End to end encripted
        </div>
      </div>
      <div className="mainappEmptySpace-bottom"></div>
    </div>
  );
};

export default MainappEmptySpace;
