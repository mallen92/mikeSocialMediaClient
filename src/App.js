import { Routes, Route, Navigate } from "react-router-dom";
import { SiteAccess } from "./components/SiteAccessComponent/SiteAccess";
import { Login } from "./components/SiteAccessComponent/subcomponents/Login";
import { MainSite } from "./components/MainSiteComponent/MainSite";
import { NewsFeed } from "./components/NewsFeedComponent/NewsFeed";
import "./App.css";

function App() {
  const isLoggedIn = false;

  return (
    <Routes>
      <Route
        path="access"
        element={isLoggedIn ? <Navigate to="/" /> : <SiteAccess />}
      >
        <Route index element={<Login />} />
      </Route>

      <Route path="/" element={<MainSite />}>
        <Route
          index
          element={isLoggedIn ? <NewsFeed /> : <Navigate to="access" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
