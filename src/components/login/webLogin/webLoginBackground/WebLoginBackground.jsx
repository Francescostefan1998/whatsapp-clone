import "./webLoginBackgroundStyle.css";

const WebLoginBackground = () => {
  return (
    <div>
      <div className="webLoginBackground">
        <div className="webLoginBackground-top"></div>
        <div className="webLoginBackground-middle">
          <div className="webLoginBackground-middle-logo">
            <div className="webLoginBackground-middle-logo-image">
              <img
                src="https://th.bing.com/th/id/R.c3a41f00edd6c16fd3740c8a92b83182?rik=hMavbbQiXYzzzA&pid=ImgRaw&r=0"
                alt="logo"
              />
            </div>
            <div>
              <h6>WHATSAPP WEB</h6>
            </div>
          </div>
          <div className="webLoginBackground-middle-interface"></div>
        </div>

        <div className="webLoginBackground-botton"></div>
      </div>
    </div>
  );
};

export default WebLoginBackground;
