import "./registerModal.css";

const RegisterModal = ({ setShowRegistration }) => {
  return (
    <div className="loginModal-password">
      <div className="password">
        <h5>Confirm Password</h5>
      </div>
      <div className="input">
        <input type="password" placeholder="Type here your password" />
      </div>
      <div className="loginModal-login" id="registerModal-center">
        <button className="button">
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
