import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/authComponent/LoginPage";
import { SignupPage } from "./components/authComponent/SignupPage";
import { HomePage } from "./components/homeComponent/HomePage";
import { NewsFeed } from "./components/newsFeedComponent/NewsFeed";
import { MobileMenu } from "./components/mobileMenuComponent/MobileMenu";
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
    const user = window.localStorage.getItem("user");
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
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
          >
            <Route path="/" element={<NewsFeed />} />
            <Route path="menu" element={<MobileMenu />} />
          </Route>

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
