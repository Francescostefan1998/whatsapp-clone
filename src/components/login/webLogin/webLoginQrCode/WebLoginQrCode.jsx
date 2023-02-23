import "./webLoginQrCode.css";

const WebLoginQrCode = () => {
  return (
    <div className="webLoginQrCode">
      <div className="webLoginQrCode-left">
        <div className="webLoginQrCode-left-title">
          <p>Use WhattsApp on Computer</p>
        </div>
        <ol className="webLoginQrCode-left-instruction">
          <li>Open WhatsApp on your phone.</li>
          <li>
            Click on <strong>Menue</strong> or <strong>Settings</strong> and
            select <br />
            <strong>connected Devices.</strong>{" "}
          </li>
          <li>
            Click on <strong>Connect Device.</strong>
          </li>
          <li>Turn your phone to this screen to capture the code.</li>
        </ol>
      </div>
      <div className="webLoginQrCode-right">
        <div className="webLoginQrCode-right-image">
          <img
            src="https://th.bing.com/th/id/R.650dacdbb0a7d9a50fb54d5339e20c23?rik=D0kfX35vdoXJkA&riu=http%3a%2f%2fkaizenexito.com%2fwp-content%2fuploads%2f2015%2f12%2fCodigo-QR.png&ehk=IOJc13vToCABDPmeP9L7yUbhJzBOK3%2bwfxKuaENZ7N4%3d&risl=&pid=ImgRaw&r=0"
            alt="qr-code"
          />
        </div>
      </div>
    </div>
  );
};

export default WebLoginQrCode;
