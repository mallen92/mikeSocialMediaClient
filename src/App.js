/*------------- 3RD PARTY IMPORTS -------------*/
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/*--------------- REACT IMPORTS ---------------*/
import { useEffect, useState } from "react";

/*-------------- CONFIG IMPORTS --------------*/
import { setUser } from "./app/userSlice";
import { URL } from "./util/url";

/*-------------- COMPONENT IMPORTS --------------*/
import { SessionLoading } from "./components/SessionLoadingComponent/SessionLoading";
import { SiteAccess } from "./components/SiteAccessComponent/SiteAccess";
import { Login } from "./components/SiteAccessComponent/subcomponents/Login";
import { AuthSite } from "./components/AuthSiteComponent/AuthSite";
import { NewsFeed } from "./components/NewsFeedComponent/NewsFeed";
import { MobileMenu } from "./components/MobileMenuComponent/MobileMenu";

/*-------------- STYLING IMPORTS --------------*/
import "./App.css";

function App() {
  /*--------- CONFIGURATIONS ---------*/
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userSlice.user);
  let isLoggedIn = user.accessToken;
  const key = localStorage.getItem("x");

  /*--------- STATE VARIABLES ---------*/
  let [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  /*--------- USEEFFECT HOOK ---------*/
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.get(`${URL}/auth/refresh`, {
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
              element={isLoggedIn ? <AuthSite /> : <Navigate to="/access" />}
            >
              <Route index element={<NewsFeed />} />
              <Route path="menu" element={<MobileMenu />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
