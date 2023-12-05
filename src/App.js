import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./state/userSlice";
import { LoginPage } from "./components/UnauthUserComponent/LoginPage";
import { SignupPage } from "./components/UnauthUserComponent/SignupPage";
import { AuthUserPage } from "./components/AuthUserPage";
import { ProfilePage } from "./components/ProfilePageComponent/ProfilePage";
import { HomeView } from "./components/HomeViewComponent/HomeView";
import { MobileMenuView } from "./components/MobileMenuViewComponent/MobileMenuView";
import { UserInfoView } from "./components/UserInfoViewComponent/UserInfoView";
import { FriendsView } from "./components/FriendsViewComponent/FriendsView";
import "./App.css";
// import "./util/breakpoints.css";

function App() {
  const dispatch = useDispatch();
  let isLoggedIn = "";
  const user = useSelector((state) => state.userSlice.user);

  if (Object.keys(user).length !== 0) {
    isLoggedIn = user.token;
  } else {
    const user = window.localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      dispatch(setUser(userObj));
      isLoggedIn = userObj.token;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <AuthUserPage /> : <Navigate to="login" />}
          >
            <Route path="/" element={<HomeView />} />
            <Route path="menu" element={<MobileMenuView />} />
          </Route>

          <Route
            path="login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route
            path="signup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}
          />

          <Route path="/:id" element={<ProfilePage />}>
            <Route path="/:id" element={<UserInfoView />} />
            <Route path="/:id/friends" element={<FriendsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
