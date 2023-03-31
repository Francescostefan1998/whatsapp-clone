import "./loginModal.css";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../registerModal/RegisterModal";
import { useSelector } from "react-redux";
const LoginModal = ({ setShowLogin }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("handlesubmit triggered");

    try {
      const { data, _id } = await axios.post(
        "http://localhost:3001/users/login",
        {
          email,
          password,
        }
      );
      toast("Login successfull! 💪", { autoClose: 1000 });
      console.log("login successfull!");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data._id);

      await dispatch(getUserProfile(data.accessToken));
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
      console.log("error");
    }
  };
  const handleRegister = async (e) => {
    try {
      console.log("handleregister triggered");
      console.log(firstName, lastName, email, password);
      const data = await axios.post("http://localhost:3001/users", {
        firstName,
        lastName,
        email,
        password,
      });
      toast("Register successfull! 💪", { autoClose: 1000 });
      await handleSubmit();
    } catch (error) {}
  };
  return (
    <div className="loginModal">
      <div className="loginModal-main">
        <div className="loginModal-close">
          <CgCloseO className="close" onClick={() => setShowLogin(false)} />
        </div>
        {showRegistration && (
          <div className="loginModal-email">
            <div className="email">
              <h5>Name</h5>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Type here your name"
                onChange={(val) => setFirstName(val.currentTarget.value)}
              />
            </div>
          </div>
        )}
        {showRegistration && (
          <div className="loginModal-email">
            <div className="email">
              <h5>Surname</h5>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Type here your surname"
                onChange={(val) => setLastname(val.currentTarget.value)}
              />
            </div>
          </div>
        )}

        <div className="loginModal-email">
          <div className="email">
            <h5>Email</h5>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Type here your email"
              onChange={(val) => setEmail(val.currentTarget.value)}
            />
          </div>
        </div>
        <div className="loginModal-password">
          <div className="password">
            <h5>Password</h5>
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Type here your password"
              onChange={(val) => setPassword(val.currentTarget.value)}
            />
          </div>
        </div>
        {!showRegistration && (
          <div className="loginModal-login">
            <button className="button" onClick={handleSubmit}>
              <h5>Login</h5>
            </button>
          </div>
        )}
        {!showRegistration && (
          <div
            className="loginModal-register"
            onClick={() => setShowRegistration(true)}
          >
            Register
          </div>
        )}

        {showRegistration && (
          <RegisterModal
            setShowRegistration={setShowRegistration}
            handleRegister={handleRegister}
            previousPassword={password}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
