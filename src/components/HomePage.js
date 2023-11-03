import { useSelector } from "react-redux";
import "../styles/home.css";
import { NavigationPanel } from "./homePageComponents/NavigationPanel";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <div className="homePageBody">
      <div className="navContainer">
        <NavigationPanel />
      </div>
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
  );
}
