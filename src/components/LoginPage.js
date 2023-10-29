import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";
import "./LoginRegistration.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password
      });

      dispatch(setUser(response.data));
      navigate("/test");
    } catch (error) {
      setError(error.response.data.error);
    }

  }

  return (
    <div className="componentBody">
      <div className="formContainer">
        <form className="formContents" onSubmit={logInUser}>
          <div className="formTitle">TheSocial</div>

          <div className="formInputs">
            <input type="email" id="emailInput" className="formInput" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" id="passwordInput" className="formInput" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </div>

          { error ?
          <div className="errorContainer">
            {error}
          </div>
          : <></>}

          <div className="formButtonContainer">
            <button type="submit" className="formButton logInButton">Log In</button>
            <button className="formButton signUpButton"><Link to="/register" className="signUpButtonLabel">Sign Up</Link></button>
          </div>
        </form>
      </div>
    </div>
  );
}
