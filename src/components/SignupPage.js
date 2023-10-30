import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import axios from "axios";
import { months, days, years } from "../lists/birthDate";
import "../styles/loginSignup.css";

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [birthMonthValue, setBirthMonthValue] = useState(months[new Date().getMonth()].name);
  const [birthDayValue, setBirthDayValue] = useState(new Date().getDate());

  const signUpUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    const { firstName, lastName, email, password, birthMonth, birthDay, birthYear } = formEntries;

    let birthMonthNum = 0;
    for(let i = 0; i < months.length; i++) {
      if(months[i].name === birthMonth)
        birthMonthNum = months[i].id;
    }

    const birthDate = `${birthMonthNum}/${birthDay}/${birthYear}`;
    console.log(birthDate);
  }

  return (
    <div className="componentBody">
    <div className="formContainer">
      <form className="formContents" onSubmit={signUpUser}>
        <div className="formTitle">TheSocial</div>

        <div className="formInputs">
          <input name="firstName" className="formInput" placeholder="First name" />
          <input name="lastName" className="formInput" placeholder="Last name" />

          <div className="birthDateContainer">
            <span>Date of Birth:</span>
            <div className="birthDateSelectsContainer">
              <select name="birthMonth" className="birthDateSelect" value={birthMonthValue} onChange={(e) => setBirthMonthValue(e.target.value)}>
                {months.map(month => (
                  <option key={month.id} value={month.name}>
                    {month.name}
                  </option>
                ))}
              </select>
              <select name="birthDay" className="birthDateSelect" value={birthDayValue} onChange={(e) => setBirthDayValue(e.target.value)}>
                {days.map(day => (
                  <option key={day.id} value={day.name}>
                    {day.name}
                  </option>
                ))}
              </select>
              <select name="birthYear" className="birthDateSelect">
                {years.map(year => (
                  <option key={year.id} value={year.name}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input type="email" name="email" className="formInput" placeholder="Email address" autoComplete="off" />
          <input type="password" name="password" className="formInput" placeholder="Password" />
        </div>

        { error ?
        <div className="errorContainer">
          {error}
        </div>
        : <></>}

        <div className="formButtonContainer">
          <button type="submit" className="formButton signupFormSignUpButton">Sign Up</button>
          <button className="formButton signupFormLogInButton" onClick={(e) => {e.preventDefault(); navigate("/")}}>Log In</button>
        </div>
      </form>
    </div>
  </div>
  )
};
