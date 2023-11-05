import "./HomePage.css";
import { NavigationPanel } from "../navigationComponent/NavigationPanel";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
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
};
