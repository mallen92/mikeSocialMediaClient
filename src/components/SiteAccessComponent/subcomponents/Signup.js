/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { setUser } from "../../../app/userSlice";
import { months, days, years } from "../../../util/birthDate";
import { authURL } from "../../../util/urls";

export const Signup = () => {
  /*--------- HOOK VARIABLES ---------*/
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*--------- COMPONENT STATE VARIABLES ---------*/
  const [showNameToolTip, setShowNameToolTip] = useState(false);
  const [showPasswordToolTip, setShowPasswordToolTip] = useState(false);
  const [error, setError] = useState("");
  const [birthMonthValue, setBirthMonthValue] = useState(
    months[new Date().getMonth()].name
  );
  const [birthDayValue, setBirthDayValue] = useState(new Date().getDate());

  /*--------- FUNCTIONS ---------*/
  const signUpUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthMonth,
      birthDay,
      birthYear,
    } = formEntries;

    if (confirmPassword !== password) setError("Passwords do not match.");
    else {
      let birthMonthNum = 0;
      let newBirthDay = birthDay;
      for (let i = 0; i < months.length; i++) {
        if (months[i].name === birthMonth) birthMonthNum = months[i].num;
      }
      for (let i = 1; i < 10; i++) {
        if (birthDay < 10) newBirthDay = `0${birthDay}`;
      }
      const birthDate = `${birthYear}${birthMonthNum}${newBirthDay}`;

      try {
        const response = await axios.post(
          `${authURL}/signup`,
          {
            firstName,
            lastName,
            email,
            password,
            birthDate,
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
    }
  };

  /*------------------ JSX ------------------*/
  return (
    <>
      <form className="accessForm" onSubmit={signUpUser}>
        <div className="accessFormInputs">
          <input
            name="firstName"
            className="accessFormInput"
            placeholder="First name"
            onFocus={() => setShowNameToolTip(true)}
            onBlur={() => setShowNameToolTip(false)}
          />
          <input
            name="lastName"
            className="accessFormInput"
            placeholder="Last name"
            onFocus={() => setShowNameToolTip(true)}
            onBlur={() => setShowNameToolTip(false)}
          />

          {showNameToolTip ? (
            <div className="toolTipContainer">
              Name must start with a letter, be at least 2 characters long, and
              contain letters, dashes, and spaces only.
            </div>
          ) : (
            <></>
          )}

          <div className="birthDateContainer">
            <span>Date of Birth:</span>
            <div className="birthDateSelectsContainer">
              <select
                name="birthMonth"
                className="birthDateSelect"
                value={birthMonthValue}
                onChange={(e) => setBirthMonthValue(e.target.value)}
              >
                {months.map((month) => (
                  <option key={month.id} value={month.name}>
                    {month.name}
                  </option>
                ))}
              </select>
              <select
                name="birthDay"
                className="birthDateSelect"
                value={birthDayValue}
                onChange={(e) => setBirthDayValue(e.target.value)}
              >
                {days.map((day) => (
                  <option key={day.id} value={day.name}>
                    {day.name}
                  </option>
                ))}
              </select>
              <select name="birthYear" className="birthDateSelect">
                {years.map((year) => (
                  <option key={year.id} value={year.name}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input
            type="email"
            name="email"
            className="accessFormInput"
            placeholder="Email address"
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            className="accessFormInput"
            placeholder="Password"
            onFocus={() => setShowPasswordToolTip(true)}
            onBlur={() => setShowPasswordToolTip(false)}
          />

          {showPasswordToolTip ? (
            <div className="toolTipContainer">
              Password must be at least 10 characters long and contain at least
              1 of each: (a) uppercase letter, (b) lowercase letter, (c) number,
              (d) symbol
            </div>
          ) : (
            <></>
          )}

          <input
            type="password"
            name="confirmPassword"
            className="accessFormInput"
            placeholder="Confirm password"
          />
        </div>

        {error ? <div className="errorContainer">{error}</div> : <></>}

        <div className="accessFormButtons">
          <button
            type="submit"
            className="accessFormButton loginFormLogInButton"
          >
            Sign Up
          </button>
          <button
            className="accessFormButton loginFormSignUpButton"
            onClick={(e) => {
              e.preventDefault();
              navigate("/access");
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </>
  );
};
