import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginRegistration.css";

export const LoginPage = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInUser = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { email, password } = formEntries;

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
            <input type="email" name="email" className="formInput" placeholder="Enter email address" />
            <input type="password" name="password" className="formInput" placeholder="Enter password" />
          </div>

          { error ?
          <div className="errorContainer">
            {error}
          </div>
          : <></>}

          <div className="formButtonContainer">
            <button type="submit" className="formButton loginFormLogInButton">Log In</button>
            <button className="formButton loginFormSignUpButton" onClick={(e) => {e.preventDefault(); navigate("/signup")}}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
