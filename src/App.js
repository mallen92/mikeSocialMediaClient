/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useEffect, useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { setUser } from "./app/userSlice";
import { authURL } from "./util/urls";

/*-------------- COMPONENT IMPORTS --------------*/
import { SessionLoading } from "./components/SessionLoadingComponent/SessionLoading";
import { SiteAccess } from "./components/SiteAccessComponent/SiteAccess";
import { Login } from "./components/SiteAccessComponent/subcomponents/Login";
import { MainSite } from "./components/MainSiteComponent/MainSite";
import { NewsFeed } from "./components/NewsFeedComponent/NewsFeed";
import { MobileMenu } from "./components/MobileMenuComponent/MobileMenu";
import { Friends } from "./components/FriendsComponent/Friends";
import { UserInfo } from "./components/UserInfoComponent/UserInfo";

/*-------------- STYLING IMPORTS --------------*/
import "./App.css";
import { Profile } from "./components/ProfileComponent/Profile";

function App() {
  /*--------- HOOK VARIABLES ---------*/
  const dispatch = useDispatch();

  /*--------- REDUX STATE VARIABLES ---------*/
  let isLoggedIn = useSelector((state) => state.userSlice.user.accessToken);

  /*--------- COMPONENT STATE VARIABLES ---------*/
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /*--------- REGULAR VARIABLES ---------*/
  const key = localStorage.getItem("x");

  /*--------- USEEFFECT HOOK ---------*/
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.get(`${authURL}/refresh`, {
          withCredentials: true,
        });
        dispatch(setUser(response.data));
        // eslint-disable-next-line
        isLoggedIn = response.data.accessToken;
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    if (!isLoggedIn && key) verifyRefreshToken();
    else setIsLoading(false);
  }, []);

  /*--------- JSX ---------*/
  return (
    <BrowserRouter>
      <Routes>
        {isLoading ? (
          <>
            <Route path="/access" element={<SessionLoading error={error} />} />
            <Route path="/" element={<SessionLoading error={error} />}>
              <Route path="menu" element={<SessionLoading error={error} />} />
            </Route>
            <Route
              path="/:id"
              element={<SessionLoading error={error} />}
            ></Route>
          </>
        ) : (
          <>
            <Route
              path="/access"
              element={isLoggedIn ? <Navigate to="/" /> : <SiteAccess />}
            >
              <Route index element={<Login />} />
            </Route>

            <Route
              path="/"
              element={isLoggedIn ? <MainSite /> : <Navigate to="/access" />}
            >
              <Route index element={<NewsFeed />} />
              <Route path="menu" element={<MobileMenu />} />
            </Route>

            <Route path="/:id" element={<MainSite />}>
              <Route path="/:id" element={<Profile />}>
                <Route index element={<UserInfo />} />
              </Route>
              <Route path="friends" element={<Friends />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
