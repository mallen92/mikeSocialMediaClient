import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginRegistration.css";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
  }

  return (
    <div className="componentBody">
    <div className="formContainer">
      <form className="formContents" onSubmit={registerUser}>
        <div className="formTitle">TheSocial</div>

        <div className="formInputs">
          <input id="firstNameInput" className="formInput" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
          <input id="lastNameInput" className="formInput" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
          <input type="email" id="emailInput" className="formInput" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>

          <div className="birthDateButtonContainer">
            Birth Date buttons
          </div>

          <input type="password" id="passwordInput" className="formInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        { error ?
        <div className="errorContainer">
          {error}
        </div>
        : <></>}

        <div className="formButtonContainer">
          <button type="submit" className="formButton signupFormSignUpButton">Sign Up</button>
          <button className="formButton signupFormLogInButton" onClick={() => navigate("/")}>Log In</button>
        </div>
      </form>
    </div>
  </div>
  )
};
