import "./loginModal.css";
import { CgCloseO } from "react-icons/cg";
const LoginModal = ({ setShowLogin }) => {
  return (
    <div className="loginModal">
      <div className="loginModal-main">
        <div className="loginModal-close">
          <CgCloseO className="close" onClick={() => setShowLogin(false)} />
        </div>
        <div className="loginModal-email">
          <div className="email">
            <h5>Email</h5>
          </div>
          <div className="input">
            <input type="text" placeholder="Type here your email" />
          </div>
        </div>
        <div className="loginModal-password">
          <div className="password">
            <h5>Password</h5>
          </div>
          <div className="input">
            <input type="password" placeholder="Type here your password" />
          </div>
        </div>
        <div className="loginModal-login">
          <button className="button">
            <h5>Login</h5>
          </button>
        </div>
        <div className="loginModal-register">Register</div>
      </div>
    </div>
  );
};

export default LoginModal;
