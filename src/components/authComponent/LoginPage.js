import { useNavigate } from "react-router-dom";
import { setUser } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../util/url";
import "./LoginSignup.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const logInUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { email, password } = formEntries;

    try {
      const response = await axios.post(`${URL}/auth/login`, {
        email,
        password,
      });

      dispatch(setUser(response.data));
      window.localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="loginPageBody">
      <div className="formContainer">
        <form className="formContents" onSubmit={logInUser}>
          <div className="branding">TheSocial</div>

          <div className="formInputs">
            <input
              type="email"
              name="email"
              className="formInput"
              placeholder="Enter email address"
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              className="formInput"
              placeholder="Enter password"
            />
          </div>

          {error ? <div className="errorContainer">{error}</div> : <></>}

          <div className="formButtonContainer">
            <button type="submit" className="formButton loginFormLogInButton">
              Log In
            </button>
            <button
              className="formButton loginFormSignUpButton"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
