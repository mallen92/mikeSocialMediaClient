/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { setUser } from "../../../app/userSlice";
import { authURL } from "../../../util/urls";

export const Login = () => {
  /*--------- HOOKS ---------*/
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*--------- STATE VARIABLES ---------*/
  const [error, setError] = useState("");

  /*--------- FUNCTIONS ---------*/
  const logInUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { email, password } = formEntries;

    try {
      const response = await axios.post(
        `${authURL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(setUser(response.data));
      localStorage.setItem("x", "y");
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  /*------------------ JSX ------------------*/
  return (
    <>
      <form className="accessForm" onSubmit={logInUser}>
        <div className="accessFormInputs">
          <input
            type="email"
            name="email"
            className="accessFormInput"
            placeholder="Enter email address"
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            className="accessFormInput"
            placeholder="Enter password"
          />
        </div>

        {error ? <div className="errorContainer">{error}</div> : <></>}

        <div className="accessFormButtons">
          <button
            type="submit"
            className="accessFormButton loginFormLogInButton"
          >
            Log In
          </button>
          <button
            className="accessFormButton loginFormSignUpButton"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
