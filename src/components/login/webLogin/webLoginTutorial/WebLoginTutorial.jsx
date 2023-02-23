import "./webLoginTutorial.css";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const WebLoginTutorial = () => {
  const navigate = useNavigate();
  return (
    <div className="webLoginTutorial">
      <div className="webLoginTutorial-title">
        <p>Tutorial</p>
      </div>
      <div className="webLoginTutorial-help">
        <a href="https://faq.whatsapp.com/834124628020911/?locale=it_IT&cms_platform=web">
          Need help to start?
        </a>
      </div>
      <div className="webLoginTutorial-video">
        <img
          src="https://elcomercio.pe/resizer/2eyo431LUvn4hY3IOpLgqCuR9yw=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/2JKFDXJKJNDY7IEN3V7BJ6JIZI.jpg"
          alt="video"
        />
        <a href="https://www.bing.com/videos/search?q=how+to+use+whatsapp+web+tutorial&&view=detail&mid=3F8F046E1B54A7224AE83F8F046E1B54A7224AE8&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dhow%2Bto%2Buse%2Bwhatsapp%2Bweb%2Btutorial%26FORM%3DHDRSC3">
          <div className="webLoginTutorial-video-play">
            <div>
              <FaPlay className="webLoginTutorial-video-play-icon" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default WebLoginTutorial;
