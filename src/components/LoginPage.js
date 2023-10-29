import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginRegistration.css";

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
      console.log(error);
      setError(error.response.data.message);
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
            <button type="submit" className="formButton loginFormLogInButton">Log In</button>
            <button className="formButton loginFormSignUpButton" onClick={(e) => navigate("/signup")}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
