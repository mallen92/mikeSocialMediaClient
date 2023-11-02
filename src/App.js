import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { StateTest } from "./components/StateTest";
import { HomePage } from "./components/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./state/userSlice";
import "./App.css";
import "./util/breakpoints.css";

function App() {
  const dispatch = useDispatch();
  let isLoggedIn = "";
  const user = useSelector((state) => state.userSlice.user);

  if (Object.keys(user).length !== 0) {
    isLoggedIn = user.user_token;
  } else {
    const user = window.localStorage.getItem("USER");
    if (user) {
      const userObj = JSON.parse(user);
      dispatch(setUser(userObj));
      isLoggedIn = userObj.user_token;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />}
          />

          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/home" /> : <SignupPage />}
          />

          <Route
            path="/home"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
          />

          <Route path="/test" element={<StateTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
