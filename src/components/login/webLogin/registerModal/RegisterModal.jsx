import "./registerModal.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterModal = ({
  handleRegister,
  previousPassword,
  setShowRegistration,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    if (password === previousPassword) {
      handleRegister();
    } else {
    }
  };
  return (
    <div className="loginModal-password">
      <div className="password">
        <h5>Confirm Password</h5>
      </div>
      <div className="input">
        <input
          type="password"
          placeholder="Type here your password"
          onChange={(val) => setPassword(val.currentTarget.value)}
        />
      </div>
      <div className="loginModal-login" id="registerModal-center">
        <button className="button" onClick={handleRegistration}>
          <h5>Register</h5>
        </button>
      </div>
      <div
        className="loginModal-register mt-4"
        onClick={() => setShowRegistration(false)}
      >
        Login
      </div>
    </div>
  );
};

export default RegisterModal;
